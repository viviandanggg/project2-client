import React, {useEffect} from 'react';
import {Statement} from './Statement';
import {Sum} from './Sum';
import {useSelector, useDispatch} from 'react-redux';
import {loadYear, loadYearlySum, loadMonthlySum, startAddingStatement} from './actions';
import './App.css';
import piggyBank from '../src/piggy-bank.png';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const mon = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

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
      <div className="loader-root">
        <div className="title">
          <h1 className="main-font">Expense</h1>
          <img src={piggyBank} alt="Piggy Bank"/>
          <h1 className="main-font">Tracker</h1>
        </div>
        <div className="loader"/>
      </div>
    );
  } else {
    return (
      <div className="main-root">
        <button className="supporting-font" id="add-button"onClick={onAdd}>Add New Statement</button>
        <div className="title">
          <h1 className="main-font">Expense</h1>
          <img src={piggyBank} alt="Piggy Bank"/>
          <h1 className="main-font">Tracker</h1>
        </div>
        <h2 className="tagline supporting-font">{year} Spending Tracker</h2>
        <div id="total-spendings">
          <div className="spending">
            <h3 className="main-font">{year} Spendings: </h3>
            {sumYear.map(s => <Sum key ={s} sum={s}/>)}
          </div>
          <div className="spending">
            <h3 className="main-font">{mon[date.getMonth()]} Spendings: </h3>
            {sumMonth.map(s => <Sum key ={s} sum={s}/>)}
          </div>
        </div>
        {statements.map(statement => <Statement key={statement.id} statement={statement}/>)}
        <div className="supporting-font" id="sources">
          <p>&copy; Vivian Dang &amp; Will Madison 2020</p>
          <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>
      </div>
    );
  }
}

export default App;
