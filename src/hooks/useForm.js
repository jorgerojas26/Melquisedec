import { useState } from 'react';
import { useFormError } from 'hooks/formError';
import { ErrorAlert } from 'components/CommonLayout/form.layout';
import validateSchema from 'utils/validateSchema';

export const useForm = ({
    initialState,
    action,
    createResource,
    editResource,
    deleteResource,
    schema,
    onSubmitSuccess,
    submitSuccessMessage,
    onDeleteSuccess,
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { errors, handleErrors, setErrors } = useFormError([]);

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

    const handleNumericInput = (value, selector) => {
        let data = JSON.stringify(formData);
        data = JSON.parse(data);
        data[selector] = value;
        setFormData({ ...data });
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

            if (!loading) {
                setLoading(true);
                delete formData.createdAt;
                try {
                    if (action === 'create') {
                        response = await createResource(formData);
                    } else if (action === 'edit') {
                        response = await editResource(formData.id, formData);
                    }
                } catch (error) {
                    console.log(error);
                }

                if (response.error) {
                    handleErrors(response.error);
                } else {
                    onSubmitSuccess && onSubmitSuccess(successMessage[action], formData);
                }
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (deleteResource) {
            const response = await deleteResource(id);

            if (response.error) {
                handleErrors(response.error);
            } else {
                onDeleteSuccess();
            }
        }
    };

    return {
        loading,
        handleNestedChange,
        handleChange,
        handleNumericInput,
        handleSubmit,
        handleDelete,
        formData,
        setFormData,
        submitErrors: errors,
        setSubmitErrors: setErrors,
        printError,
        hasError,
        onDeleteSuccess,
    };
};
