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
            onChange(Number(value) + 1);
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
                title='Ctrl + Click para restar todo'
                onClick={handleCtrlClick}
                onMouseDown={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, minus: true });
                }}
                onMouseUp={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, minus: false });
                }}
                onMouseLeave={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, minus: false });
                }}
            >
                -
            </MinusButton>
            <Input value={value} min={0} onValueChange={({ floatValue }) => onChange(floatValue)} />
            <PlusButton
                name='plus'
                title='Ctrl + Click para sumar todo'
                onClick={handleCtrlClick}
                onMouseDown={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, plus: true });
                }}
                onMouseUp={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, plus: false });
                }}
                onMouseLeave={(event) => {
                    if (!event.ctrlKey) setRunning({ ...running, plus: false });
                }}
            >
                +
            </PlusButton>
        </Wrapper>
    );
};

export default NumberInput;
