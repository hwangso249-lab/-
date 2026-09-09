import { CardHeader } from "./CardHeader.js";

export function NewsCard(newsList) {

  const items = newsList.map(news => `
    <div class="news">

      <div class="news-tag">
        ${news.tag}
      </div>

      <div>
        <div class="news-title">
          ${news.title}
        </div>

        <div class="news-meta">
          ${news.meta}
        </div>
      </div>

      <div class="impact ${news.type}">
        ${news.impact}
      </div>

    </div>
  `).join("");

  return `
    <section class="card">

      ${CardHeader(
        "오늘의 핵심 뉴스",
        "투자 판단에 영향을 주는 뉴스만"
      )}

      <div class="news-list">
        ${items}
      </div>

    </section>
  `;
}
