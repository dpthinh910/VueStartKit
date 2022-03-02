<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Template for coding
        </q-toolbar-title>
        <q-btn
          no-caps
          v-if="getCurrentUserGetter != null"
          rounded
          :ripple="{ center: true }"
          color="primary"
          icon-right="settings"
          :label="getCurrentUserGetter.email"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Account settings</div>
                <q-btn
                  class="glossy"
                  no-caps
                  rounded
                  color="primary"
                  icon="lock"
                  label="change password"
                  v-close-popup
                />
                <br />
                <q-btn
                  class="glossy"
                  no-caps
                  rounded
                  color="deep-orange"
                  icon="people"
                  label="Edit profile"
                  v-close-popup
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img
                    src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/61574610_10212046545074014_5887304684162514944_n.jpg?_nc_cat=103&_nc_oc=AQmx3VnQZbQ5kKJ8UzCZLjN8JNY945Wg2yWym2xCbSxT9x0U8xtDxXIK5pW_tmF5XW4&_nc_ht=scontent.fsgn5-7.fna&oh=81103ebf26fc9ecdcbb55c18f8124fd7&oe=5D9B0E57"
                  />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ getCurrentUserGetter.username }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  icon="arrow_forward"
                  v-close-popup
                  @click="test"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
        <q-btn
          color="primary"
          label="Login"
          push
          size="sm"
          icon="arrow_forward"
          v-close-popup
          @click="test"
          v-else
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <!-- drawer content -->
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="people" />
          </q-item-section>

          <q-item-section>Menu 1</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="work" />
          </q-item-section>

          <q-item-section>Menu 2</q-item-section>
        </q-item>
        <q-separator />

        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL, LocalStorage } from 'quasar';
import { mapGetters } from 'vuex';
export default {
  name: 'MyLayout',
  data() {
    return {
      left: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
    test() {
      console.log('this is a token ', this.getCurrentUserGetter);
      LocalStorage.remove('USER_INFO');
      LocalStorage.remove('USER_TOKEN');
      console.log('this is a token ', this.getCurrentUserGetter);
      this.$router.push({ path: 'user/login' });
    },
  },
  moveToLogin() {
    this.$router.push({ path: 'user/login' });
  },
  computed: {
    ...mapGetters('auth', ['getCurrentUserGetter', 'getToken']),
  },
};
</script>
