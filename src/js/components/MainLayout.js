import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuButton from 'material-ui/lib/svg-icons/navigation/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

import CalendarContainer from './CalendarContainer';
import * as CalendarActions from '../actions/CalendarActions';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddAccept = this.handleAddAccept.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            addCal: false,
        };
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleAdd() {
        this.setState({addCal: true});
    }

    handleAddClose() {
        this.setState({addCal: false});
    }

    handleAddAccept() {
        this.setState({
            addCal: false
        });

        CalendarActions.createCalendar({
            date: this.state.date,
            title: this.state.title,
            desc: this.state.desc,
            time: this.state.time
        });
    }

    formatDate (date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" +
        date.getFullYear();
    }

    formatTime (date) {
        let hours = time.getHours();
        if (hours < 10) hours = "0" + hours;
        let minutes  = time.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        return hours + ":" + minutes;
    }

    render() {


        const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleAddClose}
          />,

          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleAddAccept}
          />
        ];

        const textFieldStyle = {
            width: '100%'
        };

        return (
            <div>
                <AppBar
                  title='Calendar'
                  iconElementLeft={<IconButton onTouchTap={this.handleToggle}><MenuButton /></IconButton>}
                  iconElementRight={<FlatButton label="Add" onTouchTap={this.handleAdd} primary={true} />}
                />

                <LeftNav
                  docked={false}
                  width={200}
                  open={this.state.open}
                  onRequestChange={open => this.setState({open})}
                >

                <MenuItem>Calendar</MenuItem>
                <MenuItem>Settings</MenuItem>

                </LeftNav>

                <CalendarContainer />

                {/* TODO Move dialog to separate component*/}
                <Dialog
                    title="Add Calendar Event"
                    actions={actions}
                    modal={false}
                    open={this.state.addCal}
                    onRequestClose={this.handleAddClose}
                >
                    <p>Fill in the information for the event.</p>

                    {/* Event Date & Time */}
                    <DatePicker
                      textFieldStyle={textFieldStyle}
                      hintText="Date"
                      formatDate={this.formatDate}
                      onChange={(e, date) => {
                              let d = this.formatDate(date);
                              this.setState({date: d});
                          }
                      }
                    />

                    <TimePicker
                      textFieldStyle={textFieldStyle}
                      format="24hr"
                      hintText="Time"
                      onChange={(e, time) => {
                              let t = this.formatTime(time);
                              this.setState({time: t});
                          }
                      }
                    />

                    {/* Event Title */}
                    <TextField
                      onChange={e => this.setState({title: e.target.value})}
                      style={textFieldStyle}
                      hintText='e.g. "Birthday"'
                      floatingLabelText="Event Title"
                    />

                    <br />

                    {/* Event Description */}
                    <TextField
                      onChange={e => this.setState({desc: e.target.value})}
                      style={textFieldStyle}
                      floatingLabelText="Event Description"
                      multiLine={true}
                      rows={2}
                      maxRows={10}
                    />
                </Dialog>
            </div>
        );
    }
}
