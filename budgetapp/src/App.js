import {useEffect} from 'react';
import {Statement} from './Statement';
import {Sum} from './Sum';
import {useSelector, useDispatch} from 'react-redux';
import {loadYear, loadYearlySum, startAddingStatement} from './actions';
import './App.css';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();


function App() {

  const statements = useSelector(state => state.statements);
  const sum = useSelector(state => state.sum);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadYear(year))
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadYearlySum(year))
  }, [dispatch]);


  const onAdd = () => {
    dispatch(startAddingStatement(year, month, day));
  }
  
  return (
    <div className="statements-root">
      <h1 className="font">Expenditures</h1>
        {sum.map(s => <Sum key ={s} sum={s}/>)}
        <button className="font" onClick={onAdd}>Add New Statement</button>
        {statements.map(statement => <Statement key={statement.id} statement={statement}/>)}
    </div>
  );
}

export default App;
