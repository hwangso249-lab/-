import { CardHeader } from "./CardHeader.js";

export function TradesCard(trades) {

  const rows = trades.map(trade => `
    <tr>

      <td>
        <span class="badge ${trade.type}">
          ${trade.label}
        </span>
      </td>

      <td>
        <strong>${trade.stock}</strong>
      </td>

      <td>
        ${trade.quantity}
      </td>

      <td>
        ${trade.price}
      </td>

      <td>
        ${trade.reason}
      </td>

    </tr>
  `).join("");

  return `
    <section class="card">

      ${CardHeader(
        "오늘의 매매",
        "왜 사고, 왜 팔았는가"
      )}

      <table class="trade-table">

        <thead>
          <tr>
            <th>구분</th>
            <th>종목</th>
            <th>수량</th>
            <th>가격</th>
            <th>이유</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
        </tbody>

      </table>

    </section>
  `;
}
