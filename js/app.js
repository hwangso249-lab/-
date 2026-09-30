import { supabase } from "../src/supabase.js";

import { dashboardData } from "./data/dashboard.js";

import { Header } from "../components/Header.js";
import { Login } from "../components/Login.js";
import { JournalSection } from "../components/JournalSection.js";

import { MarketCard } from "../components/MarketCard.js";
import { NewsCard } from "../components/NewsCard.js";
import { PortfolioCard } from "../components/PortfolioCard.js";
import { TradesCard } from "../components/TradesCard.js";
import { MemoCard } from "../components/MemoCard.js";
import { FocusCard } from "../components/FocusCard.js";

import { getMarketData } from "./api/marketApi.js";

import {
  createJournalEntry,
  loadJournalEntries
} from "./services/journalService.js";


const app =
  document.getElementById("app");


/*
 * --------------------------------------------------
 * Supabase 연결 테스트
 * --------------------------------------------------
 */

async function testSupabaseConnection() {

  try {

    const {
      data,
      error
    } = await supabase
      .from("journal_entries")
      .select("id")
      .limit(1);


    if (error) {

      console.error(
        "[Supabase] 연결 테스트 실패"
      );

      console.error(
        "message:",
        error.message
      );

      console.error(
        "details:",
        error.details
      );

      console.error(
        "hint:",
        error.hint
      );

      console.error(
        "code:",
        error.code
      );

      return false;
    }


    console.log(
      "[Supabase] 연결 성공:",
      data
    );


    return true;

  } catch (error) {

    console.error(
      "[Supabase] 연결 테스트 예외:",
      error
    );

    return false;
  }
}


/*
 * --------------------------------------------------
 * 현재 로그인 사용자 확인
 * --------------------------------------------------
 */

async function getCurrentUser() {

  try {

    const {
      data: {
        user
      },
      error
    } = await supabase.auth.getUser();


    if (error) {

      /*
       * 로그인하지 않은 경우
       *
       * AuthSessionMissingError는
       * 정상적인 비로그인 상태다.
       */

      if (
        error.name ===
          "AuthSessionMissingError" ||
        error.message ===
          "Auth session missing!"
      ) {

        return null;
      }


      console.error(
        "[Auth] 현재 사용자 확인 실패:",
        error
      );


      return null;
    }


    return user;

  } catch (error) {

    if (
      error?.name ===
      "AuthSessionMissingError"
    ) {

      return null;
    }


    console.error(
      "[Auth] 현재 사용자 확인 예외:",
      error
    );


    return null;
  }
}


/*
 * --------------------------------------------------
 * 로그인
 * --------------------------------------------------
 */

function setupLogin() {

  const form =
    document.getElementById(
      "login-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const emailInput =
        document.getElementById(
          "login-email"
        );


      const passwordInput =
        document.getElementById(
          "login-password"
        );


      const submitButton =
        document.getElementById(
          "login-submit-button"
        );


      const message =
        document.getElementById(
          "login-form-message"
        );


      const email =
        emailInput.value.trim();


      const password =
        passwordInput.value;


      if (
        !email ||
        !password
      ) {

        message.textContent =
          "이메일과 비밀번호를 입력해주세요.";

        message.className =
          "login-form-message error";

        return;
      }


      submitButton.disabled =
        true;


      message.textContent =
        "로그인 중입니다...";


      message.className =
        "login-form-message";


      try {

        const {
          data,
          error
        } =
          await supabase.auth.signInWithPassword({
            email,
            password
          });


        if (error) {

          console.error(
            "[Auth] 로그인 실패:",
            error
          );


          message.textContent =
            `로그인에 실패했습니다: ${error.message}`;


          message.className =
            "login-form-message error";


          return;
        }


        console.log(
          "[Auth] 로그인 성공:",
          data.user
        );


        message.textContent =
          "로그인되었습니다.";


        message.className =
          "login-form-message success";


        /*
         * SIGNED_IN 이벤트도 발생하지만
         * 여기서 즉시 화면을 갱신한다.
         */

        await renderApp();

      } catch (error) {

        console.error(
          "[Auth] 로그인 중 예외:",
          error
        );


        message.textContent =
          "로그인 중 오류가 발생했습니다.";


        message.className =
          "login-form-message error";

      } finally {

        submitButton.disabled =
          false;
      }

    }
  );
}


/*
 * --------------------------------------------------
 * 회원가입
 * --------------------------------------------------
 */

function setupSignup() {

  const form =
    document.getElementById(
      "signup-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const emailInput =
        document.getElementById(
          "signup-email"
        );


      const passwordInput =
        document.getElementById(
          "signup-password"
        );


      const passwordConfirmInput =
        document.getElementById(
          "signup-password-confirm"
        );


      const submitButton =
        document.getElementById(
          "signup-submit-button"
        );


      const message =
        document.getElementById(
          "signup-form-message"
        );


      const email =
        emailInput.value.trim();


      const password =
        passwordInput.value;


      const passwordConfirm =
        passwordConfirmInput.value;


      /*
       * 기본 입력 검증
       */

      if (
        !email ||
        !password ||
        !passwordConfirm
      ) {

        message.textContent =
          "이메일과 비밀번호를 모두 입력해주세요.";


        message.className =
          "login-form-message error";


        return;
      }


      if (
        password.length < 6
      ) {

        message.textContent =
          "비밀번호는 6자 이상 입력해주세요.";


        message.className =
          "login-form-message error";


        return;
      }


      if (
        password !==
        passwordConfirm
      ) {

        message.textContent =
          "비밀번호가 일치하지 않습니다.";


        message.className =
          "login-form-message error";


        return;
      }


      submitButton.disabled =
        true;


      message.textContent =
        "회원가입 중입니다...";


      message.className =
        "login-form-message";


      try {

        const {
          data,
          error
        } =
          await supabase.auth.signUp({
            email,
            password
          });


        if (error) {

          console.error(
            "[Auth] 회원가입 실패:",
            error
          );


          let errorMessage =
            `회원가입에 실패했습니다: ${error.message}`;


          const lowerMessage =
            error.message.toLowerCase();


          if (
            lowerMessage.includes(
              "password"
            )
          ) {

            errorMessage =
              "비밀번호 조건을 확인해주세요.";
          }


          if (
            lowerMessage.includes(
              "already registered"
            )
          ) {

            errorMessage =
              "이미 가입된 이메일입니다. 로그인해주세요.";
          }


          message.textContent =
            errorMessage;


          message.className =
            "login-form-message error";


          return;
        }


        console.log(
          "[Auth] 회원가입 성공:",
          data.user
        );


        /*
         * Email Confirmation이 꺼져 있다면
         * session이 바로 생성될 수 있다.
         */

        if (data.session) {

          message.textContent =
            "회원가입 및 로그인이 완료되었습니다.";


          message.className =
            "login-form-message success";


          await renderApp();


          return;
        }


        /*
         * 이메일 인증이 필요한 경우
         */

        message.textContent =
          "회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.";


        message.className =
          "login-form-message success";


        form.reset();

      } catch (error) {

        console.error(
          "[Auth] 회원가입 중 예외:",
          error
        );


        message.textContent =
          "회원가입 중 오류가 발생했습니다.";


        message.className =
          "login-form-message error";

      } finally {

        submitButton.disabled =
          false;
      }

    }
  );
}


/*
 * --------------------------------------------------
 * 로그아웃
 * --------------------------------------------------
 */

function setupLogout() {

  const logoutButton =
    document.getElementById(
      "logout-button"
    );


  if (!logoutButton) {
    return;
  }


  logoutButton.addEventListener(
    "click",
    async () => {

      logoutButton.disabled =
        true;


      const originalText =
        logoutButton.textContent;


      logoutButton.textContent =
        "로그아웃 중...";


      try {

        const {
          error
        } =
          await supabase.auth.signOut();


        if (error) {

          console.error(
            "[Auth] 로그아웃 실패:",
            error
          );


          alert(
            `로그아웃에 실패했습니다: ${error.message}`
          );


          logoutButton.disabled =
            false;


          logoutButton.textContent =
            originalText;


          return;
        }


        console.log(
          "[Auth] 로그아웃 성공"
        );


        /*
         * SIGNED_OUT 이벤트에서
         * 로그인 화면으로 전환된다.
         */

        await renderApp();

      } catch (error) {

        console.error(
          "[Auth] 로그아웃 중 예외:",
          error
        );


        alert(
          "로그아웃 중 오류가 발생했습니다."
        );


        logoutButton.disabled =
          false;


        logoutButton.textContent =
          originalText;
      }

    }
  );
}


/*
 * --------------------------------------------------
 * 시장 데이터
 * --------------------------------------------------
 */

async function loadMarketData() {

  try {

    const data =
      await getMarketData();


    console.log(
      "[App] 실제 시장 데이터 사용"
    );


    return data;

  } catch (error) {

    console.error(
      "[App] 시장 데이터 조회 실패:",
      error
    );


    console.log(
      "[App] fallback 데이터 사용"
    );


    return dashboardData.market;
  }
}


/*
 * --------------------------------------------------
 * 로그인 화면
 * --------------------------------------------------
 */

function renderLoginScreen() {

  app.innerHTML =
    Login();


  setupLogin();

  setupSignup();
}


/*
 * --------------------------------------------------
 * 대시보드
 * --------------------------------------------------
 */

async function renderDashboard(user) {

  console.log(
    "[Auth] 현재 로그인 사용자:",
    user.id
  );


  /*
   * Supabase 연결 테스트
   */

  await testSupabaseConnection();


  /*
   * 시장 데이터 조회
   */

  const market =
    await loadMarketData();


  /*
   * 대시보드 렌더링
   */

  app.innerHTML = `

    ${Header(
      dashboardData.date
    )}


    ${MarketCard(
      market
    )}


    <div class="main-grid">

      ${NewsCard(
        dashboardData.news
      )}


      ${PortfolioCard(
        dashboardData.portfolio
      )}

    </div>


    <div class="bottom-grid">

      ${TradesCard(
        dashboardData.trades
      )}


      ${MemoCard(
        dashboardData.memo
      )}

    </div>


    ${FocusCard(
      dashboardData.focus
    )}


    ${JournalSection()}

  `;


  /*
   * 로그아웃 이벤트 연결
   */

  setupLogout();


  /*
   * 오늘 날짜를 기본값으로 설정
   */

  const dateInput =
    document.getElementById(
      "journal-date"
    );


  if (
    dateInput &&
    !dateInput.value
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    dateInput.value =
      today;
  }


  /*
   * 투자 일지 이벤트 연결
   */

  await createJournalEntry(
    user
  );


  /*
   * 기존 투자 일지 조회
   */

  await loadJournalEntries(
    user.id
  );
}


/*
 * --------------------------------------------------
 * App 렌더링
 * --------------------------------------------------
 */

async function renderApp() {

  const user =
    await getCurrentUser();


  /*
   * 비로그인 상태
   */

  if (!user) {

    console.log(
      "[Auth] 로그인한 사용자가 없습니다."
    );


    renderLoginScreen();


    return;
  }


  /*
   * 로그인 상태
   */

  await renderDashboard(
    user
  );
}


/*
 * --------------------------------------------------
 * Auth 상태 변화 감지
 * --------------------------------------------------
 */

supabase.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "[Auth] 상태 변경:",
      event
    );


    /*
     * 로그아웃
     */

    if (
      event ===
      "SIGNED_OUT"
    ) {

      renderLoginScreen();

      return;
    }


    /*
     * 로그인
     */

    if (
      event === "SIGNED_IN" &&
      session?.user
    ) {

      await renderDashboard(
        session.user
      );

      return;
    }

  }
);


/*
 * --------------------------------------------------
 * 최초 실행
 * --------------------------------------------------
 */

renderApp()
  .catch(error => {

    console.error(
      "[App] 렌더링 실패:",
      error
    );


    app.innerHTML = `
      <div class="auth-required">
        화면을 불러오는 중 오류가 발생했습니다.
      </div>
    `;

  });
