const moduleRoute = [
  {
    path: "/sample",
    component: () => import('./views/index.vue'),
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
