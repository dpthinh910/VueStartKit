<template>
  <q-page padding class=" row justify-center content-center bg-grey">
    <q-card style="width: 400px" bordered class="bg-grey-8">
      <q-card-section>
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
            <q-icon name="people" />
          </template>
        </q-input>

        <q-input
          color="primary"
          bg-color="white"
          filled
          v-model="form.password"
          label="Password"
          @blur="$v.form.email.$touch"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          type="password"
          float-label="Email"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </q-card-section>
      <div class="q-pa-md row justify-center content-center">
        <q-btn
          color="primary"
          :ripple="{ center: true }"
          @click="submit"
          class="q-mr-sm"
          >Login</q-btn
        >
      </div>
    </q-card>
  </q-page>
</template>

<script>
//import gql from 'graphql-tag';
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: ' kaka ',
      form: {
        email: 'vfa.trungbb@gmail.com',
        password: '123456',
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
    },
  },
  methods: {
    submit() {
      this.$q.loading.show();
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        console.log('Trungbb : ', this.$v.form);
        this.$q.notify('Please review fields again.');
      } else {
        this.doLogin(this.form.email, this.form.password);
      }
    },
    async doLogin(email, password) {
      console.log(email, password);
      // const apolloCl = this.$apollo.provider.defaultClient;
      try {
        //dummydata
        const dataDummy = JSON.parse(`{
                    "data": {
                      "login": {
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMDU1ZDYyZC1hYzYwLTQ0N2UtZWU1Zi1hZDY4MmZkNzVkNGIiLCJqdGkiOiIzYjUxODc5Ny1lMzIxLTQ4MTYtYmM4Ny1lOTM3OTM2MmMwZDYiLCJpYXQiOjE2MDc0MDMzMTksImlzcyI6InZmYSJ9.Jk5IlHfvg_PShTMfmhZXl1yDgJkpw4d5yB5p7sUJxp0",
                        "token_type": "bearer",
                        "expires_in": null,
                        "user": {
                          "userId": "a055d62d-ac60-447e-ee5f-ad682fd75d4b",
                          "vfaJoinedDate": "2008-08-04T00:00:00.000Z",
                          "vfaEmail": "trungbb@vitalify.asia"
                        }
                      }
                    }
                  }`);
        /* remove this block comment anf your query 
        const data = await apolloCl.query({
          query: gql`
            query login($User: LoginUserInput) {
              login(User: $User) {
                user {
                  name
                  email
                }
                token
                token_type
                expires_in
              }
            }
          `,
          variables: {
            User: { password: password, email: email },
          },
        });
        console.log(' Data', data);
*/
        this.$q.loading.hide();
        this.$store.commit('auth/saveCurrenUserMutation', dataDummy);
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('ERR : ', error);
        this.$q.loading.hide();
        this.$q.notify('Email or password is incorrect.');
      }
    },
    testGetCurrentUser() {
      console.log(' CurrentUser:', this.getCurrentUserGetter, this.getToken);
    },
  },
};
</script>

<style></style>
