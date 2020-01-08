export const snakeCaseToCamelCase = (str: string) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase()
    .replace('-', '')
    .replace('_', '')
);
