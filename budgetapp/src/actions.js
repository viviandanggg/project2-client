
export const Action = Object.freeze({
    LoadStatements: 'LoadStatements',
    FinishAddingStatement: 'FinishAddingStatement',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingStatement: 'FinishSavingStatement',
});


export function loadStatements(statements) {
    return {
        type: Action.LoadStatements,
        payload: statements,
    }
}

export function finishAddingStatement(statement) {
    return {
        type: Action.FinishAddingStatement,
        payload: statement,
    }
}

export function finishSavingStatement(statement) {
    return {
        type: Action.FinishSavingStatement,
        payload: statement,
    }
}

export function enterEditMode(statement) {
    return {
        type: Action.EnterEditMode,
        payload: statement,
    }
}

export function leaveEditMode(statement) {
    return {
        type: Action.LeaveEditMode,
        payload: statement,
    }
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://project2.vvebdesigns.me:8442';

export function loadYear(year) {
    return dispatch => {

        fetch(`${host}/statements/${year}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                   dispatch(loadStatements(data.statements))
                }
            })
            .catch(e => console.error(e));
    }
}


export function startAddingStatement(year, month, day) {
    const statement = {id: 0, amount: 0, category: "", description: "", year, month, day, increase: 0};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statement),
    }
    return dispatch => {

        fetch(`${host}/statements`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                   statement.id = data.id;
                   dispatch(finishAddingStatement(statement));
                }
            })
            .catch(e => console.error(e));
    }
}

export function startSavingStatement(statement) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statement),
    }
    return dispatch => {
        fetch(`${host}/statements/${statement.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                console.log(statement.id);
                if (data.ok) {
                   dispatch(finishSavingStatement(statement));
                }
            })
            .catch(e => console.error(e));
    }
}
