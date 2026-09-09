import { CardHeader } from "./CardHeader.js";

export function MemoCard(memo) {

  return `
    <section class="card">

      ${CardHeader(
        "오늘의 투자 생각",
        "사실보다 중요한 나의 판단"
      )}

      <div class="memo">

        <div class="memo-label">
          오늘의 해석
        </div>

        <div class="memo-text">
          ${memo.interpretation}
        </div>

        <div class="memo-divider"></div>

        <div class="decision">

          <div class="decision-item">
            <div class="decision-label">
              오늘의 행동
            </div>

            <div class="decision-value">
              ${memo.action}
            </div>
          </div>

          <div class="decision-item">
            <div class="decision-label">
              투자 확신
            </div>

            <div class="decision-value">
              ${memo.confidence}
            </div>
          </div>

          <div class="decision-item">
            <div class="decision-label">
              내일 확인
            </div>

            <div class="decision-value">
              ${memo.tomorrow}
            </div>
          </div>

        </div>

      </div>

    </section>
  `;
}
