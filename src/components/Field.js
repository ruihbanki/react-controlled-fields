import React, { useContext } from "react";
import PropTypes from "prop-types";

import useField from "../hooks/useField";

function Field(props) {
  const { children, name } = props;

  const { field, setFieldProp, setFieldMeta } = useField(name);

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
