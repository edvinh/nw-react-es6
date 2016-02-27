import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuButton from 'material-ui/lib/svg-icons/navigation/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import LeftNav from 'material-ui/lib/left-nav';

import CalendarContainer from './CalendarContainer';

export default class LeftNavMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {open: false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }
    handleClose() {
        this.setState({open: false});
    }
    render() {
        return (
            <div>
                <AppBar
                  title='Calendar'
                  iconElementLeft={<IconButton onTouchTap={this.handleToggle}><MenuButton /></IconButton>}
                  iconElementRight={<FlatButton label="Add" />}
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
            </div>
        );
    }
}
