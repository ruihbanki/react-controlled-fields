import React, { useContext } from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function Field(props) {
  const { children, name } = props;

  const { fields, onChangeFields } = useContext(FieldsContext);

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

  return children({ field, setFieldProp, setFieldMeta });
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Field.defaultProps = {
  children: () => {},
};

export default React.memo(Field);
