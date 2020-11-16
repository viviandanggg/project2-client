const initialState = {
    isWaiting: false,
    statements: [
        {id: 1, amount: 19.99, category: "Groceries", description: "Food Lion", year: 2020, month: 5, day: 15},
        {id: 2, amount: 25.00, category: "Transportation", description: "Gas at 7/11", year: 2020, month: 8, day: 2},
        {id: 3, amount: 50.32, category: "Clothes", description: "Target", year: 2020, month: 2, day: 20},
        {id: 3, amount: 200.00, category: "Income", description: "Worked 9-5", year: 2020, month: 9, day: 23, increase: 1},
    ],
};

function reducer(state=initialState, action) {
    return state;
}

export default reducer;