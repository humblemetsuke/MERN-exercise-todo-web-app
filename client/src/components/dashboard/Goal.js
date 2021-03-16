import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Typography, withStyles, Tooltip } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import React, { Component } from 'react'

const styles = theme => ({
    action: {
        float: 'right'
    },
    complete: {
        color: 'green'
    }
})

class Goal extends Component {    
    render() {
        const {classes} = this.props;
        const goals = this.props.goals;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>
                            Please enter the training goal
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='goal'
                            variant='outlined'
                            value={this.props.goal}
                            size='small'
                            style={{width: '80%'}} 
                            onChange={this.props.handleChange}       
                        />
                        <Tooltip title='Add'>
                            <IconButton aria-label="add" style={{float: 'right'}} onClick={this.props.handleAdd}>
                                <PostAddIcon />
                            </IconButton>
                        </Tooltip>
                        
                    </Grid>
                    
                    <Grid item xs={12} style={{marginTop: '20px'}}>
                        <Typography>
                            Training goals(week {this.props.week.split("-")[1]}, {this.props.week.split("-")[0]})
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List dense={true}>
                            {                                
                                goals.map((goal, index) => {
                                    return(
                                        <>
                                            <ListItem key={index}>
                                                {                                                    
                                                    goal.isEdit?
                                                        <TextField
                                                            name='edit'
                                                            variant='standard'
                                                            size='small'
                                                            value={this.props.edit}
                                                            onChange={this.props.handleChange}
                                                        />
                                                        :
                                                        <ListItemText>
                                                            {goal.goal}
                                                        </ListItemText>
                                                }
                                                
                                                <div className={classes.action}>
                                                    <ListItemSecondaryAction>
                                                        <Tooltip title='Delete'>
                                                            <IconButton edge="end" onClick={() => this.props.handleDelete(index, goal._id)}>
                                                                <DeleteSweepIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='Edit'>
                                                            <IconButton edge="end" onClick={() => this.props.handleEdit(index, goal._id)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='Complete'>
                                                            <IconButton edge="end" onClick={() => this.props.handleComplete(index, goal._id)} className={ goal.isComplete?classes.complete:'' }>
                                                                <DoneIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ListItemSecondaryAction>
                                                </div>                                                
                                            </ListItem>
                                        </>
                                    )
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default withStyles(styles)(Goal);