import React from "react";

const empty = {};
const noop = () => {};

function useFields(options) {
  const { values = empty, metas = empty, validate = noop } = options;

  const [state, setState] = React.useState(() => {
    const errors = validate(values);
    return {
      values,
      meta,
      errors,
    };
  });

  const setValues = React.useCallback(
    (updaterOrValues) => {
      setState((prevState) => {
        let values = updaterOrValues;
        if (typeof updaterOrValues === "function") {
          values = updaterOrValues(prevState.values);
        }
        if (values === prevState.values) {
          return prevState;
        }
        const errors = validate(values, fields);
        return {
          values,
          errors,
        };
      });
    },
    [validate]
  );

  return {
    ...state,
    setFields,
    setValues,
  };
}

function getPropFields(fields, prop) {
  let result = {};

  for (const name in fields) {
    result[name] = fields[name].props?.[prop];
  }

  return result;
}

function setPropFields(fields, prop, values) {
  let result = { ...fields };

  for (const name in values) {
    result[name] = {
      ...fields[name],
      props: {
        ...fields[name]?.props,
        [prop]: values[name],
      },
    };
  }

  return result;
}

function setErrors(fields, errors) {
  const result = { ...fields };

  for (const name in errors) {
    if (errors[name] !== result[name]?.meta?.error) {
      result[name] = {
        ...result[name],
        meta: {
          ...result[name].meta,
          error: errors[name],
        },
      };
    }
  }

  for (const name in fields) {
    if (fields[name]?.meta?.error && !errors[name]) {
      const nextField = { ...fields[name] };
      const nextMeta = nextField.meta;
      delete nextMeta.error;
      nextField.meta = nextMeta;
      result[name] = nextField;
    }
  }

  return result;
}

export default useFields;
