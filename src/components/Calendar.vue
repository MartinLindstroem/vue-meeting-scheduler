<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn v-if="this.tenantId" class="mr-4" color="primary" @click="dialog = true">
              Add event
          </v-btn>
          <v-btn outlined class="mr-4 todayBtn" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <!-- Add event dialog -->
      <v-dialog v-model="dialog" max-width="500">
          <v-card>
              <v-container>
                  <v-form @submit.prevent="createMicrosoftEvent">
                      <v-text-field v-model="name" type="text" label="Event name (required)"></v-text-field>
                      <v-text-field v-model="details" type="text" label="Details"></v-text-field>
                      <v-text-field v-model="startDate" type="datetime-local" label="Start (required)"></v-text-field>
                      <v-text-field v-model="endDate" type="datetime-local" label="End (required)"></v-text-field>
                      <v-text-field v-model="attendees" type="text" label="Invites (Put a semicolon between every email address)" placeholder="email@example.com;another-email@example.com"></v-text-field>
                      <!-- <v-text-field v-model="color" type="color" value="#2196F3" label="Color"></v-text-field> -->
                      <v-btn
                        type="submit"
                        color="primary"
                        class="mr-4"
                        @click.stop="dialog=false">Create event
                      </v-btn>
                  </v-form>
              </v-container>
          </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <!-- <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { graphClient } from '@/plugins/graph'
import { getIanaFromWindows } from '@/plugins/timezones'
// import { db } from '@/main'
import moment from 'moment'
import 'moment-timezone'

export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: "month",
        typeToLabel: {
            month: "Month",
            week: "Week",
            day: "Day",
            "4day": "4 Days"
        },
        name: null,
        details: null,
        startDate: null,
        endDate: null,
        attendees: null,
        color: "#2196F3",
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        dialog: false,
        tenantId: sessionStorage.getItem('tenantId')
    }),
    mounted() {
        // this.getMicrosoftEvents();
        if (this.tenantId) {
          this.getMicrosoftEvents();
        }
        
    },
    methods: {
        //Create microsoft calendar event
        async createMicrosoftEvent() {
            const user = JSON.parse(sessionStorage.getItem('graphUser'));

            let newEvent = {
              subject: this.name,
              start: {
                dateTime: this.startDate,
                timeZone: user.mailboxSettings.timeZone
              },
              end: {
                dateTime: this.endDate,
                timeZone: user.mailboxSettings.timeZone
              }
            };

            if (this.details) {
              newEvent.body = {
                contentType: 'text',
                content: this.details
              };
            }

            if (this.attendees) {
              const attendeeArray = this.attendees.split(';')
              newEvent.attendees = [];
              console.log(attendeeArray);

              for (const attendee of attendeeArray) {
                if (attendee.length > 0) {
                  newEvent.attendees.push({
                    type: 'required',
                    emailAddress: {
                      address: attendee
                    }
                  });
                }
              }
            }

            try {
              await graphClient
                .api('/me/events')
                .post(newEvent)
              
              this.getMicrosoftEvents();
            } catch (e) {
              console.log(e);
            }

            this.name = ""
            this.details = ""
            this.startDate = ""
            this.endDate = ""
            this.attendees = ""
            // console.log(this.attendees);
        },

        // Get events from users microsoft calendar
        async getMicrosoftEvents() {
            const user = JSON.parse(sessionStorage.getItem('graphUser'));
            let ianaTimeZone = getIanaFromWindows(user.mailboxSettings.timeZone);
            let startDate = moment.tz(ianaTimeZone).startOf('year').subtract(365, 'day').utc();
            let endDate = moment(startDate).add(1825, 'day');
            let data;
            let events = [];

            // console.log(startDate.format());
            // console.log(endDate.format());

            try {
                let response = await graphClient
                .api('/me/calendarview')
                .header("Prefer", `outlook.timezone="${user.mailboxSettings.timeZone}"`)
                .query({ startDateTime: startDate.format(), endDateTime: endDate.format() })
                .select('subject,organizer,start,end,body')
                .get();

                data = response.value;

            } catch (error) {
                console.log(error);
            }

            data.forEach(event => {
                let calEvent = {
                  name: event.subject,
                  details: event.body.content,
                  start: event.start.dateTime.substr(0, 16),
                  end: event.end.dateTime.substr(0, 16),
                  color: this.color
                }
                // events.push(calEvent)
                // this.events = events
                events.push(calEvent)
              });
            this.events = events
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (ev) {
            return ev.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
              this.selectedEvent = event
              this.selectedElement = nativeEvent.target
              setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
        },
        test() {
            console.log("tets");
        }
    }
}
</script>

<style>

label {
  font-weight: 1000;
  font-size: 5px;
}

@media screen and (max-width: 840px) {
  .todayBtn {
    display:none
  }
}

</style>