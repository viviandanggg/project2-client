import React from 'react';

export function Statement(props) {
    const statement = props.statement;


    return (
        <div className="statement-root">
            <div className="statement-left">
                <span className="category">{statement.category}</span>
                <span className="date">{statement.month}/{statement.day}/{statement.year}</span>
            </div>
            <div className="statement-right">
                <span className="amount">{statement.amount}</span>
                <span className="amount">{statement.description}</span>
            </div>
        </div>
    );

}