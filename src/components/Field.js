import React, { useContext } from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function Field(props) {
  const { children, name } = props;

  const { fields, onChange } = useContext(FieldsContext);

  const setProp = React.useCallback(
    (prop, value) => {
      onChange((prevFields) => ({
        ...prevFields,
        [name]: {
          ...fields[name],
          [prop]: value,
        },
      }));
    },
    [onChange, name]
  );

  const field = fields[name];

  return children({ field, setProp });
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Field.defaultProps = {
  children: () => {},
};

export default React.memo(Field);
