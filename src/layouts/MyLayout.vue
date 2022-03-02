<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Staff management
          <div slot="subtitle">Running on verion v{{ $q.version }}</div>
        </q-toolbar-title>
        <div @click="test" v-if="getCurrentUserGetter != null">
          {{ getCurrentUserGetter.email }}
        </div>
        <div @click="test" v-else>
          <router-link to="user/login">Login</router-link>
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Staff list" sublabel="all staffs" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main
            label="Programing languages"
            sublabel="all programing languages"
          />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Org" sublabel="Org of company" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main
            label="Staff join list"
            sublabel="staff will join list"
          />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Role list" sublabel="all role in company" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, LocalStorage } from 'quasar';
import { mapGetters } from 'vuex';
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
    test() {
      console.log('this is a token ', this.getCurrentUserGetter);
      LocalStorage.remove('USER_INFO');
      console.log('this is a token ', this.getCurrentUserGetter);
    },
  },
  computed: {
    ...mapGetters('auth', ['getCurrentUserGetter', 'getToken']),
  },
};
</script>

<style></style>
