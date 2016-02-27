import dispatcher from '../dispatcher';

export function createCalendar(date, desc, title) {
    dispatcher.dispatch({
        type: "CREATE_CALENDAR",
        date,
        desc,
        title
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
