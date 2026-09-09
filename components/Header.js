export function Header(date) {
  return `
    <header class="header">

      <div>
        <div class="eyebrow">
          INVESTMENT JOURNAL
        </div>

        <h1>
          오늘의 투자 대시보드
        </h1>
      </div>

      <div class="date">
        ${date}
      </div>

    </header>
  `;
}
