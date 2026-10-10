import data from './csol-data.json';
export { data as csolData };
export function searchOccupations(query: string) {
  const terms = query.trim().toLocaleLowerCase('en-AU').split(/\s+/).filter(Boolean);
  return data.occupations.filter(row => terms.every(term => `${row.name} ${row.code}`.toLocaleLowerCase('en-AU').includes(term)));
}
