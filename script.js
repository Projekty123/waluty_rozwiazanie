const currency = document.getElementById("currency");
const amount = document.getElementById("amount");
const calculateBtn = document.getElementById("calculate-btn");
const result = document.getElementById("result");

async function getExchangeRate(currencyCode) {
    const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode.toLowerCase()}/?format=json`
    );

    if (!response.ok) {
        throw new Error("Nie udało się pobrać kursu.");
    }

    const data = await response.json();

    return data.rates[0].mid;
}

calculateBtn.addEventListener("click", async function () {
    const selectedCurrency = currency.value;
    const enteredAmount = Number(amount.value);

    result.innerHTML = "";

    if (selectedCurrency === "") {
        result.innerHTML = `
            <div class="alert alert-error">
                <span>Wybierz walutę.</span>
            </div>
        `;
        return;
    }

    if (amount.value.trim() === "") {
        result.innerHTML = `
            <div class="alert alert-error">
                <span>Wpisz kwotę.</span>
            </div>
        `;
        return;
    }

    if (isNaN(enteredAmount)) {
        result.innerHTML = `
            <div class="alert alert-error">
                <span>Podana kwota musi być liczbą.</span>
            </div>
        `;
        return;
    }

    if (enteredAmount <= 0) {
        result.innerHTML = `
            <div class="alert alert-error">
                <span>Kwota musi być większa od zera.</span>
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="alert alert-success">
            <span>Kurs ${selectedCurrency}: ${rate} PLN</span>
        </div>
    `;
});