const validateSchema = async (data, schema) => {
    let errors = [];

    try {
        await schema.validate(data, { abortEarly: false });
    } catch (error) {
        error.inner.forEach((err) => {
            errors.push({
                path: err.path,
                message: err.message,
            });
        });
    }

    return errors;
};

export default validateSchema;
