

<template>
  <div class="main">
    <div class="image">
      <img src="../assets/calendar.jpg" alt="calendar">
    </div>
    <h1>Welcome to EasyMeet!</h1>
    <div class="content-outer">
      <div class="content-inner">
        <br>
        <h3>What is EasyMeet?</h3>
        <p>EasyMeet is a free online meeting scheduler integrated with Microsoft. Once you log in with your Microsoft account you have access to a calendar which is linked to your personal Microsoft Calendar. To schedule a meeting you can create a poll with different dates and send your link to the people you want to schedule with and let them vote for the dates and times that suit them best.</p>
        <p>When everyone has voted you can create an event with the date you want and send out invites to everyone involved.</p>
    </div>
    </div>

    
    
    <!-- <ul>
      <li>
        hej
      </li>
      <li>
        då
      </li>
  </ul> -->
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

img {
  width: 100%;
  height: 800px;
}

.content-outer {
  background-color: #2196F3;
}

.content-inner {
  width: 700px;
  background-color: #2196F3;
  margin: 0 auto;
  margin-top: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.2em;
  color: white;
  padding: 10px;
}

.main h1,h2 {
  text-align: center;
  color: #2196F3;
}

.content-inner h3 {
  text-align: center;
  color: white;
}

@media screen and (max-width: 700px) {
        .content-inner {
          width: 100%;
        }

        img {
          height: 300px;
        }
}

@media screen and (min-width: 1800px) {
    img {
        height: 1200px;
    }
}

</style>