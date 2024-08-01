
  
  /**
   * Fetches data from the Strapi API
   * @param endpoint - The endpoint to fetch from
   * @param query - The query parameters to add to the url
   * @param wrappedByKey - The key to unwrap the response from
   * @param wrappedByList - If the response is a list, unwrap it
   * @returns
   */
  export default async function fetchApi({
    endpoint,
    query,
    wrappedByKey,
    wrappedByList,
  }){
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
  
    const url = new URL(`${import.meta.env.STRAPI_API_URL}/api/${endpoint}`);
    console.log(url)
  
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    const res = await fetch(url.toString(),{
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',  // Ensure no cache
        'Pragma': 'no-cache',         // Additional cache control
        'Expires': '0',  
      },
    });
    let data = await res.json();
  
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }
  
    if (wrappedByList) {
      data = data[0];
    }
  
    return data;
  }