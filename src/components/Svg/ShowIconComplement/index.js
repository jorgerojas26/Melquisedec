import * as React from 'react';

function SvgComponent(props) {
    return (
        <svg viewBox='0 0 24 24' {...props}>
            <path d='M8.18 16.99a.312.312 0 01-.504-.21c-.137-1.214-.234-4.053 1.483-5.943.908-1 3.02-1.52 4.475-.198s1.14 3.473.23 4.473c-2.07 2.15-3.428.058-5.686 1.878z' />
        </svg>
    );
}

export default SvgComponent;
