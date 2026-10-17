const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] - Method: ${req.method} - Endpoint: ${req.originalUrl}`);
    next();
};

module.exports = logger;