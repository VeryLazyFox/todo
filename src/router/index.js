import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Todo/Home.vue"),
      children: [
        {
          path: "/",
          component: () =>
            import(/* webpackChunkName: "todo" */ "../views/Todo/Todo.vue"),
          name: "todo-list"
        },
        {
          path: "/create-category",
          component: () =>
            import(
              /* webpackChunkName: "create-category" */ "../views/Todo/CreateCategory.vue"
            ),
          name: "create-category"
        }
      ]
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

export default router;
