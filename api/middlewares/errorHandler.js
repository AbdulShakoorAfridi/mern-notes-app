export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode ? err.statusCode : 500;
  const message = err.message ? err.message : "Something went wrong";
  const stack = err.stackTrace;

  res.status(status).json({
    status: status,
    message: message,
    stack: process.env.NODE_ENV === "development" ? stack : "",
  });
};
