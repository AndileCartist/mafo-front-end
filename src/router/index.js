import Vue from "vue";
import VueRouter from "vue-router";
//import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/HomePage"),
  },
  {
    path: "/adduser",
    name: "adduser",
    component: () => import("../pages/AddUser"),
  },
  {
    path: "/payment-history",
    name: "payment-history",
    component: () => import("../pages/PaymentHistory"),
  },
  {
    path: "/next-payments",
    name: "next-payments",
    component: () => import("../pages/NextPayments"),
  },
  {
    path: "/all-students",
    name: "all-students",
    component: () => import("../pages/AllStudents"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../pages/SignIn"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../pages/SignIn"),
  },
  {
    path: "/welcome",
    name: "welcome-page",
    component: () => import("../pages/WelcomePage"),
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../pages/ResetPassword"),
  },
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("../pages/RedirectPage"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../pages/ForgotPassword"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/ProfilePage"),
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
      return { x: 0, y: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  let isAuthinticated = "";
  if (user !== null) {
    isAuthinticated = user.message === "Auth Passed" ? true : false;
  }
  //if (to.name !== "signin" && !isAuthinticated) next({ name: "signin" });
  if ((to.name === "payment-history" || to.name === "profile") && !isAuthinticated) {
    return next({ name: "signin" })
  }
  else if ((to.name === "home" || to.name === "next-payments" || to.name === "all-students") && isAuthinticated && user.user.role !== 'admin') {
    return next({ name: "signin" })
  }
  else next();
});

export default router;
