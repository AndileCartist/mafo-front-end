<template>
  <div class="content">
    <h1>Next Payments</h1>
    <payment-table :payments="sortedPayments"></payment-table>
  </div>
</template>
<script>
import axios from "axios";
import PaymentTable from "../components/PaymentTable.vue";
const apiUrl = process.env.API_URL || "http://localhost:3000";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  name: "next-payments",
  components: {
    PaymentTable,
  },
  data() {
    return {
      payments: [],
    };
  },
  computed: {
    ...mapGetters(["getToken", "getRole", "getId"]),
    sortedPayments() {
      let copy = [...this.payments];
      let payments = copy.map((pay) => {
        return { ...pay, time: new Date(pay.date) };
      });
      console.log(payments);
      return payments.sort((a, b) => a.time - b.time);
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
        this.payments = data.docs;
        console.log();
      } catch (err) {
        alert(err.message || "An error occurred.");
      }
    },
  },
};
</script>

<style lang="css" scoped>
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
}

@media only screen and (min-width: 1250px) {
  .content {
    margin-left: 17%;
  }
}
</style>
