import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useField from "./useField";
import FieldsProvider from "../components/FieldsProvider";

describe("The useField", () => {
  it("Should work when pass a simple path", () => {
    let fields = {};
    const onChangeFields = (updater) => {
      fields = updater(fields);
    };
    const wrapper = ({ children }) => {
      return (
        <FieldsProvider fields={fields} onChangeFields={onChangeFields}>
          {children}
        </FieldsProvider>
      );
    };
    const { result } = renderHook(() => useField("name"), { wrapper });
    act(() => {
      result.current.setFieldProp("value", "Jonh");
    });
    expect(fields).toMatchObject({ name: { props: { value: "Jonh" } } });
  });

  it("Should work when pass a nested path", () => {
    let fields = {};
    const onChangeFields = (updater) => {
      fields = updater({});
    };
    const wrapper = ({ children }) => {
      return (
        <FieldsProvider onChangeFields={onChangeFields}>
          {children}
        </FieldsProvider>
      );
    };
    const { result } = renderHook(() => useField("product.name"), { wrapper });
    act(() => {
      result.current.setFieldProp("value", "Computer");
    });
    expect(fields).toMatchObject({
      product: { name: { props: { value: "Computer" } } },
    });
  });

  it("Should work when pass a nested path with an array", () => {
    let fields = {};
    const onChangeFields = (updater) => {
      fields = updater({});
    };
    const wrapper = ({ children }) => {
      return (
        <FieldsProvider onChangeFields={onChangeFields}>
          {children}
        </FieldsProvider>
      );
    };
    const { result } = renderHook(
      () => useField("product.comments[0].comment"),
      { wrapper }
    );
    act(() => {
      result.current.setFieldProp("value", "Hello");
    });
    expect(fields).toMatchObject({
      product: { comments: [{ comment: { props: { value: "Hello" } } }] },
    });
  });

  it.skip("Should work when pass a nested path with an array", (done) => {
    const wrapper = ({ children }) => {
      const [fields, setFields] = React.useState({});
      const onChangeFields = (param) => {
        setFields(param);
        done();
      };
      return (
        <FieldsProvider fields={fields} onChangeFields={onChangeFields}>
          {children}
        </FieldsProvider>
      );
    };
    const { result } = renderHook(
      () => useField("product.comments[0].comment"),
      { wrapper }
    );
    act(() => {
      result.current.setFieldProp("value", "Hello");
    });
    expect(result.current.field).toMatchObject({
      props: { value: "Hello" },
    });
  });
});
