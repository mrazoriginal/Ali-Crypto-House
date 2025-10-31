const coinsList = ["bitcoin","ethereum","tether"];
const holdInputs = {
  bitcoin: document.getElementById("hold-btc"),
  ethereum: document.getElementById("hold-eth"),
  tether: document.getElementById("hold-usdt")
};
const valSpans = {
  bitcoin: document.getElementById("val-btc"),
  ethereum: document.getElementById("val-eth"),
  tether: document.getElementById("val-usdt")
};
const emojiSpans = {
  bitcoin: document.getElementById("emoji-btc"),
  ethereum: document.getElementById("emoji-eth"),
  tether: document.getElementById("emoji-usdt")
};
const totalVal = document.getElementById("val-total");
const saveBtn = document.getElementById("save-portfolio");
const resetBtn = document.getElementById("reset-portfolio");

function formatPrice(n){return n>=1000?n.toLocaleString(undefined,{maximumFractionDigits:2}):n.toFixed(2);}

let lastPrices = {bitcoin:30000, ethereum:2000, tether:1}; // dummy initial prices

function updatePortfolio(){
  let total=0;
  coinsList.forEach(c=>{
    const price = lastPrices[c];
    const amount = parseFloat(holdInputs[c].value)||0;
    const emoji = emojiSpans[c];
    emoji.textContent="🤔";
    if(price && amount>0){
      const value = amount*price;
      valSpans[c].textContent=`$${formatPrice(value)}`;
      total+=value;
      setTimeout(()=>emoji.textContent="🤑",300);
      emoji.style.transform="scale(1.3)";
      setTimeout(()=>emoji.style.transform="scale(1)",400);
    } else valSpans[c].textContent="--";
  });
  totalVal.textContent=`$${formatPrice(total)}`;
}

function loadHoldings(){
  try{
    const data=JSON.parse(localStorage.getItem("ach_holdings_v2"));
    if(!data) return;
    coinsList.forEach(c=>{if(data[c]!=null) holdInputs[c].value=data[c]});
  }catch{}
}

saveBtn.addEventListener("click",()=>{
  const obj={};
  coinsList.forEach(c=>obj[c]=parseFloat(holdInputs[c].value)||0);
  localStorage.setItem("ach_holdings_v2",JSON.stringify(obj));
  updatePortfolio();
});

resetBtn.addEventListener("click",()=>{
  localStorage.removeItem("ach_holdings_v2");
  coinsList.forEach(c=>{
    holdInputs[c].value="";
    valSpans[c].textContent="--";
    emojiSpans[c].textContent="🤔";
  });
  totalVal.textContent="--";
});

loadHoldings();
updatePortfolio();
