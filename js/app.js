import { dashboardData } from "./data/dashboard.js";

import { Header } from "../components/Header.js";
import { MarketCard } from "../components/MarketCard.js";
import { NewsCard } from "../components/NewsCard.js";
import { PortfolioCard } from "../components/PortfolioCard.js";
import { TradesCard } from "../components/TradesCard.js";
import { MemoCard } from "../components/MemoCard.js";
import { FocusCard } from "../components/FocusCard.js";

import { getMarketData } from "./api/marketApi.js";


const app = document.getElementById("app");


async function loadMarketData() {

  try {

    const data = await getMarketData();

    console.log(
      "[App] 실제 시장 데이터 사용"
    );

    return data;

  } catch (error) {

    console.error(
      "[App] 시장 데이터 조회 실패",
      error
    );

    console.log(
      "[App] fallback 데이터 사용"
    );

    return dashboardData.market;
  }
}


async function App() {

  const market = await loadMarketData();

  return `

    ${Header(dashboardData.date)}

    ${MarketCard(market)}

    <div class="main-grid">

      ${NewsCard(dashboardData.news)}

      ${PortfolioCard(dashboardData.portfolio)}

    </div>

    <div class="bottom-grid">

      ${TradesCard(dashboardData.trades)}

      ${MemoCard(dashboardData.memo)}

    </div>

    ${FocusCard(dashboardData.focus)}

  `;
}


App().then(html => {
  app.innerHTML = html;
});
