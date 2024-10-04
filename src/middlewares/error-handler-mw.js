const errorHandler = (error, req, rse, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  console.error(error);
  
  rse.status(statusCode).json({
    message,
  });
};

export default errorHandler;
