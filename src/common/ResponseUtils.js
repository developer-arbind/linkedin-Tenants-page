const responseMessages = {
    400: "Bad Request",
    500: "Internal Server Error !!",
    404: "Page Not Found !!",
    403: "Forbidden",
  };
  
  export const getMessageFromStatus = function (statusCode) {
    return responseMessages[statusCode];
  };
  
  export const getErrorMessage = function(response) {
    return response.statusText ? response.statusText : getMessageFromStatus(response.status);
  };
  