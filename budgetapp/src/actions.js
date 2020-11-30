
export const Action = Object.freeze({
    LoadStatements: 'LoadStatements',
    FinishAddingStatement: 'FinishAddingStatement',
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
    const statement = {amount: 0, category: "", description: "", year, month, day, increase: 0};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statement),
    }
    return dispatch => {

        fetch(`${host}/statements`)
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
