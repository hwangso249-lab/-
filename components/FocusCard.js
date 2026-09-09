export function FocusCard(focus) {

  return `
    <section class="focus">

      <div>

        <div class="focus-label">
          TODAY'S CORE QUESTION
        </div>

        <div class="focus-question">
          ${focus.question}
        </div>

      </div>

      <div class="focus-answer">
        ${focus.answer}
      </div>

    </section>
  `;
}
