const FIELD_LABELS = {
  name: "Name",
  title: "Title",
  role: "Role",
  email: "Email",
  password: "Password",
};

export const getMissingRequiredFields = (body, fields) => {
  return fields.filter((field) => {
    const value = body?.[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
};

export const formatMissingFieldsMessage = (missingFields) => {
  const labels = missingFields.map((field) => FIELD_LABELS[field] || field);
  return `Required field(s): ${labels.join(", ")}`;
};

export const validationErrorResponse = (missingFields) => ({
  status: false,
  message: formatMissingFieldsMessage(missingFields),
  missingFields,
});

export const formatMongooseValidationError = (error) => {
  const missingFields = Object.keys(error.errors || {});
  return {
    status: false,
    message: formatMissingFieldsMessage(missingFields),
    missingFields,
    errors: Object.fromEntries(
      missingFields.map((field) => [
        field,
        error.errors[field]?.message || `${field} is required`,
      ])
    ),
  };
};
