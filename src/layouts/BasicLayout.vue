<template>
  <div class="main">
    <div class="head">
      <mobile-navigation></mobile-navigation>
    </div>

    <div class="body">
      <div class="side-nav" :class="{ hide: nav }">
        <img src="../assets/logo.jpg" alt="" />
        <div class="side-nav-list">
          <div class="nav-list-item">
            <div class="active-marker"></div>
            <img src="../assets/dashboard-5481.svg" alt="" />
            <router-link to="/">DashBoard</router-link>
          </div>
          <div class="nav-list-item">
            <img src="../assets/users-267.svg" alt="" />
            <router-link to="all-students">All Users</router-link>
          </div>
          <div class="nav-list-item">
            <img src="../assets/credit-card-2015.svg" alt="" />
            <router-link to="payment-history">Payment History</router-link>
          </div>
          <div class="nav-list-item">
            <img src="../assets/add-user.svg" alt="" />
            <router-link to="/adduser">Add User</router-link>
          </div>
          <div class="">
            <link-btn></link-btn>
          </div>
        </div>
      </div>

      <div>
        <div class="top-bar" :class="{ hide: hide }">
          <form action="#" method="post">
            <input
              type="text"
              name="text"
              placeholder=" search name or number"
            />
          </form>
          <img src="../assets/profile-svgrepo-com.svg" alt="" />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MobileNavigation from "../components/MobileNavigation.vue";
//import ComputerNavigation from "../components/ComputerNavigation.vue";
import { mapGetters, mapMutations } from "vuex";
import LinkBtn from "../components/LinkBtn.vue";

//const apiUrl = process.env.API_URL || "http://localhost:1337";
export default {
  name: "Layout",
  components: {
    MobileNavigation,
    LinkBtn,
  },
  data() {
    return {
      news: "",
      hide: false,
      currentRoute: this.$route.name,
    };
  },
  created() {
    this.KeepUserLogged();
  },
   watch: {
    $route: "routeUpdate",
  },
  methods: {
    ...mapMutations(["setUser"]),
    KeepUserLogged() {
      let stored = localStorage.getItem("user");

      if (stored !== null && this.userData === null) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.$store.commit("setUser", user);
        console.log(localStorage.getItem("user"));
      }
    },
    hideNavigation() {
      return this.currentRoute === "signin"
        ? (this.hide = true)
        : (this.hide = false);
    },
    routeUpdate() {
      this.currentRoute = this.$route.name;
    },
  },
  computed: {
    ...mapGetters(["userData"]),
    nav() {
      return this.hideNavigation()
    }
  },
};
</script>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
input {
  background-image: url("../assets/icons8-search (1).svg");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  height: 35px;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgb(219 217 217);
  resize: none;
  padding: 18px;
  width: 256px;
  background-color: rgb(255, 255, 255);
  padding-left: 30px;
}
input:focus {
  border: 1px solid rgb(31, 118, 199);
  outline: none;
}
.main > :nth-child(1) {
  display: flex;
  flex-direction: column;
}
.body {
  min-height: 850px;
  display: flex;
  flex-direction: column;
  background: #cbd5e0;
}
.side-nav {
  display: none;
}
.side-nav > img {
  width: 100%;
  height: 120px;
}
.top-bar {
  display: none;
}
.top-bar > img {
  padding-right: 320px;
  width: 3%;
}
.side-nav-list {
  display: flex;
  flex-direction: column;
}
.nav-list-item {
  margin-top: 13px;
  padding: 3px;
  color: #8f8f8f;
  border-left: 4px solid #2d3748;
}
.side-nav-list > .nav-list-item:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: 800;
  cursor: pointer;
  border-left: 4px solid #ffffff;
}
.nav-list-item > img {
  width: 7%;
  margin: 0 25px;
  height: 24px;
}
.nav-list-item > a {
  font-size: 20px;
  text-decoration: none;
  color: inherit;
  font-weight: 100;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.nav-list-item > a:hover {
  color: rgb(255, 255, 255);
}

.footer {
  background: grey;
  min-height: 200px;
  z-index: 3;
}
@media only screen and (min-width: 768px) {
  .side-nav {
    width: 27%;
    height: 100%;
    position: fixed;
    background: #2d3748;
    overflow: hidden;
    z-index: 2;
    display: block;
  }
  .top-bar {
    width: 100%;
    height: 75px;
    background: rgb(255, 255, 255);
    position: fixed;
    border-bottom: 3px solid rgb(16, 78, 192);
    display: flex;
    justify-content: space-between;
    margin-left: 27%;
    align-items: center;
    padding-left: 30px;
    z-index: 100;
  }
}

@media only screen and (min-width: 1040px) {
  .top-bar {
    margin-left: 24%;
  }
  .side-nav {
    width: 24%;
  }
}

@media only screen and (min-width: 1250px) {
  .top-bar {
    margin-left: 17%;
  }
  .side-nav {
    width: 17%;
  }
}
@media only screen and (min-width: 1400px) {
  .side-nav > img {
    height: 180px;
  }
}
.hide {
  display: none;
}
</style>
