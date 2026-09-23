import { supabase } from "../src/supabase.js";

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


/*
 * --------------------------------------------------
 * Supabase 연결 테스트
 * --------------------------------------------------
 */

async function testSupabaseConnection() {

  try {

    const { data, error } = await supabase
      .from("journal_entries")
      .select("id")
      .limit(1);

    if (error) {

      console.error(
        "[Supabase] 연결 테스트 실패"
      );

      console.error(
        "message:",
        error.message
      );

      console.error(
        "details:",
        error.details
      );

      console.error(
        "hint:",
        error.hint
      );

      console.error(
        "code:",
        error.code
      );

      return false;
    }

    console.log(
      "[Supabase] 연결 성공:",
      data
    );

    return true;

  } catch (error) {

    console.error(
      "[Supabase] 예외 발생:",
      error
    );

    return false;
  }
}


/*
 * --------------------------------------------------
 * 시장 데이터
 * --------------------------------------------------
 */

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


/*
 * --------------------------------------------------
 * App
 * --------------------------------------------------
 */

async function App() {

  // Supabase 연결 테스트
  await testSupabaseConnection();

  // 시장 데이터 조회
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


/*
 * --------------------------------------------------
 * 화면 렌더링
 * --------------------------------------------------
 */

App()
  .then(html => {

    app.innerHTML = html;

  })
  .catch(error => {

    console.error(
      "[App] 렌더링 실패:",
      error
    );

  });
