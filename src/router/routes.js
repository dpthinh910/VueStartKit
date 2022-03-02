const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayoutV2.vue'),
    children: [
      //  { path: '', component: () => import('pages/Index.vue') },
      { path: 'home', component: () => import('pages/Home') },
    ],
  },
  {
    path: '/user',
    meta: { guest: true },
    component: () => import('layouts/LoginLayoutV2'),
    children: [
      {
        path: 'login',
        name: 'user',
        component: () => import('pages/login'),
        meta: { title: 'Login' },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/register'),
        meta: { title: 'Register', authRequired: false },
      },
    ],
  },
];
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
