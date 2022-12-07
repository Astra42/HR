import React, { useState } from 'react';

function FormInput(props) {
    const [focused, setFocused] = useState(false);

    function handleFocus(e) {
        setFocused(true);
    }

    const { handleChange, ...attributes } = props;

    return (
        <div>
            <input
                className='form-control'
                {...attributes}
                onChange={e => handleChange(e)}
                onBlur={handleFocus}
                focused={focused.toString()}
            />
        </div>
    );
}

export default FormInput;
