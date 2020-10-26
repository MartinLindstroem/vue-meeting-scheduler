

<template>
  <div class="main">
        <v-btn v-if="this.tenantId" class="mr-4 btn" color="primary" @click="dialog = true">
          Add date
        </v-btn>
        <v-btn v-if="this.tenantId" class="mr-4 btn" color="primary" @click=deleteOptions()>
          Clear
        </v-btn>
          <div class="options">
                <label v-if="this.pollOptions.length > 0" class="text" for="name">Enter your name:</label><br>
                <input v-if="this.pollOptions.length > 0" v-model="name" class="name" type="text">
                <p v-if="this.pollOptions.length > 0" class="text">Pick the date suits you best</p>
                <p v-if="this.pollOptions.length == 0" class="text">Add dates to vote</p>
                <ul>
                    <li
                        v-for="option in pollOptions"
                        :key="option.id"
                        :class="{ selected: selectedOption.id === option.id }"
                        @click="selectOption(option)"
                    >{{option.startDate.substr(0,10) + "-" + option.startDate.substr(11,16)}} -- {{option.endDate.substr(0, 10) + "-" + option.endDate.substr(11, 16) }} <br> votes: {{" " + option.votes}} <br><br> voted: {{option.people}} </li>
                </ul>
                <v-btn v-if="this.pollOptions.length > 0" class="mr-4 btn" color="primary" @click=vote(selectedOption)>
                    Vote
                </v-btn>
        </div>

      <!-- Add event dialog -->
      <v-dialog v-model="dialog" max-width="500">
          <v-card>
              <v-container>
                  <v-form @submit.prevent="addToPoll">
                      <v-text-field v-model="startDate" type="datetime-local" label="Start date (required)"></v-text-field>
                      <v-text-field v-model="endDate" type="datetime-local" label="End date (required)"></v-text-field>
                      <v-btn
                        type="submit"
                        color="primary"
                        class="mr-4"
                        @click.stop="dialog=false">Add to poll
                      </v-btn>
                  </v-form>
              </v-container>
          </v-card>
      </v-dialog>
  </div>
</template>



<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '@/main'

export default {
    name: "Poll",

    data: () => ({
        selectedOption: "",
        pollOptions: [],
        voted: false,
        dialog: false,
        option: null,
        // date: null,
        startDate: null,
        endDate: null,
        dates: [],
        nrOfVotes: [],
        tenantId: sessionStorage.getItem('tenantId'),
        name: "",
    }),
    async mounted() {
        await this.getPollOptions();

        for (let i = 0; i < this.pollOptions.length; i++) {
            this.dates.push(this.pollOptions[i].startDate)
            this.nrOfVotes.push(this.pollOptions[i].votes)
        }
    },
    methods: {
        // get poll options from database
        async getPollOptions() {
            let snapshot = await db.collection('vuePoll').doc(this.$route.params.id).collection('pollOptions').get();

            let options = [];
            snapshot.forEach(doc => {
                let appData = doc.data();
                appData.id = doc.id;
                options.push(appData);
            });
            this.pollOptions = options;
        },
        // Add dates to poll options in database
        async addToPoll() {
            if(this.startDate && this.endDate) {
                await db.collection('vuePoll').doc(this.tenantId).collection('pollOptions').add({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    votes: 0,
                    people: []
                });
            }
            this.getPollOptions();
            this.startDate = "";
            this.endDate = "";

        },
        // vote for an option, increment number of votes of selected option by 1
        async vote(option) {
            if (this.voted == false) {
                let updatedVote = option.votes + 1
                await db.collection('vuePoll').doc(this.$route.params.id).collection('pollOptions').doc(option.id).update({
                votes: updatedVote
                });

                await db.collection('vuePoll').doc(this.$route.params.id).collection('pollOptions').doc(option.id).update({
                    people: firebase.firestore.FieldValue.arrayUnion(this.name)
                })
            } else {
                alert("You have already voted")
            }

            this.voted = true;
            this.getPollOptions();
        },
        selectOption(option) {
            this.selectedOption = option;
            // console.log(this.name);
            // console.log(this.selectedOption);
        },
        // Delete all poll options from database
        async deleteOptions() {
            for await (const option of this.pollOptions) {
                db.collection('vuePoll').doc(this.tenantId).collection('pollOptions').doc(option.id).delete();
            }
            this.getPollOptions();
        }
    }
}
// console.log(pollOptions);
</script>

<style scoped>

.btn {
    margin: 10px;
    /* float: left; */
}

.options {

margin-top: 20px;

margin-left: 20px;

margin-bottom: 20px;

padding: 10px 25px;

border-radius: 6px;

box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);

width: 40%;

border-top: 5px solid #2196F3;

} 

ul {

list-style: none;

padding-left: 0;

}

li {

padding: 22px 17px;

border: 1px solid rgba(0, 0, 0, 0.2);

margin-bottom: 15px;

border-radius: 6px;

cursor: pointer;

}

li.selected {

/* outline: 5px solid #0d0; */
box-shadow: 0 0 2px 2px #0d0;


}

.text {
    font-size: 20px;
    font-weight: 500;
}

.name {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
}

.name:focus {
    outline: none
}

@media screen and (max-width: 840px) {
    .options {
        width: 90%
    }
}

</style>
