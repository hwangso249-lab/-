export function CardHeader(title, subtitle) {
  return `
    <div class="card-header">
      <div class="card-title">${title}</div>
      <div class="card-subtitle">${subtitle}</div>
    </div>
  `;
}
