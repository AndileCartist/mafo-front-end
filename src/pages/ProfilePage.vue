<template>
  <div class="content">
    <h1>User Profile</h1>
    <div id="gradient"></div>
    <div id="card">
      <div class="avator-section">
        <div class="avator">
          <img src="../assets/user-4253.svg" alt="user profile" />
        </div>
        <div class="upload-btn-wrapper">
          <p>upload fees POP</p>
          <button class="upload-btn">Upload a file</button>
          <input type="file" name="myfile" />
        </div>
        <div class="upload-btn-wrapper">
          <p>Upload copy trading POP</p>
          <button class="upload-btn">Upload a file</button>
          <input type="file" name="myfile" />
        </div>
        <div class="upload-section">
          <div class="button-container">
            <button
              @click="editToggle()"
              class="button-50 edit-btn"
              role="button"
            >
              {{ btnText }}
            </button>
          </div>
        </div>
      </div>
      <div class="info-section">
        <div class="bio">
          <p>{{ userName.name }} {{userName.surname}}</p>
          <p>{{userEmail}}</p>
          <p>joined on: {{ formatDate(getDate) }}</p>
        </div>
        <div class="tab-section">
          <p :class="{ underline: toggleTab }" @click="toggle()">About</p>
          <p :class="{ underline: !toggleTab }" @click="toggle()">Payments</p>
        </div>
        <div
          :style="toggleTab ? { display: 'block' } : { display: 'none' }"
          class="details"
        >
          <div>
            <p>Name</p>
            <p>{{ userName.name }}</p>
          </div>
          <div>
            <p>Surname</p>
            <p>{{ userName.surname }}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{{ userEmail }}</p>
          </div>
          <div>
            <p>Contact</p>
            <p>{{ getContact }}</p>
          </div>
          <div>
            <p>Luno Wallet</p>
            <p v-if="!edit">{{ wallet }}</p>
            <input v-model="wallet" v-else type="text" />
          </div>
        </div>
        <div
          :style="!toggleTab ? { display: 'block' } : { display: 'none' }"
          class="details"
        >
          <div v-for="payment of payments" :key="payment.id">
            <p>{{ formatDate(payment.date) }}</p>
            <p>R {{ payment.amount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const apiUrl = process.env.API_URL || "https://mafo-academy.herokuapp.com";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  name: "user-profile",
  components: {},
  data() {
    return {
      toggleTab: true,
      edit: false,
      editBtnText: "",
      wallet: "",
      payments: "",
    };
  },
  computed: {
    ...mapGetters([
      "getToken",
      "getRole",
      "getId",
      "getContact",
      "userName",
      "userEmail",
      "getDate"
    ]),
    btnText() {
      return this.edit ? "Submit" : "Edit Luno Wallet";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const query = {
        user: {
          equals: this.getId,
        },
      };
      const stringifiedQuery = qs.stringify(
        { where: query },
        { addQueryPrefix: true }
      );
      try {
        const userUrl = `${apiUrl}/api/payments${stringifiedQuery}`;
        const adminUrl = `${apiUrl}/api/payments`;
        let url = this.getRole === "admin" ? adminUrl : userUrl;
        let { data } = await axios.get(url, {
          headers: {
            Authorization: `JWT ${this.getToken}`,
          },
        });
        this.payments = data.docs.reverse();
        console.log();
      } catch (err) {
        alert(err.message || "An error occurred.");
      }
    },
    toggle() {
      this.toggleTab ? (this.toggleTab = false) : (this.toggleTab = true);
    },
    editToggle() {
      this.edit ? (this.edit = false) : (this.edit = true);
    },
    formatDate(date) {
      let string = new Date(date);
      return string.toDateString();
    },
  },
};
</script>

<style lang="css" scoped>
.button-50:focus {
  text-decoration: none;
}
.button-50:hover {
  text-decoration: none;
}
.button-50:active {
  box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
  outline: 0;
}
.button-50:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}

input {
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: rgb(33 35 38 / 10%) 0px 10px 10px -10px;
  border: none;
  resize: none;
  background-color: #a8bac6;
  border: 1px solid #dfdede;
  padding-left: 10px;
  width: 50%;
  height: 32px;
  margin-top: 15px;
  color: #ffffff;
}
input:focus,
select:focus {
  border: 1px solid #d6d5d5;
  outline: none;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: rgb(146, 146, 146);
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: rgb(146, 146, 146);
}

.edit-btn {
  background-color: #8798a3;
  width: 50%;
  padding: 6px 30px;
}
.button-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.button-50 {
  appearance: button;
  background-color: #8798a3;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 1px 1px 0 0, #000 1px 1px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 6px 20px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
.content {
  min-height: 700px;
  background-color: rgb(203 213 224);
  background-image: url("../assets/diamond-sunset.svg");
  padding-bottom: 50px;
}
.content > h1 {
  padding: 35px 25px;
  font-family: inherit;
  color: #1d4a69;
  margin-bottom: 0;
  margin-top: 0;
}

.left {
  left: 25px;
}

.right {
  right: 25px;
}

.center {
  text-align: center;
}

.bottom {
  position: absolute;
  bottom: 25px;
  color: whitesmoke;
}

#gradient {
  background: #a1b2bd;
  background-image: linear-gradient(
    #eff2f4 20%,
    #a1b2bd 20%,
    #7d8d99 40%,
    #608095 40%,
    #587990 60%,
    #07568b 60%,
    #084f7e 80%,
    #2d3748 80%
  );
  margin: 0 auto;
  width: 100%;
  height: 150px;
}

#card {
  position: relative;
  width: 75%;
  padding: 25px;
  padding-top: 10px;
  padding-bottom: 0;
  top: -150px;
  margin-left: -250px;
  background: #a8bac6;
  box-shadow: -20px 0 35px -25px black, 20px 0 35px -25px black;
  z-index: 5;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 600px;
}

#card h2 {
  font-family: courier;
  color: #333;
  margin: 0 auto;
  padding: 0;
  font-size: 15pt;
}

#card p {
  font-family: courier;
}

#card span {
  font-family: courier;
}
.avator-section {
  height: 100%;
}
.info-section {
  height: 100%;
}
.avator {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
.avator > img {
  width: 100px;
  height: auto;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.upload-btn-wrapper > p {
  color: whitesmoke;
  font-size: 15px;
}

.upload-btn {
  border: 2px solid rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  background-color: #a8bac6;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.upload-btn-wrapper input[type="file"] {
  position: absolute;
  left: 50px;
  top: 50px;
  opacity: 0;
  cursor: pointer;
}
.bio > p {
  color: whitesmoke;
  margin-bottom: 0;
}
.bio > :nth-child(1) {
  font-size: 1.6rem;
  font-weight: 600;
}
.bio > :nth-child(2) {
  font-size: 1rem;
}
.tab-section {
  display: flex;
  margin-top: 50px;
  border-bottom: 2px rgb(255, 255, 255) solid;
  color: whitesmoke;
  margin-right: 20%;
}
.tab-section > p {
  min-width: 80px;
  margin-bottom: 0px;
  position: relative;
  top: 2px;
  font-size: 1.3rem;
  cursor: pointer;
  width: 50%;
}
.underline {
  border-bottom: 2px #3c3c3c solid;
}
.details > div {
  display: flex;
  margin-right: 20%;
  font-size: 1rem;
  color: whitesmoke;
}
.details > div > p {
  width: 50%;
  margin: 15px 0;
}
@media only screen and (min-width: 768px) {
  .content {
    margin-top: 75px;
    margin-left: 27%;
  }
  #card {
    width: 70%;
    flex-direction: row;
  }
  .avator-section {
    height: 100%;
    width: 35%;
  }
  .info-section {
    height: 100%;
    width: 65%;
  }
  .bio > :nth-child(1) {
    font-size: 2rem;
    font-weight: 600;
  }
  .bio > :nth-child(2) {
    font-size: 1.3rem;
  }
  .details > div {
    font-size: 1.2rem;
  }
  .upload-btn-wrapper input[type="file"] {
    font-size: 18px;
  }
}

@media only screen and (min-width: 1040px) {
  .content {
    margin-left: 24%;
  }
}

@media only screen and (min-width: 1250px) {
  .content {
    margin-left: 17%;
  }
}
</style>
