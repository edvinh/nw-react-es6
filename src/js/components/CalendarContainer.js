import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Paper from 'material-ui/lib/paper';

import CalendarStore from '../stores/CalendarStore';
import CalendarActions from '../actions/CalendarActions';

import moment from 'moment-timezone';

export default class CalendarContainer extends React.Component {
    constructor(props) {
        super(props);
        moment.tz("Europe/Berlin");
        this.getCalendars = this.getCalendars.bind(this);
        this.state = {
            calendars: CalendarStore.getCalendars()
        };

    }

    componentWillMount() {
        CalendarStore.on("change", this.getCalendars);
    }

    componentWillUnmount() {
        CalendarStore.removeListener("change", this.getCalendars);
    }

    getCalendars() {
        this.setState({
            calendars: CalendarStore.getCalendars()
        });
    }

    render() {
        let listItems = [];
        for (let ev of this.state.calendars) {
            listItems.push(
                <ListItem
                    primaryText={ev.title}
                    secondaryText={moment(ev.date + " " + ev.time, 'DD/MM/YYYY HH:SS').fromNow()}
                />
            );
        }

        const containerStyle = {
            textAlign: 'center',
            width: '100%',
            paddingTop: 20
        };

        const paperStyle = {
            width: '32%',
            margin: 5,
            display: 'inline-block',
            textAlign: 'left',
            verticalAlign: 'top',
            boxShadow: 'none'
        };

        return (
            <div style={containerStyle}>
                <Paper style={paperStyle} zDepth={1} >
                    <List subheader="Today">
                        {listItems}
                    </List>
                </Paper>

                <Paper style={paperStyle} zDepth={1} >
                    <List subheader="Tomorrow">
                        {listItems}
                    </List>
                </Paper>

                <Paper style={paperStyle} zDepth={1} >
                    <List subheader= {moment().add(2, 'days').format('MMMM Do')}>
                        {listItems}{listItems}
                    </List>
                </Paper>
            </div>
        );
    }
}
