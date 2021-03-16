import { createMuiTheme, List, ListItem, ListItemIcon, ListItemText, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import LinearWithValueLabel from '../functions/ProgressBar';

const styles = theme => ({
    goal: {
        marginTop: theme.spacing(5)
    }
})

export class Achievement extends Component {
    render() {
        const { classes } = this.props;
        const goals = this.props.goals;
        // progress
        var progress = 0;
        if (goals.length>0) {
            var count = 0;
            for(var i = 0; i < goals.length; ++i){
                if(goals[i].isComplete === true)
                    count++;
            }
            progress = (count/goals.length)*100;
        }    // progress

        return (
            <div>
                <Typography>Completed ratio</Typography>
                <LinearWithValueLabel progress={progress} />

                <List className={classes.goal}>
                    <Typography>Completed trains</Typography>
                    {
                        goals.map((goal, index) => {
                            return(
                                goal.isComplete &&
                                (<ListItem key={index}>
                                    <ListItemText primary={goal.goal} secondary={goal.completeTime} />
                                </ListItem>)
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(Achievement)
