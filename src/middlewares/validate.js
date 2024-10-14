import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessages = errors.array().reduce((acc, error) => {
      console.error(error);
      if (!acc.hasOwnProperty(error.path)) {
        acc[error.path] = error.msg;
      }
      return acc;
    }, {});
    return res.status(400).json({
      message: "Missing or invalid fields",
      errors: errorsMessages,
    });
  }
  next();
}
