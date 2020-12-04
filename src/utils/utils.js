export function parsePath(path) {
  const result = [];

  if (!path) {
    return result;
  }

  let part = "";
  for (let i = 0, len = path.length; i < len; i++) {
    const c = path[i];
    switch (c) {
      case ".": {
        if (part) {
          result.push({
            type: "object",
            value: part,
          });
          part = "";
        }
        break;
      }
      case "[": {
        if (part) {
          result.push({
            type: "array",
            value: part,
          });
          part = "";
        }
        break;
      }
      case "]": {
        if (part) {
          result.push({
            type: "object",
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
      type: "object",
      value: part,
    });
  }

  return result;
}

export function getValueByPath(object, parsedPath) {
  let result = object;
  for (const item of parsedPath) {
    result = result[item.value];
    if (!result) {
      return null;
    }
  }
  return result;
}

// export function getFieldProp(fields, parsedPath, prop) {
//   let result = fields;
//   for (const item of parsedPath) {
//     result = result[item.value];
//     if (!result) {
//       return null;
//     }
//   }
//   return result.props[prop];
// }

// export function getFieldValue(values, parsedPath) {
//   let result = values;
//   for (const item of parsedPath) {
//     result = result[item.value];
//     if (!result) {
//       return null;
//     }
//   }
//   return result;
// }

// export function getField(fields, parsedPath) {
//   let result = fields;
//   for (const item of parsedPath) {
//     result = result[item.value];
//     if (!result) {
//       return null;
//     }
//   }
//   return result;
// }
