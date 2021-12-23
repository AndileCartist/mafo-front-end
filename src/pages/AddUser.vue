<template>
  <div class="content">
    <h1>
      Register
    </h1>
    <div class="add-user-section">
      <div class="user-table">
        <form action="submit">
          <category-header header="Register Student"></category-header>
          <div class="input-container">
            <p>Name</p>
            <p>Surname</p>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              v-model="name"
            />
            <input
              required
              type="text"
              name="surname"
              id="surname"
              placeholder="Enter Surname"
              v-model="surname"
            />
          </div>
          <div class="input-container">
            <p>Contact Number</p>
            <p>Email</p>
            <input
              required
              type="number"
              name="numer"
              id="number"
              placeholder="Mobile Number"
              v-model="contact"
            />
            <input
              type="email"
              name="email"
              id=""
              placeholder="someone@mail.com"
              v-model="email"
            />
          </div>
          <div class="input-container">
            <p>Copy Trading Amount</p>
            <p>Affiliate Username</p>
            <input
              required
              type="number"
              name="amount"
              id="amount"
              step="0.00"
              placeholder="Amount"
              v-model="copy_trading_amount"
            />
            <input
              v-model="affiliate_username"
              required
              type="text"
              name="Affiliate Username"
              id=""
            />
          </div>
          <div class="input-container">
            <p>Password</p>
            <p>confirmPassword</p>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <input
              required
              type="password"
              name="password-con"
              id="password-con"
              placeholder="Cornfirm Password"
              v-model="password"
            />
          </div>
          <div class="user-submit">
            <button @click.prevent="handleSignup()" type="submit" class="btn">
              <span>Submit</span>
            </button>
          </div>
        </form>
        <div
          :style="modalOpen ? { display: 'block' } : { display: 'none' }"
          class="modal"
        >
          <span @click="closeModal()" class="close">&times;</span>
          <div>
            <h1>SUCCESS!!</h1>
            <p>
              <i class="star"></i>
            </p>
            <h6>
              An email has been sent to youremail@domain.com. Please check your
              email to confirm your registration.
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryHeader from "../components/CategoryHeader.vue";
import axios from "axios";
export default {
  name: "add-user-page",
  components: {
    CategoryHeader,
  },
  data() {
    return {
      name: "",
      surname: "",
      contact: "",
      email: "",
      affiliate_username: { name: "andile" },
      copy_trading_amount: "",
      password: "",
      confirm_password: "",
      error: "",
      loading: false,
      modalOpen: false,
    };
  },
  methods: {
    async register() {
      axios
        .post("http://localhost:1337/auth/local/register", {
          username: this.name,
          password: this.password,
          email: this.email,
          /*surname: this.surname,
          contact: this.contact,
          copy_trading_amount: this.copy_trading_amount,
          affiliate: this.affiliate_username,*/
        })
        .then((response) => {
          // Handle success.
          console.log("Well done!");
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    },
    async handleSignup() {
      try {
        this.loading = true;
        //     const response = await strapi.login(this.email, this.password)
        await axios.post('http://localhost:3000/api/users/login', {
          username: "Strapi user",
          email: "user@strapi.io",
          password: "strapiPassword",
          /*   surname: this.surname,
          contact: this.contact,
          copy_trading_amount: this.copy_trading_amount,
          affiliate: this.affiliate_username,*/
        });
        this.loading = false;
        this.modalOpen = true;
        //  console.log(res.data);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    closeModal() {
      this.modalOpen = false;
    },
  },
};
</script>

<style lang="css" scoped>
.content {
  min-height: 700px;
  background-color: rgb(203 213 224);
  background-image: url("../assets/diamond-sunset.svg");
}
.content > h1 {
  padding: 35px 25px;
  font-family: inherit;
  color: #1d4a69;
  margin-bottom: 0;
  margin-top: 0;
}
.user-table {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 95%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  margin: 0 25px;
}
.add-user-section {
  display: flex;
  justify-content: center;
}
.input-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.4fr 1fr;
  height: 80px;
  padding: 0 13px;
  grid-gap: 5px 10px;
  margin-bottom: 15px;
  /*background-color: crimson;*/
}
.input-container > input {
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: rgb(33 35 38 / 10%) 0px 10px 10px -10px;
  border: none;
  resize: none;
  background-color: whitesmoke;
  border: 1px solid #dfdede;
  padding-left: 10px;
  max-width: 139px;
}
.input-container > p {
  margin-bottom: 0;
  color: #8f8f8f;
}
input:focus {
  border: 1px solid rgb(124, 127, 129);
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

.user-submit {
  display: flex;
  margin: 20px 0;
}
.btn {
  color: #fff;
  background: #5c5c5c;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  border: 0;
  outline: 0;
  font-size: 1.1rem;
  padding: 12px 48px;
  display: inline-block;
  transform: skew(-21deg);
  margin: auto;
  cursor: pointer;
}
.btn:visited {
  color: #fff;
}
.btn:hover {
  background: #6e6e6e;
}
.btn > span {
  display: inline-block;
  transform: skew(21deg);
}
@media only screen and (min-width: 360px) {
  .input-container > input {
    max-width: 155px;
  }
}

@media only screen and (min-width: 460px) {
  .input-container > input {
    max-width: none;
  }
}
@media only screen and (min-width: 768px) {
  .content {
    margin-top: 75px;
    margin-left: 27%;
  }
}

@media only screen and (min-width: 1040px) {
  .content {
    margin-left: 24%;
  }
  .user-table {
    width: 50%;
  }
}

@media only screen and (min-width: 1250px) {
  .content {
    margin-left: 17%;
  }
}
</style>
