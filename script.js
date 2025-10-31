// Portfolio Toggle
const openBtn = document.getElementById("open-portfolio-btn");
const closeBtn = document.getElementById("close-portfolio-btn");
const portfolioBox = document.getElementById("portfolio-box");

openBtn.addEventListener("click", () => {
  portfolioBox.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  portfolioBox.style.display = "none";
});

// Emoji Explosion Example
function spawnEmoji(x, y, emoji = "💥") {
  const el = document.createElement("div");
  el.className = "emoji";
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 100 + 50;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  el.style.transform = `translate(${dx}px, ${dy}px)`;
  el.style.opacity = 0;

  setTimeout(() => el.remove(), 1200);
}

document.addEventListener("click", (e) => {
  spawnEmoji(e.clientX, e.clientY);
});

// Coin Price Fetch (mock example)
function updatePrices() {
  const prices = {
    bitcoin: 29300 + Math.floor(Math.random() * 200),
    ethereum: 1850 + Math.floor(Math.random() * 50),
    tether: 1 + Math.random() * 0.01
  };

  for (const id in prices) {
    const el = document.getElementById(`${id}-price`);
    el.textContent = `$${prices[id].toFixed(2)}`;
    el.className = `price ${Math.random() > 0.5 ? "up" : "down"}`;
  }

  document.getElementById("last-updated").textContent = `💸 Last Time Since Burning money: ${new Date().toLocaleTimeString()} 💸`;
}

document.getElementById("refresh-btn").addEventListener("click", updatePrices);

updatePrices(); // initial load
