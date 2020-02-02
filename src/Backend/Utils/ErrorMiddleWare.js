const AppError = require("./AppError");

const HandleCastErrorDB = error => {
  let Message = `Invalid ${error.path} value ${error.value}`;
  return new AppError(Message, 400);
};

const HandleDuplicateErrorDB = error => {
  const Value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const Message = `Duplicate Value ${Value}.Please Use Another Value!`;
  return new AppError(Message, 400);
};

const HandleValidationErrorDB = error => {
  let Errors = Object.values(error.errors).map(Items => Items.message);
  const Message = `Invalid Values.${Errors.join(".")}`;
  return new AppError(Message, 400);
};

const HandleInvalidTokenErroDB = _ =>
  new AppError("Invalid Token.Please Login Again", 401);

const SendErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    error: err,
    Status: err.status,
    Message: err.message,
    Stack: err.stack
  });
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (error.name === "CastError") error = HandleCastErrorDB(error);
  if (error.name === "ValidationError") error = HandleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = HandleInvalidTokenErroDB();
  if (error.code === 11000) error = HandleDuplicateErrorDB(error);
  SendErrorDev(error, res);
};
