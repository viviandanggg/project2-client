import React from 'react';

export function Sum(props) {
    const sum = props.sum;
        return (
            <div className="sum-block">
                <span className="sum">{sum.sum * -1}</span>
            </div>
        );

    
}