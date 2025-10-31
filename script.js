const priceBtc = document.getElementById("price-btc");
const priceEth = document.getElementById("price-eth");
let lastPrices = {};

// Fetch prices from CoinGecko
async function fetchPrices() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );
    const data = await res.json();
    lastPrices.bitcoin = data.bitcoin.usd;
    lastPrices.ethereum = data.ethereum.usd;

    priceBtc.textContent = `$${formatPrice(data.bitcoin.usd)}`;
    priceEth.textContent = `$${formatPrice(data.ethereum.usd)}`;

    updatePortfolioDisplay();
  } catch (err) {
    console.error("Error fetching prices:", err);
  }
}

// Helper to format numbers
function formatPrice(num) {
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Refresh every 10s
setInterval(fetchPrices, 10000);
fetchPrices();

// ==== Portfolio Widget Logic ====
const holdBtc = document.getElementById("hold-btc");
const holdEth = document.getElementById("hold-eth");
const savePortfolioBtn = document.getElementById("save-portfolio");
const resetPortfolioBtn = document.getElementById("reset-portfolio");
const valBtc = document.getElementById("val-btc");
const valEth = document.getElementById("val-eth");
const valTotal = document.getElementById("val-total");

function loadHoldings() {
  try {
    const raw = localStorage.getItem("ach_holdings");
    if (!raw) return;
    const obj = JSON.parse(raw);
    holdBtc.value = obj.btc ?? "";
    holdEth.value = obj.eth ?? "";
  } catch (e) {
    console.warn("Could not load holdings", e);
  }
}

savePortfolioBtn.addEventListener("click", () => {
  const obj = {
    btc: parseFloat(holdBtc.value) || 0,
    eth: parseFloat(holdEth.value) || 0,
  };
  localStorage.setItem("ach_holdings", JSON.stringify(obj));
  updatePortfolioDisplay();
});

resetPortfolioBtn.addEventListener("click", () => {
  localStorage.removeItem("ach_holdings");
  holdBtc.value = "";
  holdEth.value = "";
  updatePortfolioDisplay();
});

function updatePortfolioDisplay() {
  const btcP = lastPrices["bitcoin"] ?? null;
  const ethP = lastPrices["ethereum"] ?? null;

  const btcAmt = parseFloat(holdBtc.value) || 0;
  const ethAmt = parseFloat(holdEth.value) || 0;

  const btcVal = btcP ? btcAmt * btcP : null;
  const ethVal = ethP ? ethAmt * ethP : null;

  valBtc.textContent = btcVal ? `$${formatPrice(btcVal)}` : "N/A";
  valEth.textContent = ethVal ? `$${formatPrice(ethVal)}` : "N/A";

  const total = (btcVal || 0) + (ethVal || 0);
  valTotal.textContent = `$${formatPrice(total)}`;
}

loadHoldings();
updatePortfolioDisplay();
