import React from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function FieldsController(props) {
  const { children, fields, onChange } = props;

  return (
    <FieldsContext.Provider value={{ fields, onChange }}>
      {children}
    </FieldsContext.Provider>
  );
}

FieldsController.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.object,
  onChange: PropTypes.func,
};

FieldsController.defaultProps = {
  children: null,
  fields: {},
  onChange: () => {},
};

export default React.memo(FieldsController);
