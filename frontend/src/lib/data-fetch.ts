// helper function to fetch data from the backend

async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default dataFetch;

export async function dataFetchWithToken(endpoint: string, token: string) {
  // GET request
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
