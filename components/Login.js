export function Login() {
return `
<section class="login-section">

  <div class="login-card">

    <div class="login-header">

      <div class="login-eyebrow">
        INVESTMENT JOURNAL
      </div>

      <h1 class="login-title">
        투자 일지
      </h1>

      <p class="login-description">
        로그인하여 나의 투자 일지를 확인하세요.
      </p>

    </div>


    <!-- 로그인 -->

    <form id="login-form" class="login-form">

      <div class="login-form-field">

        <label for="login-email">
          이메일
        </label>

        <input
          id="login-email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="이메일을 입력하세요"
          required
        >

      </div>


      <div class="login-form-field">

        <label for="login-password">
          비밀번호
        </label>

        <input
          id="login-password"
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="비밀번호를 입력하세요"
          required
        >

      </div>


      <div
        id="login-form-message"
        class="login-form-message"
        aria-live="polite"
      ></div>


      <button
        type="submit"
        id="login-submit-button"
        class="login-submit-button"
      >
        로그인
      </button>

    </form>


    <!-- 회원가입 -->

    <div class="login-divider">
      <span>또는</span>
    </div>


    <form id="signup-form" class="login-form">

      <div class="login-form-field">

        <label for="signup-email">
          회원가입 이메일
        </label>

        <input
          id="signup-email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="사용할 이메일을 입력하세요"
          required
        >

      </div>


      <div class="login-form-field">

        <label for="signup-password">
          비밀번호
        </label>

        <input
          id="signup-password"
          type="password"
          name="password"
          autocomplete="new-password"
          placeholder="6자 이상 입력하세요"
          minlength="6"
          required
        >

      </div>


      <div class="login-form-field">

        <label for="signup-password-confirm">
          비밀번호 확인
        </label>

        <input
          id="signup-password-confirm"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          placeholder="비밀번호를 다시 입력하세요"
          minlength="6"
          required
        >

      </div>


      <div
        id="signup-form-message"
        class="login-form-message"
        aria-live="polite"
      ></div>


      <button
        type="submit"
        id="signup-submit-button"
        class="login-submit-button"
      >
        회원가입
      </button>

    </form>

  </div>

</section>


`;
}