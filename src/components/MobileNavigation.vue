<template>
  <div class="nav-main-cont">
    <div class="cont">
      <img
        src="../assets/menu-lines-list_2931181.svg"
        alt="open navigation"
        class="nav-btn open-btn nav-btn-width"
        @click="toggleNav()"
      />
      <router-link to="/">
        <img class="logo" src="../assets/mafo-logo-2.jpg" alt="" />
      </router-link>
      <div class="nav nav-black" :class="{ visible: openNav }">
        <div class="nav nav-red" :class="{ visible: openNav }">
          <div class="nav nav-white" :class="{ visible: openNav }">
            <img
              src="../assets/close-5758.svg"
              alt="close navigavtion"
              class="nav-btn close-btn"
              style=" width: 11%;"
              @click="toggleNav()"
            />
            <button class="nav-btn close-btn">
              <i class="fas fa-times"></i>
            </button>

            <!--      <img
            src="https://logos-download.com/wp-content/uploads/2016/03/Netflix_logo.png"
            alt="Logo"
            class="logo"
          />
-->
            <div class="side-nav">
              <div class="side-nav-list">
                <div class="nav-list-item" @click="toggleNav()">
                  <img src="../assets/dashboard-5481.svg" alt="" />
                  <router-link to="/">DashBoard</router-link>
                </div>
                <div class="nav-list-item" @click="toggleNav()">
                  <img src="../assets/users-267.svg" alt="" />
                  <router-link to="">All Users</router-link>
                </div>
                <div class="nav-list-item" @click="toggleNav()">
                  <img src="../assets/credit-card-2015.svg" alt="" />
                  <router-link to="payment-history"
                    >Payment History</router-link
                  >
                </div>
                <div class="nav-list-item" @click="toggleNav()">
                  <img src="../assets/add-user.svg" alt="" />
                  <router-link to="/adduser">Add User</router-link>
                </div>
                <div class="">
                  <link-btn></link-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cont-cover"></div>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      openNav: false,
      openHeader: false,
      openHeader2: false,
      openHeader3: false,
      scrollPosition: null,
    };
  },
  mounted() {},
  destroy() {},
  computed: {},
  methods: {
    toggleNav() {
      return this.openNav ? (this.openNav = false) : (this.openNav = true);
    },
    toggleHeader(index) {
      if (index === 1) {
        return this.openHeader
          ? (this.openHeader = false)
          : (this.openHeader = true);
      } else if (index === 2) {
        return this.openHeader2
          ? (this.openHeader2 = false)
          : (this.openHeader2 = true);
      } else {
        return this.openHeader3
          ? (this.openHeader3 = false)
          : (this.openHeader3 = true);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.cont {
  height: 60px;
  background: #1c4b69;
  position: fixed;
  border-bottom: 2.5px solid rgb(34, 31, 31);
  width: 100%;
  z-index: 12;
}
.cont-cover {
  height: 60px;
  background: black;
  width: 100%;
}
.nav-btn-width {
  width: 11%;
}

.logo,
.logo-2 {
  width: 200px;
  position: absolute;
  transition: opacity 0.3s linear;
  left: 25%;
  height: 60px;
}

@media only screen and (min-width: 473px) {
  .cont {
    height: 80px;
  }
  .cont-cover {
    height: 80px;
  }
  .nav-btn-width {
    width: 9%;
  }
}
@media only screen and (min-width: 768px) {
  .nav-main-cont {
    display: none;
  }
}
.text {
  text-transform: uppercase;
}

.drop-icon {
  width: 4%;
  padding: 0 3px;
}

.nav-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
}

.open-btn {
  position: fixed;
  top: 10px;
  left: 20px;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.nav.visible {
  transform: translateX(0);
}

.nav-black {
  background-color: rgb(34, 31, 31);
  width: 100%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.4s;
}

.nav-black.visible {
  transition-delay: 0s;
}

.nav-red {
  background-color: rgb(158 155 57);
  width: 95%;
  transition-delay: 0.2s;
}

.nav-red.visible {
  transition-delay: 0.2s;
}

.nav-white {
  background-color: #1c4b69;
  width: 90%;
  padding: 20px;
  position: relative;
  transition-delay: 0s;
  padding-left: 0;
}

.nav-white.visible {
  transition-delay: 0.4s;
}

.close-btn {
  opacity: 0.3;
  position: absolute;
  top: 20px;
  right: 10px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  margin: 20px 0;
}

.list li a {
  color: rgb(34, 31, 31);
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
}

.list ul {
  list-style-type: none;
  padding-left: 20px;
}
.closeNavigation {
  /* display: none;*/
  max-height: 0;
  /*and eventually delay an overflow:auto; */
  overflow: hidden;
  transition: max-height 0.5s, overflow 0s;
}
.openNavigation {
  /* display: none;*/
  overflow: hidden;
  max-height: 286px;
  transition: max-height 0.8s, overflow 0.8s 0.8s;
  transition-timing-function: ease-out;
}

.side-nav-list {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 15px;
}
.nav-list-item {
  margin-top: 13px;
  padding: 3px;
  color: #8f8f8f;
}
.side-nav-list > .nav-list-item:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: 800;
  cursor: pointer;
}
.nav-list-item > img {
  width: 7%;
  margin: 0 15px;
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
</style>
