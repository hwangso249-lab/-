const API_KEY = "";

const API_URL = "KRX_API_URL";


export async function getMarketData() {

  console.log("[Market API] 요청 시작");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(
      `Market API Error: ${response.status}`
    );
  }

  const data = await response.json();

  console.log("[Market API] 응답:", data);

  return data;
}
