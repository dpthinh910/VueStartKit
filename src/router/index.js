import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import routes from './routes';
Vue.use(VueRouter);
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
});
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default function({ store }) {
  // console.log('routes: ', routes)
  const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  // Before each route evaluates...
  router.beforeEach((routeTo, routeFrom, next) => {
    console.log('beforeEach');
    // Check if auth is required on this route
    // (including nested routes).
    const authRequired = routeTo.matched.some(
      (route) => route.meta.authRequired
    );
    console.log('authRequired', authRequired, store.state.auth.currentUser);
    // If auth isn't required for the route, just continue.
    if (!authRequired) return next();

    // If auth is required and the user is logged in...
    console.log('store.getters', store.getters['auth/getCurrentUserGetter']);
    if (store.getters['auth/getCurrentUserGetter']) {
      // Validate the local user token...
      return store.dispatch('auth/validate').then((validUser) => {
        // Then continue if the token still represents a valid user,
        // otherwise redirect to login.
        validUser ? next() : redirectToLogin();
      });
    }

    // If auth is required and the user is NOT currently logged in,
    // redirect to login.
    redirectToLogin();

    function redirectToLogin() {
      // Pass the original route to the login component
      next({
        name: 'user',
        path: 'login',
        query: { redirectFrom: routeTo.fullPath },
      });
    }
  });
  return router;
}
