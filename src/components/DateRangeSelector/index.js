import { useState } from 'react';
const DateRangeSelector = ({ onSelect }) => {
    const [selectedRange, setSelectedRange] = useState('week');

    const handleSelect = (event) => {
        setSelectedRange(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <select onChange={handleSelect} value={selectedRange} style={{ padding: '3px' }}>
            <option value='lifetime'>De por vida</option>
            <option value='month'>Mes</option>
            <option value='week'>Semana</option>
            <option value='today'>Hoy</option>
        </select>
    );
};

export default DateRangeSelector;
