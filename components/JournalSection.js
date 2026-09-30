export function JournalSection() {

  return `

    <section class="journal-section">

      <div class="journal-section-header">

        <div>

          <div class="journal-section-eyebrow">
            INVESTMENT JOURNAL
          </div>

          <h2 class="journal-section-title">
            오늘의 투자 일지
          </h2>

        </div>

      </div>


      <form
        id="journal-form"
        class="journal-form"
      >

        <div class="journal-form-grid">


          <div class="journal-form-field">

            <label for="journal-date">
              날짜
            </label>

            <input
              id="journal-date"
              type="date"
              required
            >

          </div>


          <div class="journal-form-field">

            <label for="judgment-action">
              오늘의 판단
            </label>

            <select id="judgment-action">

              <option value="">
                선택
              </option>

              <option value="매수">
                매수
              </option>

              <option value="추가매수">
                추가매수
              </option>

              <option value="보유">
                보유
              </option>

              <option value="관망">
                관망
              </option>

              <option value="일부매도">
                일부매도
              </option>

              <option value="매도">
                매도
              </option>

            </select>

          </div>


          <div class="journal-form-field">

            <label for="confidence">
              확신도
            </label>

            <select id="confidence">

              <option value="">
                선택
              </option>

              <option value="1">
                1 / 5
              </option>

              <option value="2">
                2 / 5
              </option>

              <option value="3">
                3 / 5
              </option>

              <option value="4">
                4 / 5
              </option>

              <option value="5">
                5 / 5
              </option>

            </select>

          </div>


          <div class="journal-form-field full">

            <label for="market-summary">
              시장 요약
            </label>

            <textarea
              id="market-summary"
              rows="3"
              placeholder="오늘 시장에서 중요했던 내용을 기록하세요."
            ></textarea>

          </div>


          <div class="journal-form-field full">

            <label for="new-learnings">
              새롭게 알게 된 것
            </label>

            <textarea
              id="new-learnings"
              rows="3"
              placeholder="오늘 새롭게 알게 된 사실이나 정보를 기록하세요."
            ></textarea>

          </div>


          <div class="journal-form-field full">

            <label for="changed-thoughts">
              생각이 바뀐 부분
            </label>

            <textarea
              id="changed-thoughts"
              rows="3"
              placeholder="기존 생각과 달라진 점을 기록하세요."
            ></textarea>

          </div>


          <div class="journal-form-field full">

            <label for="most-important-change">
              가장 중요한 변화
            </label>

            <textarea
              id="most-important-change"
              rows="3"
              placeholder="오늘 투자 판단에서 가장 중요했던 변화를 기록하세요."
            ></textarea>

          </div>


          <div class="journal-form-field full">

            <label for="judgment-reason">
              판단 이유
            </label>

            <textarea
              id="judgment-reason"
              rows="3"
              placeholder="왜 이런 판단을 했는지 기록하세요."
            ></textarea>

          </div>


          <div class="journal-form-field full">

            <label for="tomorrow-checks">
              내일 확인할 것
            </label>

            <textarea
              id="tomorrow-checks"
              rows="3"
              placeholder="내일 확인해야 할 사항을 기록하세요."
            ></textarea>

          </div>


        </div>


        <div class="journal-form-footer">

          <div
            id="journal-form-message"
            class="journal-form-message"
            aria-live="polite"
          ></div>


          <button
            type="submit"
            class="journal-submit-button"
          >
            투자 일지 저장
          </button>

        </div>

      </form>

    </section>


    <section class="journal-section journal-history">

      <div class="journal-section-header">

        <div>

          <div class="journal-section-eyebrow">
            MY JOURNALS
          </div>

          <h2 class="journal-section-title">
            내 투자 일지
          </h2>

        </div>

      </div>


      <div id="journal-list">

        <div class="journal-loading">
          일지를 불러오는 중...
        </div>

      </div>

    </section>

  `;
}
