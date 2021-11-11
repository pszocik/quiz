const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const pipe =
  (...functions) =>
  (argument) =>
    functions.reduce((acc, fn) => fn(acc), argument);

export { htmlDecode, pipe };
