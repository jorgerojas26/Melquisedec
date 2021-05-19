import { useHistory, useLocation } from 'react-router-dom';

export const useRedirectToActiveLocation = () => {
    const activeLocation = localStorage.getItem('activeLocation') || '';
    const history = useHistory();
    const location = useLocation();
    const currentLocation = location.pathname;

    if (currentLocation !== activeLocation) {
        localStorage.setItem('activeLocation', currentLocation);
        if (currentLocation === '/') history.push(activeLocation);
    }
};
