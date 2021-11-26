import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/HomePage")
  },
  {
    path: "/adduser",
    name: "adduser",
    component: () => import("../pages/AddUser")
  },
  {
    path: "/payment-history",
    name: "payment-history",
    component: () => import("../pages/PaymentHistory")
  },
  {
    path: "/next-payments",
    name: "next-payments",
    component: () => import("../pages/NextPayments")
  },
  {
    path: "/all-students",
    name: "all-students",
    component: () => import("../pages/AllStudents")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../pages/SignIn")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../pages/SignIn")
  },
  {
    path: "/welcome",
    name: "welcome-page",
    component: () => import("../pages/WelcomePage")
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../pages/ResetPassword")
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
            return { x: 0, y: 0, behavior: 'smooth' }
    }
    
  }
});

export default router;
