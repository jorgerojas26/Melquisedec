import { useState } from 'react';

export const useFormError = (initialState) => {
    const [errors, setErrors] = useState(initialState);

    const handleErrors = (errorObject) => {
        let errorList = {};
        if (typeof errorObject[Symbol.iterator] === 'function') {
            errorObject.forEach((error) => {
                errorList['' + error.path] = error.message;
            });
        } else {
            errorList[errorObject.path] = errorObject.message;
        }
        setErrors({ ...errorList });
    };

    return { errors, handleErrors, setErrors };
};
