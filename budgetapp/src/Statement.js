import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingStatement, startDeletingStatement, loadYear, startWaiting, stopWaiting} from './actions';

export function Statement(props) {
    const statement = props.statement;
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(statement.amount);
    const [year, setYear] = useState(statement.year);
    const [month, setMonth] = useState(statement.month);
    const [day, setDay] = useState(statement.day);
    const [category, setCategory] = useState(statement.category);
    const [description, setDescription] = useState(statement.description);
    const [increase, setIncrease] = useState(statement.increase);

    const date = new Date();
    const currYear = date.getFullYear();

    const onEdit = () => {
        dispatch(enterEditMode(statement));
    }

    const onCancel = () => {
        if (amount === 0 || statement.amount === 0) {
            onDelete();
        } else {
            dispatch(leaveEditMode(statement));
            dispatch(startWaiting());
            dispatch(loadYear(currYear)); 
            setTimeout(() => dispatch(stopWaiting()), 100);         
        }
    }

    const onSave = () => {
        dispatch(startSavingStatement({
            id: statement.id,
            amount,
            year,
            month,
            day,
            category,
            description,
            increase,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingStatement(statement));
    }

    if (statement.isEditing) {
        return (
            <div className="statement-root supporting-font">
                <div className="statement-left edit-statement">
                    <label>Amount: <input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></label>
                    <div className="increase">
                        Type:
                        <label>Withdrawal<input type="radio" value={increase} name={statement.id} onChange={e => setIncrease(0)} checked={!increase}/></label>
                        <label>Deposit<input type="radio" value={increase} name={statement.id} onChange={e => setIncrease(1)} checked={increase}/></label>
                    </div>
                    <label>Year: <input type="number" value={year} onChange={e => setYear(e.target.value)} /></label>
                    <label>Month: <input type="number" value={month} onChange={e => setMonth(e.target.value)} /></label>
                    <label>Day: <input type="number" value={day} onChange={e => setDay(e.target.value)} /></label>
                </div>
                <div className="statement-right edit-statement">
                    <label htmlFor="categories">
                        Category:
                        <select name="categories" className="categories" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value=""></option>
                            <option value="Groceries">Groceries</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food and Drinks">Food and Drinks</option>
                            <option value="School">School</option>
                            <option value="Health and Wellbeing">Health and Wellbeing</option>
                            <option value="Income">Income</option>
                        </select>
                    </label>
                    <label>Description: <textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
                    <div className="editing-buttons">
                        <button onClick={onSave}>Save</button>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    } else {
        if (increase === 0) {
            return (
                <div className="statement-root font withdrawal">
                    <div className="statement-left">
                        <div className="amount main-font">$ -{amount}</div>
                        <div className="date supporting-font">{month}/{day}/{year}</div>
                    </div>
                    <div className="statement-right">
                        <div className="category main-font">{category}</div>
                        <div className="description supporting-font">{description}</div>
                        <button className="supporting-font edit-button" onClick={onEdit}>Edit Statement</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="statement-root font deposit">
                    <div className="statement-left">
                        <div className="amount main-font">$ {amount}</div>
                        <div className="date supporting-font">{month}/{day}/{year}</div>
                    </div>
                    <div className="statement-right">
                        <div className="category main-font">{category}</div>
                        <div className="description supporting-font">{description}</div>
                        <button className="supporting-font edit-button" onClick={onEdit}>Edit Statement</button>
                    </div>
                </div>
            );
        }
    }
}