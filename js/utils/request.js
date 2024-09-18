export const requestOmniUnits = async (querystring = '') => {
  const URL = `/api/omniunits`;
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}

export const requestOmniUnit = async (slug) => {
  const URL = `/api/omniunits/${slug}`;
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