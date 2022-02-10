export const includesIgnoreCase = (
  searchValue: string,
  ...stringsToSearch: string[]
) => {
  return stringsToSearch.some((string) => {
    return string.toLowerCase().includes(searchValue.toLowerCase());
  });
};
