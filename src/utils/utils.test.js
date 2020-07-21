import { parsePath, getFieldProp } from "./utils";

describe("The parsePath", () => {
  it('should return the right result when passing the path "name"', () => {
    const result = parsePath("name");
    expect(result).toMatchObject([{ type: "object", value: "name" }]);
  });

  it('should return the right result when passing the path "product.name"', () => {
    const result = parsePath("product.name");
    expect(result).toMatchObject([
      { type: "object", value: "product" },
      { type: "object", value: "name" },
    ]);
  });

  it('should return the right result when passing the path "product.user.name"', () => {
    const result = parsePath("product.user.name");
    expect(result).toMatchObject([
      { type: "object", value: "product" },
      { type: "object", value: "user" },
      { type: "object", value: "name" },
    ]);
  });

  it('should return the right result when passing the path "product.comments[21].comment"', () => {
    const result = parsePath("product.comments[21].comment");
    expect(result).toMatchObject([
      { type: "object", value: "product" },
      { type: "array", value: "comments" },
      { type: "object", value: 21 },
      { type: "object", value: "comment" },
    ]);
  });
});

describe("The getFieldProp", () => {
  it("should return the right result", () => {
    const fields = {
      name: {
        props: {
          value: "Computer",
        },
      },
    };
    const parsedPath = parsePath("name");
    const result = getFieldProp(fields, parsedPath, "value");
    expect(result).toBe("Computer");
  });

  it("should return the right result", () => {
    const fields = {
      product: {
        name: {
          props: {
            value: "Computer",
          },
        },
      },
    };
    const parsedPath = parsePath("product.name");
    const result = getFieldProp(fields, parsedPath, "value");
    expect(result).toBe("Computer");
  });

  it("should return the right result", () => {
    const fields = {
      product: {
        comments: [
          {
            comment: {
              props: {
                value: "Hello",
              },
            },
          },
        ],
      },
    };
    const parsedPath = parsePath("product.comments[0].comment");
    const result = getFieldProp(fields, parsedPath, "value");
    expect(result).toBe("Hello");
  });

  it("should return the right result", () => {
    const fields = {};
    const parsedPath = parsePath("product.comments[0].comment");
    const result = getFieldProp(fields, parsedPath, "value");
    expect(result).toBe(null);
  });
});
