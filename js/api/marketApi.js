const API_KEY = "34FB9C375A5D41159C3AEA474A17F0A995416F5A";

const API_URL = "https://data-dbg.krx.co.kr/svc/apis";


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
