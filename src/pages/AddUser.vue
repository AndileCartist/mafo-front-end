<template>
  <div class="content">
    <h1>
      Register At Mafo Academy
    </h1>
    <div class="add-user-section">
      <div class="user-table">
        <form action="submit">
          <category-header header="Register Student"></category-header>
          <div style="height: 25px;" class="subtitle">{{ error }}</div>
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
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-6789"
              required
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
            <p>Package Category</p>
            <input
              required
              type="number"
              name="amount"
              id="amount"
              step="0.00"
              placeholder="Amount"
              v-model="copy_trading_amount"
            />
            <!--     <input
              v-model="category"
              required
              type="text"
              name="category"
              id=""
              placeholder="Category A"
            />  -->
            <select
              v-model="category"
              class="packages"
              name="category"
              id="category"
            >
              <option value="no selection">Select Option</option>
              <option value="15000">Category A = R 15 000</option>
              <option value="10000">Category B = R 10 000</option>
              <option value="5000">Category C = R 5 000</option>
              <option value="1000">Category D = R 1 000</option>
            </select>
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
              v-model="confirm_password"
            />
          </div>
          <div class="user-submit">
            <button
              @click.prevent="checkInputs(), handleSignup()"
              type="submit"
              class="btn"
            >
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
              An email has been sent to {{ email }}. Please check your email to
              confirm your registration.
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
      category: "no selection",
      copy_trading_amount: "",
      password: "",
      confirm_password: "",
      error: "",
      loading: false,
      modalOpen: false,
      user: "",
      readyToSubmit: false,
      //contactl: this.contact.length
    };
  },
  computed: {},
  methods: {
    async handleSignup() {
      if (this.readyToSubmit) {
        try {
          this.loading = true;
          this.error = "loading...";
          //     const response = await strapi.login(this.email, this.password)
          let user = await axios.post("http://localhost:3000/api/users/", {
            name: this.name,
            email: this.email,
            password: this.password,
            amount: Number(this.copy_trading_amount),
            surname: this.surname,
            contact: this.contact,
            category: Number(this.category),
          });
          this.loading = false;
          this.modalOpen = true;
          this.user = user;
          this.readyToSubmit = false;
          this.error = "";
          if (this.user.errors !== undefined) {
            this.error = this.user.errors[0].message;
          }
          console.log(user.data);
          console.log(user);
        } catch (err) {
          this.loading = false;
          this.readyToSubmit = false;
            this.error = err.message;
          alert(err.message || "An error occurred.");
        }
      }
    },
    closeModal() {
      this.modalOpen = false;
    },
    checkInputs() {
      if (this.name === "" || this.surname === "") {
        this.error = "name and surname required";
        return;
      } else if (this.contact.length < 10 || this.contact.length > 10) {
        this.error = "check contact number";
        return;
      } else if (!this.validateEmail(this.email)) {
        this.error = "check your email format";
        return;
      } else if (this.copy_trading_amount === "") {
        this.error = "copy trading amount missing";
        return;
      } else if (this.category === "no selection") {
        this.error = "Select Package";
        return;
      } else if (!this.validatePassword(this.password)) {
        this.error =
          "password must have a letter with with at least 6 characters";
        return;
      } else if (this.password !== this.confirm_password) {
        this.error = "passwords don't match";
        return;
      }
      this.error = "";
      return (this.readyToSubmit = true);
    },
    validateEmail(email) {
      let regex = /\S+@\S+\.\S+/;
      let regRight = regex.test(email);
      if (!regRight) {
        this.error = "check your email format";
        return false;
      }
      return true;
    },
    validatePassword(password) {
      let num = /[0-9]+/gi;
      let alphabets = /[a-z]+/gi;
      let regRight = num.test(password) && alphabets.test(password);
      let passwordCharacters = password.length >= 6;
      if (!regRight || !passwordCharacters) {
        this.error =
          "password must have a letter with with at least 6 characters";
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="css" scoped>
.content {
  min-height: 850px;
  background-color: rgb(203 213 224);
  background-image: url("../assets/diamond-sunset.svg");
}
.content > h1 {
  padding: 35px 25px;
  font-family: inherit;
  color: #1d4a69;
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
}
.subtitle {
  text-align: center;
  line-height: 2em;
  font-weight: 100;
  letter-spacing: 0px;
  color: red;
  font-family: monospace;
  letter-spacing: 0.02rem;
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
.input-container > input,
.packages {
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
.input-container > p,
select {
  margin-bottom: 0;
  color: #8f8f8f;
}
input:focus,
select:focus {
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

.modal {
  display: none;
  position: fixed;
  z-index: 2100;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(255, 250, 250);
  background-color: rgba(255, 250, 250, 0.98);
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: black;
  font-size: 40px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
.star {
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.9em;
  margin-right: 0.9em;
  margin-bottom: 1.2em;
  border-right: 0.3em solid transparent;
  border-bottom: 0.7em solid #378fce;
  border-left: 0.3em solid transparent;
  /* Controlls the size of the stars. */
  font-size: 74px;
}
.star:before,
.star:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: 0.6em;
  left: -1em;
  border-right: 1em solid transparent;
  border-bottom: 0.7em solid #378fce;
  border-left: 1em solid transparent;
  transform: rotate(-35deg);
}
.star:after {
  transform: rotate(35deg);
}
.modal > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal > div > h1 {
  width: 60%;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 4px;
  border-bottom: 1px solid #ddd;
  font-size: 32px;
  font-weight: 100;
  color: #626262;
}
h6 {
  font-size: 16px;
  font-weight: 400;
  color: #403f3f;
  text-align: center;
  padding: 5px;
}

@media only screen and (min-width: 360px) {
  .input-container > input,
  .packages {
    max-width: 155px;
  }
}

@media only screen and (min-width: 460px) {
  .input-container > input,
  .packages {
    max-width: none;
  }
}
@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 1040px) {
  .user-table {
    width: 40%;
  }
}

@media only screen and (min-width: 1250px) {
}
</style>
