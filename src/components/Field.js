import React from "react";
import PropTypes from "prop-types";

import useField from "../hooks/useField";

function Field({ children, name }) {
  const { field, setFieldProp } = useField(name);

  return children({ field, setFieldProp });
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Field.defaultProps = {
  children: () => {},
};

export default React.memo(Field);
