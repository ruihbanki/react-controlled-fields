import React from "react";

import FieldsContext from "../components/FieldsContext";
import { parsePath, getValueByPath } from "../utils/utils";

function useField(path) {
  const context = React.useContext(FieldsContext) || {};

  const { fields, onChange } = context;

  const parsedPath = React.useMemo(() => {
    return parsePath(path);
  }, [path]);

  const setFieldProp = React.useCallback(
    (prop, value) => {
      if (!onChange) {
        return;
      }

      onChange((prevFields) => {
        console.log("prevFields", prevFields);
        const prevValue = getValueByPath(prevFields[prop], parsedPath);
        if (prevValue === value) {
          return prevFields;
        }

        const result = { ...prevFields[prop] };
        let current = result;
        parsedPath.forEach((item) => {
          let part;
          if (!current[item.value]) {
            if (item.type === "array") {
              part = [];
            } else {
              part = {};
            }
          } else {
            if (item.type === "array") {
              part = [...current[item.value]];
            } else {
              part = { ...current[item.value] };
            }
          }
          current[item.value] = part;
          current = part;
        });

        console.log("current", current);

        return {
          ...prevFields,
          [prop]: current,
        };
      });
    },
    [onChange, parsedPath]
  );

  const setFieldValue = React.useCallback(
    (value) => {
      setFieldProp("values", value);
    },
    [setFieldProp]
  );

  const value = getValueByPath(fields.values, parsedPath);

  return { value, setFieldValue };
}

export default useField;
