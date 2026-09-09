import { CardHeader } from "./CardHeader.js";

export function PortfolioCard(stocks) {

  const items = stocks.map(stock => `
    <div class="stock">

      <div class="stock-top">

        <div>
          <span class="stock-name">
            ${stock.name}
          </span>

          <span class="stock-code">
            ${stock.code}
          </span>
        </div>

        <div class="stock-price">
          ${stock.price}
        </div>

      </div>

      <div class="stock-bottom">

        <span class="thesis">
          오늘의 판단 ·
          <strong>${stock.thesis}</strong>
        </span>

        <span class="${stock.type}">
          ${stock.change}
        </span>

      </div>

    </div>
  `).join("");

  return `
    <section class="card">

      ${CardHeader(
        "내 투자 종목",
        "투자 논리 변화"
      )}

      <div class="portfolio-list">
        ${items}
      </div>

    </section>
  `;
}
