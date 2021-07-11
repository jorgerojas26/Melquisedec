import { useState } from 'react';
import { Wrapper, MinusButton, PlusButton, Input } from './styles';
import useInterval from 'hooks/useInterval';

const NumberInput = ({ value, onChange, onCtrlClick }) => {
    const [running, setRunning] = useState({
        plus: false,
        minus: false,
    });

    useInterval(
        () => {
            handleClick();
        },
        running.plus || running.minus ? 100 : null
    );

    const handleClick = () => {
        if (running.minus) {
            if (value >= 1) {
                onChange(value - 1);
                setRunning({ ...running, minus: true });
            }
        } else if (running.plus) {
            onChange(value + 1);
            setRunning({ ...running, plus: true });
        }
    };

    const handleCtrlClick = (event) => {
        if (event.ctrlKey) {
            const buttonName = event.target.name;
            onCtrlClick(buttonName);
        }
    };

    return (
        <Wrapper>
            <MinusButton
                name='minus'
                onClick={handleCtrlClick}
                onMouseDown={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, minus: true });
                }}
                onMouseUp={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, minus: false });
                }}
            >
                -
            </MinusButton>
            <Input value={value} min={0} onValueChange={({ floatValue }) => onChange(floatValue)} />
            <PlusButton
                name='plus'
                onClick={handleCtrlClick}
                onMouseDown={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, plus: true });
                }}
                onMouseUp={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, plus: false });
                }}
            >
                +
            </PlusButton>
        </Wrapper>
    );
};

export default NumberInput;
