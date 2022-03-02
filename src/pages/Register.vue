<template>
  <q-page padding class=" row justify-center content-center bg-grey">
    <q-card style="width: 400px" bordered class="bg-grey-8">
      <q-card-section>
        <q-input
          color="primary"
          bg-color="white"
          filled
          v-model="form.username"
          label="UserName"
          @blur="$v.form.username.$touch"
          @keyup.enter="submit"
          :error="$v.form.username.$error"
          type="username"
          float-label="UserName"
        >
          <template v-slot:prepend>
            <q-icon name="people" />
          </template>
        </q-input>
        <q-input
          color="primary"
          bg-color="white"
          filled
          v-model="form.email"
          label="Email"
          @blur="$v.form.email.$touch"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          type="email"
          float-label="Email"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          color="primary"
          bg-color="white"
          filled
          v-model="form.password"
          label="Password"
          @blur="$v.form.password.$touch"
          @keyup.enter="submit"
          :error="$v.form.password.$error"
          type="password"
          float-label="Email"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-input
          color="primary"
          bg-color="white"
          filled
          v-model="form.confirmPassword"
          label="Re-type password"
          @blur="$v.form.confirmPassword.$touch"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          type="password"
          float-label="Confirm password"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </q-card-section>
      <div class="q-pa-md row justify-center content-center">
        <q-btn color="primary" :ripple="{ center: true }" @click="submit"
          >SignUp</q-btn
        >
      </div>
    </q-card>
  </q-page>
</template>

<script>
import gql from 'graphql-tag';
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: ' kaka ',
      form: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['getCurrentUserGetter', 'getToken']),
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
      confirmPassword: { required },
      username: { required },
    },
  },
  methods: {
    submit() {
      this.$q.loading.show();
      this.$v.form.$touch();
      console.log('Trungbb : ', this.form);
      if (this.$v.form.$error) {
        console.log('Trungbb : ', this.$v.form);
        this.$q.notify('Please review fields again.');
      } else {
        this.doRegister(
          this.$v.form.username.$model,
          this.$v.form.email.$model,
          this.$v.form.password.$model
        );
      }
    },
    doRegister(username, email, password) {
      // const apolloCl = this.$apollo
      console.log('username', username);
      console.log('email', email);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation register($login: login!) {
              registered(login: $login) {
                _id
                name
                password
                email
              }
            }
          `,
          // Parameters
          variables: {
            login: { name: username, email: email, password: password },
          },
        })
        .then((data) => {
          // Result
          this.$q.loading.hide();
          this.$q.notify('Register sucess !!!');
          this.$router.push({ name: 'user' });
          console.log(data);
        })
        .catch((error) => {
          this.$q.notify(error);
          this.$q.loading.hide();
        });
    },
  },
};
</script>

<style></style>
