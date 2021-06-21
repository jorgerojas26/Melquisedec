import { useState } from 'react';
import { useFormError } from 'hooks/formError';

import validateSchema from 'utils/validateSchema';

export const useForm = ({ initialState, action, createResource, editResource, schema }) => {
    const [formData, setFormData] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);
    const { errors, handleErrors, setErrors } = useFormError([]);

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (event) => {
        let targetName = event.target.name;

        if (event.target.type === 'file') {
            setFormData({ ...formData, [targetName]: event.target.files[0] });
        } else {
            setFormData({ ...formData, [targetName]: event.target.value });
        }
    };

    const handleNestedChange = (selector, index, key, value) => {
        let data = JSON.stringify(formData);
        data = JSON.parse(data);
        data[selector][index][key] = value;

        setFormData({ ...data });
    };

    const handleNumericInput = (value, inputName) => {
        formData[inputName] = value;
        setFormData({ ...formData });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = await validateSchema(formData, schema);
        handleErrors(errors);

        if (!errors.length) {
            let response = {};

            if (!submitting) {
                setSubmitting(true);
                try {
                    if (action === 'create') {
                        response = await createResource(formData);
                    } else if (action === 'edit') {
                        response = await editResource(formData.id, formData);
                    }
                } catch (error) {
                    console.log(error);
                    setSubmitting(false);
                }

                if (response.error) {
                    handleErrors(response.error);
                } else {
                    setSubmitSuccess(true);
                }
                setSubmitting(false);
            }
        } else {
            setSubmitting(false);
        }
    };
    return {
        handleNestedChange,
        handleChange,
        handleNumericInput,
        handleSubmit,
        formData,
        setFormData,
        submitErrors: errors,
        setSubmitErrors: setErrors,
        submitSuccess,
    };
};
