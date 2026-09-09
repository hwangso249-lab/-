export const dashboardData = {
  date: "2026. 08. 19 · 수요일",

  market: [
    {
      name: "KOSPI",
      value: "3,184.62",
      change: "▲ 1.24%",
      type: "up"
    },
    {
      name: "KOSDAQ",
      value: "912.84",
      change: "▲ 0.82%",
      type: "up"
    },
    {
      name: "NASDAQ",
      value: "21,482.91",
      change: "▲ 0.67%",
      type: "up"
    },
    {
      name: "USD / KRW",
      value: "1,386.40",
      change: "▼ 0.32%",
      type: "down"
    },
    {
      name: "US 10Y",
      value: "4.21%",
      change: "▲ 0.04%p",
      type: "up"
    },
    {
      name: "WTI",
      value: "$66.84",
      change: "— 0.08%",
      type: "neutral"
    }
  ],

  news: [
    {
      tag: "시장",
      title: "미국 증시, 기술주 중심 상승세 지속",
      meta: "글로벌 증시 · 08:20",
      impact: "긍정적",
      type: "up"
    },
    {
      tag: "금리",
      title: "미국 장기금리 상승, 성장주 밸류에이션 부담 확대",
      meta: "매크로 · 09:05",
      impact: "부정적",
      type: "down"
    },
    {
      tag: "반도체",
      title: "AI 데이터센터 투자 확대에 따른 HBM 수요 전망 상향",
      meta: "반도체 업종 · 09:42",
      impact: "긍정적",
      type: "up"
    },
    {
      tag: "환율",
      title: "원/달러 환율 하락, 외국인 수급에 우호적인 환경",
      meta: "외환시장 · 10:12",
      impact: "긍정적",
      type: "up"
    }
  ],

  portfolio: [
    {
      name: "삼성전자",
      code: "005930",
      price: "78,400원",
      thesis: "강화",
      change: "+2.31%",
      type: "up"
    },
    {
      name: "SK하이닉스",
      code: "000660",
      price: "248,500원",
      thesis: "강화",
      change: "+3.18%",
      type: "up"
    },
    {
      name: "현대차",
      code: "005380",
      price: "214,000원",
      thesis: "유지",
      change: "-0.46%",
      type: "down"
    },
    {
      name: "NAVER",
      code: "035420",
      price: "264,500원",
      thesis: "약화",
      change: "-1.12%",
      type: "down"
    }
  ],

  trades: [
    {
      type: "buy",
      label: "추가매수",
      stock: "SK하이닉스",
      quantity: "10주",
      price: "241,000",
      reason: "HBM 수요 전망 강화"
    },
    {
      type: "sell",
      label: "일부매도",
      stock: "NAVER",
      quantity: "5주",
      price: "267,000",
      reason: "투자 가설 약화"
    }
  ],

  memo: {
    interpretation:
      "반도체 업종은 AI 데이터센터 투자 확대가 지속되고 있어 기존의 투자 가설이 강화되었다. 반면 금리 상승은 성장주 밸류에이션에 부담이 될 수 있으므로 추격 매수는 신중하게 접근할 필요가 있다.",

    action: "선별적 추가매수",
    confidence: "★★★★☆",
    tomorrow: "외국인 수급"
  },

  focus: {
    question: "오늘의 새로운 정보가 나의 투자 가설을 강화했는가?",
    answer:
      "반도체 수요에 대한 긍정적인 신호가 추가되면서 기존 투자 가설은 강화되었다. 다만 금리와 밸류에이션은 계속 확인할 필요가 있다."
  }
};
