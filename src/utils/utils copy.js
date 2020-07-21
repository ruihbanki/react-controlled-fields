export function parsePath(path) {
  const result = [];

  let part = "";
  for (let i = 0, len = path.length; i < len; i++) {
    const c = path[i];
    switch (c) {
      case ".": {
        if (part) {
          result.push(part);
          part = "";
        }
        break;
      }
      case "[": {
        if (part) {
          result.push(part);
          part = "";
        }
        break;
      }
      case "]": {
        if (part) {
          result.push(Number(part));
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
    result.push(part);
  }

  return result;
}

export function getFieldProp(fields, parsedPath, prop) {
  let result = fields;
  for (const item of parsedPath) {
    result = result[item];
    if (!result) {
      return null;
    }
  }
  return result.props[prop];
}
