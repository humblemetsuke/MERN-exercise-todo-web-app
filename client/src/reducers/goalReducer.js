import { GOAL_CREATE, GOAL_UPDATE, GOAL_DELETE, OWN_GOAL_FETCH, OTHER_GOAL_FETCH } from "../actions/types";

const initialState = {
    list: [],
    otherList: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case OWN_GOAL_FETCH:
            return {
                ...state,
                list: [...action.payload]
            }
        case OTHER_GOAL_FETCH:
            return {
                ...state,
                otherList: [...action.payload]
            }
        case GOAL_CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case GOAL_UPDATE:
            return {
                ...state,
                list: state.list.map(x => x._id==action.payload._id?action.payload:x)
            }
        case GOAL_DELETE:
            return {
                ...state,
                list: state.list.filter(x => x._id!=action.payload)
            }
        default:
            return state;
    }
}