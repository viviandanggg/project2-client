import React from 'react';
import {useEffect} from 'react';
import {Statement} from './Statement';
import {Sum} from './Sum';
import {useSelector, useDispatch} from 'react-redux';
import {loadYear, loadYearlySum, loadMonthlySum, startAddingStatement} from './actions';
import './App.css';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();


function App() {
  const isWaiting = useSelector(state => state.isWaiting);
  const statements = useSelector(state => state.statements);
  const sumYear = useSelector(state => state.sumYear);
  const sumMonth = useSelector(state => state.sumMonth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadYear(year))
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadYearlySum(year))
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadMonthlySum(month, year))
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingStatement(year, month, day));
  }
  
  if (isWaiting) {
    return (
      <div id="loader-root">
        <h1 className="font">Expenditures</h1>
        <div className="loader"/>
      </div>
    );
  } else {
    return (
      <div>
          <h1 className="font">Expenditures</h1>
          <div id="total-spendings">
            <div className="spending" id="year-spendings">
              Spending this Year: 
              {sumYear.map(s => <Sum key ={s} sum={s}/>)}
            </div>
            <div className="spending" id="month-spendings">
              Spending this Month: 
              {sumMonth.map(s => <Sum key ={s} sum={s}/>)}
            </div>
          </div>
          <button className="font" onClick={onAdd}>Add New Statement</button>
          {statements.map(statement => <Statement key={statement.id} statement={statement}/>)}
          <div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
      </div>
    );
  }
}

export default App;
