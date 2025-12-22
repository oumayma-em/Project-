
let cryptos = [];
let portfolios = [];


const cryptoForm = document.getElementById("crypto-form");
const cryptoTableBody = document.getElementById("crypto-table-body");

const nameInput = document.getElementById("crypto-name");
const symbolInput = document.getElementById("crypto-symbol");
const qtyInput = document.getElementById("crypto-qty");
const buyPriceInput = document.getElementById("crypto-buy-price");
const portfolioSelect = document.getElementById("crypto-portfolio");

const portfolioForm = document.getElementById("portfolio-form");
const portfolioNameInput = document.getElementById("portfolio-name");
const portfolioList = document.getElementById("portfolio-list");

const totalValueEl = document.getElementById("kpi-total-value");

cryptoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const crypto = {
    id: Date.now(),
    name: nameInput.value,
    symbol: symbolInput.value.toUpperCase(),
    quantity: parseFloat(qtyInput.value),
    buyPrice: parseFloat(buyPriceInput.value),
    portfolio: portfolioSelect.value
  };

  cryptos.push(crypto);
  cryptoForm.reset();
  renderCryptos();
  updateKPI();
});


function renderCryptos() {
  cryptoTableBody.innerHTML = "";

  cryptos.forEach(c => {
    const totalValue = (c.quantity * c.buyPrice).toFixed(2);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.symbol}</td>
      <td>${c.quantity}</td>
      <td>$${c.buyPrice}</td>
      <td>$${totalValue}</td>
      <td>
        <button onclick="deleteCrypto(${c.id})">🗑</button>
      </td>
    `;
    cryptoTableBody.appendChild(tr);
  });
}

function deleteCrypto(id) {
  cryptos = cryptos.filter(c => c.id !== id);
  renderCryptos();
  updateKPI();
}


function updateKPI() {
  const total = cryptos.reduce(
    (sum, c) => sum + c.quantity * c.buyPrice,
    0
  );
  totalValueEl.textContent = `$${total.toFixed(2)}`;
}

portfolioForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = portfolioNameInput.value;
  portfolios.push(name);

  portfolioNameInput.value = "";
  renderPortfolios();
  updatePortfolioSelect();
});

function renderPortfolios() {
  portfolioList.innerHTML = "";
  portfolios.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    portfolioList.appendChild(li);
  });
}

function updatePortfolioSelect() {
  portfolioSelect.innerHTML = `<option value="">Sélectionner</option>`;
  portfolios.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    portfolioSelect.appendChild(option);
  });
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".page-section").forEach(s => s.classList.add("hidden"));
    document.getElementById(btn.dataset.target).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.getElementById("page-title").textContent = btn.textContent;
  });
});
