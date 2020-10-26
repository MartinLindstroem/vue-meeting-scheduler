<template>
<v-app>
    <v-main>
        <Header />
        <!-- <router-view :pollOptions="pollOptions" /> -->
        <router-view />

    </v-main>
</v-app>
</template>

<script>
// import Calendar from './components/Calendar';
import Header from './components/Header';
// import { account } from '@/plugins/auth'

export default {
    name: 'App',

    components: {
        // Calendar,
        Header
    },

    data() {
        return {
            // pollOptions: [
            //     {
            //         value: 0,
            //         id: 0,
            //         date: "2020-10-07T13:00"
            //     },
            //     {
            //         value: 0,
            //         id: 1,
            //         date: "2020-10-08T13:00"
            //     }
            // ],
            // voted: false
        }
    }
};
// console.log(account);


</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap'); */
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
</style>
