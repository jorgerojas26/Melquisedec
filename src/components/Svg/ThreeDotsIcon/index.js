import * as React from 'react';

function SvgComponent(props) {
    return (
        <svg viewBox='0 0 24 24' {...props}>
            <circle cx={5} cy={12} r={2} />
            <circle cx={12} cy={12} r={2} />
            <circle cx={19} cy={12} r={2} />
        </svg>
    );
}

export default SvgComponent;
