import {useEffect} from 'react';
import {Statement} from './Statement';
import {useSelector, useDispatch} from 'react-redux';
import {loadYear, startAddingStatement} from './actions';
import './App.css';

// const statements = [
//   {id: 1, amount: 19.99, category: "Groceries", description: "Food Lion", year: 2020, month: 5, day: 15},
//   {id: 2, amount: 25.00, category: "Transportation", description: "Gas at 7/11", year: 2020, month: 8, day: 2},
//   {id: 3, amount: 50.32, category: "Clothes", description: "Target", year: 2020, month: 2, day: 20},
//   {id: 3, amount: 200.00, category: "Income", description: "Worked 9-5", year: 2020, month: 9, day: 23, increase: 1},
// ];

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();


function App() {

  const statements = useSelector(state => state.statements);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadYear(year))
  }, [dispatch]);
  


  const onAdd = () => {
    dispatch(startAddingStatement(year, month, day));
  }
  
  
  return (
    <div className="statements-root">
      <button onClick={onAdd}> new statement</button>
      <h1>Expenditures:</h1>
        {statements.map(statement => <Statement key={statement.id} statement={statement}/>)}
    </div>
  );
}

export default App;
