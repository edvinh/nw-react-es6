import dispatcher from '../dispatcher';

export function createCalendar(eventObj) {
    dispatcher.dispatch({
        type: "CREATE_CALENDAR",
        date: eventObj.date,
        time: eventObj.time,
        desc: eventObj.desc,
        title: eventObj.title
    });
}

export function deleteCalendar(id) {
    dispatcher.dispatch({
        type: "DELETE_CALENDAR",
        id
    });
}

export function getCalendars() {
    // TODO... Implement Google Cal API
}
