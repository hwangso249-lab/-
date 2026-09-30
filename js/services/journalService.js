import { supabase } from "../../src/supabase.js";


/*
 * --------------------------------------------------
 * HTML Escape
 * --------------------------------------------------
 */

function escapeHtml(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/*
 * --------------------------------------------------
 * 일지 필드 렌더링
 * --------------------------------------------------
 */

function renderJournalField(label, value) {

  if (!value) {
    return "";
  }

  return `
    <div class="journal-entry-field">

      <div class="journal-entry-label">
        ${escapeHtml(label)}
      </div>

      <div class="journal-entry-text">
        ${escapeHtml(value)}
      </div>

    </div>
  `;
}


/*
 * --------------------------------------------------
 * 개별 일지 렌더링
 * --------------------------------------------------
 */

function renderJournalEntry(entry) {

  const action =
    entry.judgment_action ||
    "기록 없음";


  const confidence =
    entry.confidence !== null &&
    entry.confidence !== undefined
      ? `${entry.confidence} / 5`
      : "기록 없음";


  return `
    <article class="journal-entry">

      <div class="journal-entry-header">

        <div>

          <div class="journal-entry-date">
            ${escapeHtml(entry.journal_date)}
          </div>

          <div class="journal-entry-action">
            ${escapeHtml(action)}
          </div>

        </div>


        <div class="journal-entry-confidence">
          확신도 ${escapeHtml(confidence)}
        </div>

      </div>


      ${renderJournalField(
        "시장 요약",
        entry.market_summary
      )}


      ${renderJournalField(
        "새롭게 알게 된 것",
        entry.new_learnings
      )}


      ${renderJournalField(
        "생각이 바뀐 부분",
        entry.changed_thoughts
      )}


      ${renderJournalField(
        "가장 중요한 변화",
        entry.most_important_change
      )}


      ${renderJournalField(
        "판단 이유",
        entry.judgment_reason
      )}


      ${renderJournalField(
        "내일 확인할 것",
        entry.tomorrow_checks
      )}

    </article>
  `;
}


/*
 * --------------------------------------------------
 * 투자 일지 저장
 * --------------------------------------------------
 */

export async function createJournalEntry(user) {

  const form =
    document.getElementById("journal-form");


  if (!form) {
    return;
  }


  form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const submitButton =
      form.querySelector(
        'button[type="submit"]'
      );


    const message =
      document.getElementById(
        "journal-form-message"
      );


    const journalDate =
      document.getElementById(
        "journal-date"
      ).value;


    const marketSummary =
      document.getElementById(
        "market-summary"
      ).value.trim();


    const newLearnings =
      document.getElementById(
        "new-learnings"
      ).value.trim();


    const changedThoughts =
      document.getElementById(
        "changed-thoughts"
      ).value.trim();


    const mostImportantChange =
      document.getElementById(
        "most-important-change"
      ).value.trim();


    const judgmentAction =
      document.getElementById(
        "judgment-action"
      ).value;


    const judgmentReason =
      document.getElementById(
        "judgment-reason"
      ).value.trim();


    const confidenceValue =
      document.getElementById(
        "confidence"
      ).value;


    const tomorrowChecks =
      document.getElementById(
        "tomorrow-checks"
      ).value.trim();


    if (!journalDate) {

      message.textContent =
        "일지 날짜를 입력해주세요.";

      message.className =
        "journal-form-message error";

      return;
    }


    submitButton.disabled = true;


    message.textContent =
      "저장 중입니다...";

    message.className =
      "journal-form-message";


    try {

      const {
        data,
        error
      } = await supabase
        .from("journal_entries")
        .insert({

          user_id:
            user.id,

          journal_date:
            journalDate,

          market_summary:
            marketSummary || null,

          new_learnings:
            newLearnings || null,

          changed_thoughts:
            changedThoughts || null,

          most_important_change:
            mostImportantChange || null,

          judgment_action:
            judgmentAction || null,

          judgment_reason:
            judgmentReason || null,

          confidence:
            confidenceValue
              ? Number(confidenceValue)
              : null,

          tomorrow_checks:
            tomorrowChecks || null

        })
        .select()
        .single();


      if (error) {

        console.error(
          "[Journal] 저장 실패:",
          error
        );


        if (error.code === "23505") {

          message.textContent =
            "해당 날짜의 투자 일지가 이미 존재합니다.";

        } else {

          message.textContent =
            `저장에 실패했습니다: ${error.message}`;

        }


        message.className =
          "journal-form-message error";


        return;
      }


      console.log(
        "[Journal] 저장 성공:",
        data
      );


      message.textContent =
        "투자 일지가 저장되었습니다.";


      message.className =
        "journal-form-message success";


      form.reset();


      await loadJournalEntries(
        user.id
      );


    } catch (error) {

      console.error(
        "[Journal] 저장 중 예외:",
        error
      );


      message.textContent =
        "투자 일지 저장 중 오류가 발생했습니다.";


      message.className =
        "journal-form-message error";


    } finally {

      submitButton.disabled =
        false;

    }

  });
}


/*
 * --------------------------------------------------
 * 현재 사용자의 투자 일지 조회
 * --------------------------------------------------
 */

export async function loadJournalEntries(userId) {

  const container =
    document.getElementById(
      "journal-list"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `
    <div class="journal-loading">
      일지를 불러오는 중...
    </div>
  `;


  try {

    const {
      data,
      error
    } = await supabase
      .from("journal_entries")
      .select(`
        id,
        journal_date,
        market_summary,
        new_learnings,
        changed_thoughts,
        most_important_change,
        judgment_action,
        judgment_reason,
        confidence,
        tomorrow_checks,
        created_at
      `)
      .eq(
        "user_id",
        userId
      )
      .order(
        "journal_date",
        {
          ascending: false
        }
      );


    if (error) {

      console.error(
        "[Journal] 조회 실패:",
        error
      );


      container.innerHTML = `
        <div class="journal-error">
          투자 일지를 불러오지 못했습니다.
        </div>
      `;


      return;
    }


    if (
      !data ||
      data.length === 0
    ) {

      container.innerHTML = `
        <div class="journal-empty">
          아직 작성한 투자 일지가 없습니다.
        </div>
      `;


      return;
    }


    container.innerHTML =
      data
        .map(renderJournalEntry)
        .join("");


  } catch (error) {

    console.error(
      "[Journal] 조회 중 예외:",
      error
    );


    container.innerHTML = `
      <div class="journal-error">
        투자 일지를 불러오는 중 오류가 발생했습니다.
      </div>
    `;

  }
}
