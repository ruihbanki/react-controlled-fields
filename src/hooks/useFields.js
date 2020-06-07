import React from "react";

function useFields(options) {
  const {
    initialValues = {},
    initialFields = {},
    validate = () => {},
  } = options;

  const [state, setState] = React.useState(() => {
    const fields = setPropFields(initialFields, "value", initialValues);
    const values = getPropFields(fields, "value");
    const errors = validate(values);
    return {
      fields,
      values,
      errors,
    };
  });

  const handleChange = React.useCallback(
    (updater) => {
      setState((prevState) => {
        const nextFields = updater(prevState.fields);
        const values = getPropFields(nextFields, "value");
        const errors = validate(values);
        const fields = setErrors(nextFields, errors);
        return {
          fields,
          values,
          errors,
        };
      });
    },
    [validate]
  );

  return {
    ...state,
    handleChange,
  };
}

function getPropFields(fields, prop) {
  let result = {};
  for (const name in fields) {
    result[name] = fields[name][prop];
  }
  return result;
}

function setPropFields(fields, prop, values) {
  let result = { ...fields };
  for (const name in values) {
    result[name] = {
      ...fields[name],
      [prop]: values[name],
    };
  }
  return result;
}

function setErrors(fields, errors) {
  const result = { ...fields };

  for (const name in errors) {
    if (errors[name] !== result[name].error) {
      result[name] = {
        ...result[name],
        error: errors[name],
      };
    }
  }

  for (const name in fields) {
    if (fields[name].error && !errors[name]) {
      const nextField = { ...fields[name] };
      delete nextField.error;
      result[name] = nextField;
    }
  }

  return result;
}

export default useFields;
