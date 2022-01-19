<template>
  <div class="content">
    <h1>All Students</h1>
    <Table :students="students" />
  </div>
</template>
<script>
import axios from "axios";
import Table from "../components/Table.vue";
const apiUrl = process.env.API_URL || "http://localhost:3000";

export default {
  name: "all-students",
  components: {
    Table,
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
        let {data} = await axios.get(
          `${apiUrl}/api/users`
        );
        this.students = data.docs
        console.log(); 
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
