import { useState } from 'react';
import { useFormError } from 'hooks/formError';
import { ErrorAlert } from 'components/CommonLayout/form.layout';
import validateSchema from 'utils/validateSchema';

export const useForm = ({ initialState, action, createResource, editResource, schema, onSubmitSuccess, submitSuccessMessage }) => {
    const [formData, setFormData] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);
    const { errors, handleErrors, setErrors } = useFormError([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    let successMessage = submitSuccessMessage || {
        create: 'El recurso fue creado con éxito',
        edit: 'El recurso fue actualizado con éxito',
    };

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

    const printError = (path) => {
        if (errors[path]) {
            return <ErrorAlert>{errors[path]}</ErrorAlert>;
        }
        return '';
    };

    const hasError = (path) => {
        return errors[path];
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
                    onSubmitSuccess && onSubmitSuccess(successMessage[action]);
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
        printError,
        hasError,
    };
};
