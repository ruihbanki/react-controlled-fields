import React, { useContext } from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function Field(props) {
  const { children, name } = props;

  const { fields, setField } = useContext(FieldsContext);

  const field = fields[name];

  const setProp = (prop, value) => {
    setField(name, prop, value);
  };

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
