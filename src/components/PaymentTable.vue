<template>
  <div class="table-con">
    <div class="table">
      <div class="table-head">
        <p>NAME</p>
        <p>Email</p>
        <p>Date</p>
        <p>Amount</p>
      </div>
      <div v-for="payment in payments" :key="payment.id" class="payment-info">
        <p>{{ payment.username }}</p>
        <p>{{ payment.user.email }}</p>
        <p>{{ formatDate(payment.date) }}</p>
        <p>R {{ payment.payout }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "table",
  props: {
    payments: Array,
  },
  methods: {
    formatNumber(number) {
      let num = `0${number}`;
      let last = num.slice(0, num.length - 1);
      let lastNumber = num.slice(num.length - 1);
      let formated = last.replace(/([0-9]{3})/g, "$1" + "-");
      return `${formated.slice(0, formated.length - 1)}${lastNumber}`;
    },
    formatDate(date) {
      let string = new Date(date);
      return string.toDateString();
    },
  },
};
</script>

<style scoped>
.table-con {
  width: 100%;
}
.table {
  width: 95%;
  min-height: 300px;
  background: #ffffff;
  margin-top: 55px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
}
.table-head {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgb(249, 250, 251);
  height: 45px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  opacity: 0.95;
  box-shadow: -3px 9px 9px -8px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: -3px 9px 9px -8px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -3px 9px 9px -8px rgba(0, 0, 0, 0.1);
}
.table-head > p,
.payment-info > p {
  padding-left: 15px;
  color: #5e5e5e;
}

.payment-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 0.8fr;
  /* height: 90px;   */
  border-bottom: 1px solid rgb(229, 231, 235);
  align-items: flex-end;
  margin-bottom: 15px;
}
.payment-info > p {
  grid-column-start: span 2;
  padding-left: 15px;
  color: #5e5e5e;
  font-family: serif;
  font-size: 1.1rem;
}
.button-container {
  grid-column-start: span 3;
  margin: auto;
}

/*  Button   */
.button-50 {
  appearance: button;
  background-color: #000;
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
.view-btn {
  background-color: rgb(95, 118, 160);
  margin-left: 10px;
}
.edit-btn {
  background-color: rgb(158, 84, 58);
  margin-left: 20px;
  padding: 6px 30px;
}
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

@media only screen and (min-width: 768px) {
  .button-50 {
    padding: 6px 20px;
  }
  .edit-btn {
    padding: 6px 30px;
  }
  .table {
    width: 83%;
  }
}
/*         button       */
@media only screen and (min-width: 1200px) {
  .table-head {
    grid-template-columns: repeat(4, 2fr);
  }
  .payment-info {
    grid-template-columns: repeat(4, 2fr);
    height: 60px;
  }
  .payment-info > p {
    grid-column-start: span 1;
  }
  .button-container {
    grid-column-start: span 1;
    margin-top: 13px;
  }
}
</style>
