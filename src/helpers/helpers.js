const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const pipe =
  (...functions) =>
  (argument) =>
    functions.reduce((arg, fn) => fn(arg), argument);

export { htmlDecode, pipe };
