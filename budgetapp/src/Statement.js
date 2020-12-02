import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingStatement } from './actions';

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
    }

    if (statement.isEditing) {
        return (
            <div className="statement-root">
                
                <div className="statement-left">
                    
                    <label for="categories">
                        <select name="categories" className="categories" value={category} onChange={e => setCategory(e.target.value)}>
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

                </div>
                <div className="statement-right">
                    
                    <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
                    <label for="increase">Desposit
                        <input type="checkbox" id="increase" value={increase} onChange={e => setIncrease(e.target.value)}/>
                    </label>
                    <input type="text" value={year} onChange={e => setYear(parseInt(e.target.value))} />
                    <input type="text" value={month} onChange={e => setMonth(parseInt(e.target.value))} />
                    <input type="text" value={day} onChange={e => setDay(parseInt(e.target.value))} />
                </div>
            </div>
        );

    } else {

        return (
            <div className="statement-root">
                <div className="statement-left">
                    <span className="category">{statement.category}</span>
                    <span className="date">{statement.month}/{statement.day}/{statement.year}</span>
                    <button onClick={onEdit}>edit</button>
                </div>
                <div className="statement-right">
                    <span className="amount">{statement.amount}</span>
                    <span className="amount">{statement.description}</span>
                </div>
            </div>
        );

    }
}