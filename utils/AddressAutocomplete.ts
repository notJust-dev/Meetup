const API_BASE_URL = "https://api.mapbox.com/search/searchbox/v1";
const accesToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

export async function getSuggestions(input: string, session_token: string) {
  const response = await fetch(
    `${API_BASE_URL}/suggest?q=${input}&language=en&proximity=-73.990593,40.740121&session_token=${session_token}&access_token=${accesToken}`,
  );

  const json = await response.json();
  return json;
}

export const retrieveDetails = async (id: string, session_token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/retrieve/${id}?session_token=${session_token}&access_token=${accesToken}`,
  );

  const json = await response.json();
  return json;
};
