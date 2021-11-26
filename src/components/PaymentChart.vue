<template>
  <div>
    <canvas id="payment-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PlanetChart",
  data() {
    return {
      paymentData: {
        type: "line",
        data: {
          labels: [
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Payment History",
              data: [1000, 1220, 1902, 1769, 2415, 2687, 2025, 2156],
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          // lineTension: 1,
          scales: {
            x: {
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("payment-chart");
    new Chart(ctx, this.paymentData);
  },
};
</script>
