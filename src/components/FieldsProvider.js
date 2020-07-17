import React from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function FieldsProvider(props) {
  const { children, fields, onChangeFields } = props;
  return (
    <FieldsContext.Provider value={{ fields, onChangeFields }}>
      {children}
    </FieldsContext.Provider>
  );
}

FieldsProvider.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.object,
  onChangeFields: PropTypes.func,
};

FieldsProvider.defaultProps = {
  children: null,
  fields: {},
  onChangeFields: () => {},
};

export default FieldsProvider;
