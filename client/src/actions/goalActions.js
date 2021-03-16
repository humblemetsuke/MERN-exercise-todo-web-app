import axios from "axios";

import { GOAL_CREATE, GOAL_UPDATE, GOAL_DELETE, OWN_GOAL_FETCH, OTHER_GOAL_FETCH } from "./types";

// fetch own's goals
export const ownGoalFetch = (data) => dispatch => {
  axios
    .post("/api/goals/search", data)
    .then(res => {
        dispatch({
            type: OWN_GOAL_FETCH,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
};

// fetch other person's goals
export const otherGoalFetch = (data) => dispatch => {
  axios
    .post("/api/goals/otherSearch", data)
    .then(res => {
        dispatch({
            type: OTHER_GOAL_FETCH,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
};

// create a new goal
export const goalCreate = data => dispatch => {
  axios
    .post("/api/goals", data)
    .then(res => {
        dispatch({
            type: GOAL_CREATE,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
};

// update the goal
export const goalUpdate = (id, data) => dispatch => {
    axios
        .put("/api/goals/"+id, data)
        .then(res => {
            dispatch({
                type: GOAL_UPDATE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

// delete the goal
export const goalDelete = id => dispatch => {
    axios
      .delete("/api/goals/"+id)
      .then(res => {
        dispatch({
            type: GOAL_DELETE,
            payload: id
        })
    })
    .catch(err => console.log(err))
};
