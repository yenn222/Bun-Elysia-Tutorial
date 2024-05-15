const elysiaErrorMessage = (code: string): string => {
  switch (code) {
    case "UNKNOWN":
      return "Unknown error";
    case "VALIDATION":
      return "Validation failed";
    case "NOT_FOUND":
      return "Route not found";
    case "PARSE":
      return "Parsing error";
    case "INTERNAL_SERVER_ERROR":
      return "Internal server error";
    case "INVALID_COOKIE_SIGNATURE":
      return "Cookie signature error";
    default:
      return "default error";
  }
};

export const ErrorMessage = {
  elysiaErrorMessage,
};
