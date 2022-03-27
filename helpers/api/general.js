/**
 * @param { Array } data 
 */
export const generateAutoIncrementId = (data) => {
  return data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;
}