<template>
  <q-layout>
    <!-- Header -->
    <q-layout-header>
      <!-- First row of header is a QToolbar -->
      <q-toolbar color="primary"> </q-toolbar>

      <!-- Second row of header is a QTabs -->
    </q-layout-header>
    <!-- sub-routes get injected here: -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-layout-footer>
      <q-toolbar-title>
        Layout Footer
      </q-toolbar-title>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data() {
    return {
      leftDrawer: false,
    };
  },
};
</script>

<style></style>
