function traverseObject(obj, keys) {
  var current = obj;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key === "[]") {
      current = current[0];
    } else if (key === "{}") {
      const firstKey = current.keys[0];
      current = current[firstKey];
    } else {
      current = current[key];
    }
  }
  return current;
}
