import { parsePath } from "./utils";

describe("The parsePath", () => {
  it('should return the right result when passing the path "name"', () => {
    const result = parsePath("name");
    expect(result).toMatchObject([{ type: "prop", value: "name" }]);
  });

  it('should return the right result when passing the path "product.name"', () => {
    const result = parsePath("product.name");
    expect(result).toMatchObject([
      { type: "prop", value: "product" },
      { type: "prop", value: "name" },
    ]);
  });

  it('should return the right result when passing the path "product.user.name"', () => {
    const result = parsePath("product.user.name");
    expect(result).toMatchObject([
      { type: "prop", value: "product" },
      { type: "prop", value: "user" },
      { type: "prop", value: "name" },
    ]);
  });

  it('should return the right result when passing the path "product.comments[21].comment"', () => {
    const result = parsePath("product.comments[21].comment");
    expect(result).toMatchObject([
      { type: "prop", value: "product" },
      { type: "prop", value: "comments" },
      { type: "index", value: 21 },
      { type: "prop", value: "comment" },
    ]);
  });
});
