export const requestOmniUnits = async (querystring = '') => {
  const URL = '/api/omniunits';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}

export const requestOmniUnit = async (name) => {
  const URL = `/api/omniunits/${decodeURIComponent(name)}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export const requestDbbs = async (querystring = '') => {
  const URL = '/api/dbbs';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}