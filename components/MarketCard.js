import { CardHeader } from "./CardHeader.js";


export function MarketCard(markets) {

  const items = markets.map(market => `
    <div class="market-item">

      <div class="market-name">
        ${market.name}
      </div>

      <div class="market-value">
        ${market.value}
      </div>

      <div class="change ${market.type}">
        ${market.change}
      </div>

    </div>
  `).join("");


  return `
    <section class="card market">

      ${CardHeader(
        "오늘의 핵심 지표",
        "시장 전체의 방향"
      )}

      <div class="market-grid">
        ${items}
      </div>

    </section>
  `;
}
