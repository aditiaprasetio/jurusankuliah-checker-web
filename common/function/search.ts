export function search(keyword: string, list: any[], cols: string[]) {
  if (!keyword)
    return list.map((item) => {
      return { ...item, poin: 0 };
    });

  const keywords = keyword
    .split(' ')
    .filter((item) => item && item != '')
    .map((item) => item.toLowerCase());

  for (const index in list) {
    if (list[index]) {
      list[index].poin = 0;
      for (const word of keywords) {
        for (const col of cols) {
          console.info(
            index,
            list[index][col],
            word,
            list[index][col] && list[index][col].toLowerCase().includes(word),
          );
          if (
            list[index][col] &&
            list[index][col].toLowerCase().includes(word)
          ) {
            list[index].poin += 1;
          }
        }
      }
    }
  }

  return list;
}
