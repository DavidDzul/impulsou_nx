export const generatePrefix = () => {
  const date = Date.now().toString();
  return date.substr(date.length - 5);
};
