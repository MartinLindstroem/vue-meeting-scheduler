<template>
    <nav class="navbar">
        <ul class=nav-content>
            <li><button class="signInBtn" v-if="!this.tenantId" v-on:click="signIn">Sign in</button></li>
            <li class="userDisplay" v-if="this.tenantId">Logged in: {{account}} </li>
            <li><router-link class="nav-link" to="/">Home</router-link></li>
            <li v-if="this.account"><router-link to="/calendar">Calendar</router-link></li>
            <li v-if="this.account"><router-link :to="{ path: `/poll/${this.tenantId}` }">Vote</router-link></li>
        </ul>



        <!-- <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a> -->
    </nav>
</template>

<script>
// import { msal } from "@/main"
import { msalRequest } from '@/plugins/config'
import { msalClient } from '@/plugins/auth'
import { getUser } from '@/plugins/graph'
// console.log(this.$route.params.id);
// console.log(account);

export default {
    data: () => ({
        tenantId: null,
        account: null
    }),
    mounted() {
        if (sessionStorage.getItem('msalAccount')) {
            this.account = sessionStorage.getItem('msalAccount')
        }

        if (sessionStorage.getItem('tenantId')) {
            this.tenantId = sessionStorage.getItem('tenantId')
        }
    },
    methods: {
        // sign in with microsoft account
        async signIn() {
            // login
            try {
                // use msal to login
                const loginResponse = await msalClient.loginPopup(msalRequest);
                // console.log(loginResponse.tenantId);
                
                // Save the tenant ID in session
                sessionStorage.setItem('tenantId', loginResponse.tenantId);

                this.tenantId = sessionStorage.getItem('tenantId');

                // save the account username, needed for token acquisition
                sessionStorage.setItem('msalAccount', loginResponse.account.username);
                // console.log(loginResponse.account.username);
                this.account = sessionStorage.getItem('msalAccount')

                //Get the users profile from graph
                let user = await getUser();
                // Save the profile in session
                sessionStorage.setItem('graphUser', JSON.stringify(user));
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>
    .navbar {
        background-color: #2196F3;
        height: 100px;
    }

    .nav-content {
        padding: 30px;
    }

    .nav-content li {
        display: inline;
        padding: 10px;
        color: white !important;
        font-size: 20px;
    }

    .nav-content li a {
        color: white;
        text-decoration: none;
        padding: 10px;
        /* float: left; */
        /* float: right; */
    }

    .signInBtn {
        float: right;
        border: 1px solid white;
        border-radius: 15px;
        width: 100px;
        text-align: center;   
    }

    .userDisplay {
        float: right;
    }

    @media screen and (max-width: 840px) {
        ul .userDisplay {
            display: none
        }
    }
</style>
