import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


export default class CalendarContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const listItems = [
            <ListItem primaryText="One" />,
            <ListItem primaryText="Two" />,
            <ListItem primaryText="Three" />
        ];

        const style = {
            width: '99%',
            height: '100%'
        };

        return (
            <div>
                <GridList cols={3}>
                    <List subheader="Today">
                        {listItems}
                    </List>
                    <List subheader="Tomorrow">
                        {listItems}
                    </List>
                    <List subheader="29/2">
                        {listItems}
                    </List>
                </GridList>
            </div>
        );
    }
}
