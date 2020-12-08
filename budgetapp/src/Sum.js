import React from 'react';

export function Sum(props) {
    const sum = props.sum;
        return (
            <div className="sum main-font">$ {sum.sum * -1}</div> 
        );
}