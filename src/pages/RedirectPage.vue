<template>
  <div class="background">
    <div class="sheet">
      <div class="loader">Loading...</div>
      <h6>Loading...</h6>
    </div>
  </div>
</template>

<script>
//const apiUrl = "https://originazar-back-end.herokuapp.com";
const apiUrl = process.env.API_URL || "https://mafo-academy.herokuapp.com";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      user: "",
      message: ''
    };
  },
  async created() {
    try {
      this.handleSubmit();
    } catch (err) {
      //  this.fetchMenData();
      // this.fetchKidsData();
      this.error = err.message;
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

    //  let provider = this.$route.path.split("/")[2];
      axios
        .post(
          `${apiUrl}/api/users/verify/${this.$route.query.token}`,
          {}
        )
        .then((response) => {
          // Handle success.
         console.log(this.$route.query)
        //  this.$store.commit("setUser", response.data);
       //   localStorage.setItem("user", JSON.stringify(response.data))    
       this.message = response      
          this.$router.push("/signin");
          this.loading = false;
        }) 
        .catch((error) => {
          // Handle error.
          this.loading = false;
             console.log(this.$route.query)
          alert("error verifying email :", error.response);
        });
    },
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<style lang="css" scoped>
body {
  margin: 0;
  overflow: hidden;
}

.background {
  width: 100%;
  height: 850px;
  background-color: #e6e6e6;
  opacity: 0.4;
  background-image: radial-gradient(#4c4c4e 1px, transparent 1px),
    radial-gradient(#4c4c4e 1px, #e6e6e6 1px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}
.sheet {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}
.sheet > h6 {
  text-align: center;
  color: whitesmoke;
  position: relative;
  top: 40%;
}
.loader {
  color: #fafafa;
  font-size: 120px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  top: 35%;
  left: 45%;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.5s infinite ease, round 1.5s infinite ease;
  animation: load6 1.5s infinite ease, round 1.5s infinite ease;
  margin: 0;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
