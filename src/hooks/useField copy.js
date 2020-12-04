import React from "react";

import FieldsContext from "../components/FieldsContext";
import { parsePath, getFieldProp, getField } from "../utils/utils";

function useField(path) {
  const context = React.useContext(FieldsContext) || {};
  const { fields = {}, onChangeFields = () => {} } = context;

  const parsedPath = React.useMemo(() => {
    return parsePath(path);
  }, [path]);

  const setFieldProp = React.useCallback(
    (prop, value) => {
      onChangeFields((prevFields) => {
        const prevFieldValue = getFieldProp(prevFields, parsedPath, prop);

        if (prevFieldValue === value) {
          return prevFields;
        }

        const result = { ...prevFields };
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

        current.props = {
          ...current.props,
          [prop]: value,
        };

        return result;
      });
    },
    [onChangeFields, parsedPath]
  );

  const setFieldMeta = React.useCallback(
    (prop, value) => {
      onChangeFields((prevFields) => {
        const prevFieldValue = getField(prevFields, parsedPath)?.meta?.[prop];

        if (prevFieldValue === value) {
          return prevFields;
        }

        const result = { ...prevFields };
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

        current.meta = {
          ...current.meta,
          [prop]: value,
        };

        return result;
      });
    },
    [onChangeFields, parsedPath]
  );

  const field = getField(fields, parsedPath);

  // console.log(path, field);

  return { field, setFieldProp, setFieldMeta };
}

export default useField;
