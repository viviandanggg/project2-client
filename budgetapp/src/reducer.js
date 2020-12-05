import {Action} from "./actions.js";

const initialState = {
    isWaiting: false,
    statements: [],
    sumYear: [],
    sumMonth: [],
};

function reducer(state=initialState, action) {
    switch(action.type) {
        case Action.StartWaiting:
            return {
                ...state,
                isWaiting: true,

                // statments: [],
            }
        case Action.StopWaiting:
            return {
                ...state,
                isWaiting: false,
                // statements: [],
            }
        case Action.LoadStatements:
            return {
                ...state,
                statements: action.payload,
            }
        case Action.LoadSum:
            return {
                ...state,
                sumYear: action.payload,
            }
        case Action.LoadSumMonth:
            return {
                ...state,
                sumMonth: action.payload,
            }
        case Action.FinishAddingStatement:
            return {
                ...state,
                statements: [{...action.payload, isEditing: true}, ...state.statements],
            }
        case Action.EnterEditMode:
            return {
                ...state,
                statements: state.statements.map(statement => {
                    if (statement.id === action.payload.id) {
                        return {...statement, isEditing: true};
                    } else {
                        return statement;
                    }
                })
            }
        case Action.LeaveEditMode:
            return {
                ...state,
                statements: state.statements.map(statement => {
                    if (statement.id === action.payload.id) {
                        return {...statement, isEditing: undefined};
                    } else {
                        return statement;
                    }
                })
            }
        case Action.FinishSavingStatement:
            return {
                ...state,
                statements: state.statements.map(statement => {
                    if (statement.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return statement;
                    }
                })
            }
        case Action.FinishDeletingStatement:
            return {
                ...state,
                statements: state.statements.filter(statement => statement.id !== action.payload.id),
            };      
        default:
            return state;
    }
    
}

export default reducer;