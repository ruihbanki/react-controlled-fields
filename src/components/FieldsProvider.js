import React from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function FieldsProvider(props) {
  const { children, fields, onChange } = props;
  debugger;
  return (
    <FieldsContext.Provider value={{ fields, onChange }}>
      {children}
    </FieldsContext.Provider>
  );
}

FieldsProvider.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.object,
  onChange: PropTypes.func,
};

FieldsProvider.defaultProps = {
  children: null,
  fields: undefined,
  onChange: undefined,
};

export default FieldsProvider;
