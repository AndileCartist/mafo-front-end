<template>
  <div class="content">
    <h1>Payment History</h1>
    <div class="chart-con">
      <payment-chart></payment-chart>
     
    </div>
  </div>
</template>

<script>
import axios from "axios";
const apiUrl = process.env.API_URL || "https://mafo-backend.herokuapp.com/";
import PaymentChart from "../components/PaymentChart.vue";
//import Table from "../components/Table.vue"
export default {
  name: "PaymentHistory",
  components: {
    PaymentChart,
  //  Table,
  },
    data() {
    return {
      students: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let { data } = await axios.get(
          `${apiUrl}student-data?_sort=publishedAt:DESC&_start=60&_limit=${7}`
        );
        this.students = data;
        // console.log(data);
      } catch (err) {
        alert(err.message || "An error occurred.");
        console.log(err);
        console.log(this.$route.name);
      }
    },
  },
};
</script>

<style scoped>
.content {
  height: 850px;
  background-color: rgb(203 213 224);
  background-color: aliceblue;
  /* background-image: url("../assets/diamond-sunset.svg");*/
}
.content > h1 {
  padding: 35px 25px;
  font-family: inherit;
  color: #1d4a69;
  margin-bottom: 0;
  margin-top: 0;
}
.chart-con {
  width: 99%;
  margin: auto;
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
  .chart-con {
  width: 85%;
}
}

@media only screen and (min-width: 1250px) {
  .content {
    margin-left: 17%;
  }
  .chart-con {
  width: 75%;
}
}
</style>
