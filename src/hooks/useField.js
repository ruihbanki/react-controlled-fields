import React from "react";
import FieldsContext from "../components/FieldsContext";

function useField(name) {
  const { fields, onChangeFields } = React.useContext(FieldsContext);

  const setFieldProp = React.useCallback(
    (prop, value) => {
      onChangeFields((prevFields) => ({
        ...prevFields,
        [name]: {
          ...fields[name],
          [prop]: value,
        },
      }));
    },
    [onChangeFields, name]
  );

  const field = fields[name];

  return {
    field,
    setFieldProp,
  };
}

export default useField;
