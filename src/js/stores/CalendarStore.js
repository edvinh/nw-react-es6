import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';
import moment from 'moment';

class CalendarStore extends EventEmitter {
    constructor () {
        super();

        this.oldEntries = [];
        // Dummy data
        this.calendars = [
            {
                id: 15192085,
                desc: "Lorem ipsum dolor sit amet",
                date: "29/02/16",
                time: "20:12",
                title: "Title 1"
            },
            {
                id: 15193585,
                desc: "Lorem ipsum dolor sit amet 2",
                date: "18/02/16",
                time: "00:30",
                title: "Title 2"
            },
            {
                id: 12192085,
                desc: "Lorem ipsum dolor sit amet 3",
                date: "26/02/16",
                time: "00:01",
                title: "Title 3"
            }
        ];
    }

    sortCalendar() {
        //TODO fix
        let now = Date.now();
        for (let ev of this.calendars) {
            let calTime = moment(ev.date + " " + ev.time, 'DD/MM/YYYY HH:SS').valueOf();
            if (calTime < moment().valueOf()) {
                let pastEv = this.calendars.pop(ev);
                this.oldEntries.push(pastEv);
            }
        }
    }

    getCalendars() {
        return this.calendars;
    }

    // Add a calendar event to the list
    addCalendar(eventObj) {
        this.calendars.push({
            id: Date.now(),
            desc: eventObj.desc,
            date: eventObj.date,
            time: eventObj.time,
            title: eventObj.title
        });
        console.log("addCalendar", eventObj);
        //this.sortCalendar();

        this.emit('change');
    }

    // Delete a calendar event from the list
    deleteCalendar(id) {
        let cal = this.calendar.find((calEvent) => {
            return calEvent.id === id;
        });

        this.calendar.remove(this.calendar.indexOf(cal));
        this.emit('change');
    }

    // Handle actions
    handleActions(action) {
        switch(action.type) {
            case "CREATE_CALENDAR": {
                this.addCalendar({
                    date: action.date,
                    desc: action.desc,
                    time: action.time,
                    title: action.title
                });
                this.emit('change');
                break;
            }

            case "DELETE_CALENDAR": {
                this.deleteCalendar(action.id);
                this.emit('change');
            }
        }
    }
}

const calendarStore = new CalendarStore();

dispatcher.register(calendarStore.handleActions.bind(calendarStore));

export default calendarStore;
