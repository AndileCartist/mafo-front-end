<template>
  <transition name="slide-fade">
    <div v-if="show" class="home-page">
      <h1>
        DashBoard
      </h1>
      <div class="panel-tab">
        <div class="panel-container">
          <img src="../assets/network-team-308.svg" alt="" />
          <div>
            <router-link to="all-students">All Users</router-link>
            <p>1 452</p>
          </div>
        </div>
        <div class="panel-container">
          <img src="../assets/user-login-5867.svg" alt="" />
          <div>
            <router-link @click="show = !show" to="/adduser"
              >Add User</router-link
            >
          </div>
        </div>
        <div class="panel-container">
          <img src="../assets/credit-card-2015.svg" alt="" />
          <div>
            <router-link to="next-payments">Next Payments</router-link>
          </div>
        </div>
      </div>
      <div class="content">
        <Table :students="students" />
        <!--  <div class="table">
          <div class="table-head">
            <p>NAME</p>
            <p>SURNAME</p>
            <p>CONTACT</p>
          </div>
          <div class="student-info">
            <p>Andile</p>
            <p>Mkhize</p>
            <p>071-904-8241</p>
            <div class="button-container">
              <button class="button-50 view-btn" role="button">
                view Profle
              </button>
            </div>
            <div class="button-container">
              <button class="button-50 edit-btn" role="button">Edit</button>
            </div>
          </div>
          <div class="student-info"></div>
          <div class="student-info"></div>
          <div class="student-info"></div>
        </div>  -->
      </div>
    </div>
  </transition>
</template>

<script>
import Table from "../components/Table.vue";
import axios from "axios";
const apiUrl = process.env.API_URL || "https://mafo-backend.herokuapp.com/";

export default {
  name: "home-page",
  components: {
    Table,
  },
  data() {
    return {
      students: [],
      show: true,
    };
  },
  computed: {}, 
  created() {
    this.getData()
  },
  methods: { 
    async getData() {
      try {
        let { data } = await axios.get(
          `${apiUrl}student-data?_sort=publishedAt:DESC&_limit=${13}`
        );
        this.students = data
        console.log(data); 
      } catch (err) {
        alert(err.message || "An error occurred.");
        console.log(err);
        console.log(this.$route.name);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.home-page {
  /* margin-top: 75px;
  margin-left: 27%;*/
  background-image: url("../assets/diamond-sunset.svg");
}
.home-page > h1 {
  padding: 35px 25px;
  font-family: inherit;
  color: #1d4a69;
  margin-bottom: 0;
  margin-top: 0;
}
.panel-tab {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px 15px;
}
.panel-container {
  border-radius: 5px;
  height: 100px;
  background: rgb(255, 255, 255);
  width: 75%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  margin: 0 25px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-columns: 1fr;
  gap: 10px 15px;
  grid-auto-flow: row;
  align-items: center;
  padding: 0 8px;
  justify-items: center;
  cursor: pointer;
}
.panel-container > img {
  width: 50px;
}
.panel-container > div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-family: emoji;
  font-size: 22px;
  padding-top: 10px;
}
.panel-container > div > a {
  text-decoration: none;
  color: #5e5e5e;
}
.panel-container > div > p {
  margin-top: 0px;
  font-size: 17px;
  color: #5e5e5e;
}
.content {
  width: 100%;
  min-height: 650px;
  background-color: inherit;
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 768px) {

  .home-page {
    margin-top: 75px;
    margin-left: 27%;
  }
  .panel-tab {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
 
}


@media only screen and (min-width: 1040px) {
  .home-page {
    margin-left: 24%;
  }
}

@media only screen and (min-width: 1250px) {
  .home-page {
    margin-left: 17%;
  }
}
</style>
