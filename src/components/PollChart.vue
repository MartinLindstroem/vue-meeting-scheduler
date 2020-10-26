
// <script>
// import { Doughnut } from 'vue-chartjs'
// import Poll from './Poll.vue'
// // console.log(Poll.data)
// // console.log(Poll);
// // console.log(this.pollOptions);
// // console.log(this.da);
// export default {
//     extends: Doughnut,
//     props: ["pollOptions", "dates", "nrOfVotes"],
//     components: {
//           Poll
//         },
//     data () {
//       return {
//         chartData: {
//           // labels: ["Babol",	"Cabanatuan",	"Daegu",	"Jerusalem", "hej"],
//           labels: this.dates,
//           datasets: [{
//               borderWidth: 1,
//               borderColor: [
//               'rgba(255,99,132,1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)'                
//               ],
//               backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',                
//               ],
//               data: this.nrOfVotes,
//               // data: [5, 6]
//             }]
//         },
//         options: {
//           legend: {
//             display: true
//           },
//           responsive: true,
//           maintainAspectRatio: false
//         },
//       }
//     },
//     mounted() {
//         // setTimeout(this.renderChart(this.chartData, this.options), 3000)
//         this.renderChart(this.chartData, this.options)  
      
//       // console.log(this.nrOfVotes[1])

//     //   console.log(this.pollOptions[0].date);
//         // console.log(this.dates);
//         console.log("hej");
//     },
//     methods: {

//     }
// }
// </script>