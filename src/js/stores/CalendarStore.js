import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class CalendarStore extends EventEmitter {
    constructor () {
        super();

        // Dummy data
        this.calendars = [
            {
                id: 15192085,
                desc: "Lorem ipsum dolor sit amet",
                date: Date.now(),
                title: "Title 1"
            },
            {
                id: 15193585,
                desc: "Lorem ipsum dolor sit amet 2",
                date: Date.now() + 1000,
                title: "Title 2"
            },
            {
                id: 12192085,
                desc: "Lorem ipsum dolor sit amet 3",
                date: Date.now() + 2000,
                title: "Title 2"
            }
        ];
    }

    // Add a calendar event to the list
    addCalendar(date, desc, title) {
        this.calendars.push({
            id: Date.now(),
            desc,
            date,
            title
        });

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
            case "ADD_CALENDAR": {
                this.addCalendar(action.date, action.desc, action.title);
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
