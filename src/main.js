import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './plugins/config.js'

Vue.use(VueRouter)
Vue.use(VueTextareaAutosize);
// Vue.use(ChartInstaller)

import Home from './components/Home.vue';
import Calendar from './components/Calendar.vue';
import Poll from './components/Poll.vue';

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: Home },
        { path: '/calendar', component: Calendar },
        { path: '/poll/:id', component: Poll }
    ]
})

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
