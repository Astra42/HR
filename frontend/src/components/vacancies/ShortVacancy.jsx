import React from 'react';

import { Link } from 'react-router-dom';

function ShortVacancie(props) {
    return (
        <Link className='short-vacancy' to={props.to}>
            <div style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
                <h1>{props.title}</h1>
            </div>
            <div
                style={{
                    overflowWrap: 'break-word',
                    backgroundColor: '#4d5971',
                    padding: '0.5rem',
                    borderRadius: '0.3rem',
                }}
            >
                {props.description.substring(0, 300)}
                {props.description.length > 300 ? '...' : null}
            </div>
        </Link>
    );
}

export default ShortVacancie;
