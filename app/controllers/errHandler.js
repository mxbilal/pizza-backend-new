const errorBody = (status, message, success) => {
  return {
    status,
    message,
    success
  }
}

exports.errorHandler = {
  400: () => errorBody(400, 'Something went wrong', false),
  401: () => errorBody(401, 'Something went wrong', false),
  404: () => errorBody(404, 'Something went wrong', false),
  500: () => errorBody(500, 'Internal server error', false),
  503: () => errorBody(503, 'Internal server error', false),
};
