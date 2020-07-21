export function parsePath(path) {
  const result = [];

  let part = "";
  for (let i = 0, len = path.length; i < len; i++) {
    const c = path[i];
    switch (c) {
      case ".": {
        if (part) {
          result.push({
            type: "prop",
            value: part,
          });
          part = "";
        }
        break;
      }
      case "[": {
        if (part) {
          result.push({
            type: "prop",
            value: part,
          });
          part = "";
        }
        break;
      }
      case "]": {
        if (part) {
          result.push({
            type: "index",
            value: Number(part),
          });
          part = "";
        }
        break;
      }
      default: {
        part += c;
      }
    }
  }

  if (part) {
    result.push({
      type: "prop",
      value: part,
    });
  }

  return result;
}
