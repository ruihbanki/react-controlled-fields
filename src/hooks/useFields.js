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

  const handleChange = (_fields) => {
    const values = getPropFields(_fields, "value");
    const errors = validate(values);
    let fields = deletePropFields(_fields, "error");
    fields = setPropFields(fields, "error", errors);
    setState({ fields, values, errors });
  };

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

function deletePropFields(fields, prop) {
  let result = { ...fields };
  for (const name in fields) {
    if (fields[name][prop]) {
      const field = { ...fields[name] };
      delete field[prop];
      result[name] = field;
    } else {
      result[name] = fields[name];
    }
  }
  return result;
}

export default useFields;
