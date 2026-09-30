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

      <div class="header-right">

        <div class="date">
          ${date}
        </div>

        <button
          id="logout-button"
          type="button"
          class="logout-button"
        >
          로그아웃
        </button>

      </div>

    </header>
  `;
}
