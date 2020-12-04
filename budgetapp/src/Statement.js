import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingStatement , startDeletingStatement, loadYearlySum, loadYear} from './actions';

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

    const onEdit = () => {
        dispatch(enterEditMode(statement));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(statement));
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

        window.location.reload();
        // dispatch(loadYear(year));
        // dispatch(loadYearlySum(year));
    }

    const onDelete = () => {
        dispatch(startDeletingStatement(statement));
    }

    if (statement.isEditing) {
        return (
            <div className="statement-root font">
                <div className="statement-left">
                    <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
                    <input type="radio" value="Withdrawal" name="increase" onChange={e => setIncrease(0)}/> Withdrawal
                    <input type="radio" value="Deposit" name="increase" onChange={e => setIncrease(1)}/> Deposit
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} />
                    <input type="number" value={month} onChange={e => setMonth(e.target.value)} />
                    <input type="number" value={day} onChange={e => setDay(e.target.value)} />
                </div>
                <div className="statement-right">
                <label htmlFor="categories">
                        Category:
                        <select name="categories" className="category" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value=""></option>
                            <option value="Groceries">Groceries</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Income">Income</option>
                        </select>
                    </label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    <button onClick={onSave}>save</button>
                    <button onClick={onCancel}>cancel</button>
                    <button onClick={onDelete} className="delete-button">delete</button>
                </div>
            </div>
        );

    } else {

        return (
            <div className="statement-root font">
                <div className="statement-left">
                    <span className="amount">${statement.amount}</span>
                    <span className="date">{statement.month}/{statement.day}/{statement.year}</span>
                </div>
                <div className="statement-right">
                    <span className="category">{statement.category}</span>
                    <span className="description">{statement.description}</span>
                    <button onClick={onEdit}>edit</button>
                </div>
            </div>
        );

    }
}