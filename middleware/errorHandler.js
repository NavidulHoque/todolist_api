const errorHandler = (err, req, res) => {

    if (err.name === "CastError") {
        return res.status(400).json({
            message: `Expected '${err.kind}', but received '${err.valueType || typeof err.value}'.`
        });
    }

    if (err.name === "ValidationError") {

        const message = []

        Object.keys(err.errors).forEach((field) => {
            message.push(err.errors[field].message);
        });

        return res.status(400).json({
            message
        });
    }

    console.log(err);

    return res.status(500).json({
        message: err.message || "Server error, please try again later"
    });
};

export default errorHandler;