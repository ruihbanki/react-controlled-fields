import React from "react";

import FieldsContext from "../components/FieldsContext";

function useField(name) {
  const { fields, onChangeFields } = React.useContext(FieldsContext);

  const setFieldProp = React.useCallback(
    (prop, value) => {
      onChangeFields((prevFields) => ({
        ...prevFields,
        [name]: {
          ...prevFields[name],
          props: {
            ...prevFields[name]?.props,
            [prop]: value,
          },
        },
      }));
    },
    [onChangeFields, name]
  );

  const setFieldMeta = React.useCallback(
    (prop, value) => {
      onChangeFields((prevFields) => ({
        ...prevFields,
        [name]: {
          ...prevFields[name],
          meta: {
            ...prevFields[name]?.meta,
            [prop]: value,
          },
        },
      }));
    },
    [onChangeFields, name]
  );

  const field = fields[name];

  return { field, setFieldProp, setFieldMeta };
}

export default useField;