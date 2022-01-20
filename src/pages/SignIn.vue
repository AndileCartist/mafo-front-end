<template>
  <div class="background">
    <div class="wrapper">
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <category-header header="Sign in"></category-header>
            <div style="height: 25px;" class="subtitle">{{ error }}</div>
            <div class="input-fields">
              <input
                type="email"
                placeholder="Email"
                class="input-line full-width"
                v-model="email"
              />
              <input
                type="password"
                placeholder="Password"
                class="input-line full-width"
                v-model="password"
              />
            </div>

            <div class="btn-field">
              <div class="ctn">
                <button
                  class="btn-label"
                  @click="
                    validatePassword(password),
                      validateEmail(email),
                      handleSignin()
                  "
                >
                  <span :class="{ open: loading, load: loading }"
                    ><span
                      :style="
                        loading ? { display: 'none' } : { display: 'block' }
                      "
                      class="btn-text"
                      >Log-in</span
                    ></span
                  >
                </button>
              </div>
              <router-link class="forgot-password" to="/forgot-password"
                >forgot password</router-link
              >
              <div class="spacing">
                <p>|</p>
                <p>OR</p>
                <p>|</p>
              </div>
              <router-link class="adduser-link" to="adduser"
                >Sign-Up</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div
        :style="modalOpen ? { display: 'block' } : { display: 'none' }"
        class="modal"
      >
        <span
          @click="
            closeModal();
            navToHome();
          "
          class="close"
          >&times;</span
        >
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
</template>

<script>
import CategoryHeader from "../components/CategoryHeader.vue";
//import axios from "axios";
const apiUrl = process.env.API_URL || "https://mafo-academy.herokuapp.com";
//import { mapMutations } from 'vuex'
export default {
  name: "sign-in",
  components: { CategoryHeader },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      user: null,
      currentRoute: this.$route.name,
      modalOpen: false,
      error: "",
      passwordCorrect: false,
      readyToSubmit: false,
    };
  },
  computed: {
    btnText() {
      if (this.currentRoute === "signin") {
        return "Sign-In";
      } else {
        return "Create Account";
      }
    },
  },
  watch: {
    $route: "routeUpdate",
  },
  methods: {
    routeUpdate() {
      this.currentRoute = this.$route.name;
    },
    navToHome() {
      this.$router.push("/");
    },
    closeModal() {
      this.modalOpen = false;
    },
    async handleSignin() {
      try {
        if (this.readyToSubmit && this.passwordCorrect) {
          this.loading = true;
          const res = await fetch(`${apiUrl}/api/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });

          const json = await res.json();
          this.user = json;
          this.$store.commit("setUser", json);
          this.loading = false;
          this.readyToSubmit = false;
          this.passwordCorrect = false;
          if (this.user.errors !== undefined) {
            this.error = this.user.errors[0].message;
            his.$router.push("signin");
          }

          if (this.user.errors !== undefined) {
            this.user.user.role === "user"
              ? this.$router.push("profile")
              : this.$router.push("/");
          }
        }
      } catch (err) {
        this.loading = false;
        this.readyToSubmit = false;
      }
    },
    validateEmail(email) {
      let regex = /\S+@\S+\.\S+/;
      let regRight = regex.test(email);
      if (!regRight) {
        return (this.error = "check your email format");
      }
      return (this.readyToSubmit = true);
    },
    validatePassword(password) {
      let num = /[0-9]+/gi;
      let alphabets = /[a-z]+/gi;
      let regRight = num.test(password) && alphabets.test(password);
      let passwordCharacters = password.length >= 6;
      if (!regRight || !passwordCharacters) {
        this.error =
          "password must have a letter with with at least 6 characters";
      }
      return (this.passwordCorrect = true);
    },
  },
};
</script>
<style lang="css" scoped>
input {
  border: none;
}
.forgot-password {
  margin-top: 20px;
  font-size: 16px;
  background: inherit;
  border: none;
  cursor: pointer;
  color: #818181;
}
.btn-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(177 177 177, 0.65);
}

::-webkit-input-placeholder .input-line:focus + ::input-placeholder {
  color: rgb(177 177 177);
}

.highlight {
  color: rgba(201, 201, 201, 0.8);
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s ease;
}

.highlight:hover {
  color: #fff;
  transition: color 0.2s ease;
}

.spacing {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  color: rgb(129 129 129);
  font-size: 12px;
}
.spacing > p {
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 16px;
}

.input-line:focus {
  outline: none;
  border-color: rgb(177 177 177);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ghost-round {
  cursor: pointer;
  background: #cbd5e0;
  border: 1px solid rgba(58, 50, 50, 0.65);
  border-radius: 25px;
  color: rgba(56, 56, 56, 0.65);
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-size: 19px;
  font-size: 1.2rem;
  font-family: roboto;
  font-weight: 300;
  line-height: 2em;
  margin-top: auto;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ghost-round:hover {
  background: #9db4cc;
  color: rgba(56, 56, 56, 0.65);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.input-line {
  background: none;
  margin-bottom: 10px;
  line-height: 2em;
  color: #484444;
  font-family: roboto;
  font-weight: 300;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  font-size: 19px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgb(177 177 177);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.full-width {
  width: 100%;
}

.input-fields {
  margin-top: 25px;
}

.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #cbd5e0;
  background-color: rgb(203 213 224);
  background-image: url("../assets/diamond-sunset.svg");
  height: 850px;
  z-index: 100;
}

.content {
  padding-left: 25px;
  padding-right: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  z-index: 10;
  color: #818181;
}
.adduser-link {
  text-decoration: none;
  font-size: 23px;
  color: #378fce;
}

.welcome {
  font-weight: 200;
  margin-top: 15px;
  text-align: center;
  font-size: 40px;
  font-size: 2.5rem;
  letter-spacing: 0px;
  letter-spacing: 0.05rem;
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

.window {
  color: #fff;
  font-family: roboto;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  box-shadow: 0px 15px 50px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 445px;
  width: 340px;
  background: #fff;
  border-radius: 6px;
}

.overlay {
  filter: alpha(opacity=85);
  height: 420px;
  position: absolute;
  width: 340px;
  background: #ffffff;
  border-radius: 6px;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

@media (max-width: 500px) {
  .window {
    width: 100%;
    height: 100%;
  }
  .overlay {
    width: 100%;
    height: 100%;
  }
}

.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  position: absolute;
  left: 0;
  width: 100%;
  margin-top: 0;
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
.background {
  height: 850px;
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

.ctn {
  display: flex;
  justify-content: center;
}

.btn-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #33849c;
  border: none;
  font-family: "Raleway", serif;
  font-size: 30px;
  color: #fffeee;
  margin-top: 10px;
  height: 40px;
  width: 260px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-text {
  font-family: "Raleway", serif;
  font-size: 20px;
  color: #fffeee;
}
.load {
  /*  display: none;*/
  width: 20px;
  height: 20px;
  border: 5px solid #fff;
  border-radius: 100%;
}
.open {
  border-top: 5px solid transparent;
  animation: load-animate infinite linear 1s;
}

@-moz-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
