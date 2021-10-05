import { useState, useMemo } from 'react';

export const useConfirm = () => {
    const INITIAL_CONFIRM_STATE = useMemo(
        () => ({
            message: null,
            actions: [],
            state: null,
            callback: null,
            show: false,
        }),
        []
    );

    const [confirmState, setConfirmState] = useState(INITIAL_CONFIRM_STATE);

    return { confirmState, setConfirmState, INITIAL_CONFIRM_STATE };
};
