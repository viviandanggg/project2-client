export const Action = Object.freeze({
    LoadStatements: 'LoadStatements',
    FinishAddingStatement: 'FinishAddingStatement',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingStatement: 'FinishSavingStatement',
    FinishDeletingStatement: 'FinishDeletingStatement',
    LoadSum: 'LoadSum',
    LoadSumMonth: 'LoadSumMonth',
    StopWaiting: 'StopWaiting',
    StartWaiting: 'StartWaiting',
});

export function stopWaiting() {
    return {
        type: Action.StopWaiting,
    }
}

export function startWaiting() {
    return {
        type: Action.StartWaiting,
    }
}

export function loadStatements(statements) {
    return {
        type: Action.LoadStatements,
        payload: statements,
    }
}

export function loadSum(sumYear) {
    return {
        type: Action.LoadSum,
        payload: sumYear,
    }
}

export function loadSumMonth(sumMonth) {
    return {
        type: Action.LoadSumMonth,
        payload: sumMonth,
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

export function finishDeletingStatement(statement) {
    return {
        type: Action.FinishDeletingStatement,
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
                   dispatch(loadStatements(data.budget))
                }
            })
            .catch(e => console.error(e));
    }
}

export function loadYearlySum(year) {
    return dispatch => {
        fetch(`${host}/statements/sum/${year}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                console.log("year" + data);
                if (data.ok) {
                   dispatch(loadSum(data.budget))
                }
            })
            .catch(e => console.error(e));
    }
}

export function loadMonthlySum(month, year) {
    return dispatch => {
        fetch(`${host}/statements/sum/${month}/${year}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log("month" + data.budget);
                   dispatch(loadSumMonth(data.budget))
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
        dispatch(startWaiting());
        fetch(`${host}/statements/${statement.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                   dispatch(finishSavingStatement(statement));
                }
                dispatch(stopWaiting());
                //setTimeout(() => dispatch(stopWaiting(), 10000));
            })
            .catch(e => console.error(e));
    }
}

export function startDeletingStatement(statement) {
    const options = {
        method: 'DELETE',
    }
    return dispatch => {
        fetch(`${host}/statements/${statement.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                   dispatch(finishDeletingStatement(statement));
                }
            })
            .catch(e => console.error(e));
    }
}
