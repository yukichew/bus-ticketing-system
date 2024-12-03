export const catchError = (err) => {
  if (err.response) {
    const message = err.response.data?.message || "An error occurred";
    return { error: true, message };
  }

  if (err.request) {
    return {
      error: true,
      message: "Network Error: Please check your connection.",
    };
  }

  return { error: true, message: err.message };
};
