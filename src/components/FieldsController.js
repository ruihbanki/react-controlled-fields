import React from "react";
import PropTypes from "prop-types";

import FieldsContext from "./FieldsContext";

function FieldsController(props) {
  const { children, fields, onChange } = props;

  const setField = (name, prop, value) => {
    const nextFields = { ...fields };

    let field = nextFields[name];
    if (!field) {
      field = {};
      nextFields[name] = field;
    }
    field[prop] = value;
    onChange(nextFields);
  };

  const context = {
    fields,
    setField,
  };

  return (
    <FieldsContext.Provider value={context}>{children}</FieldsContext.Provider>
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
