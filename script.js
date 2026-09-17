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
            <div class="alert alert-error alert-soft">
                <span>Wybierz walutę.</span>
            </div>
        `;
        return;
    }

    if (amount.value.trim() === "") {
        result.innerHTML = `
            <div class="alert alert-error alert-soft">
                <span>Wpisz kwotę.</span>
            </div>
        `;
        return;
    }

    if (isNaN(enteredAmount)) {
        result.innerHTML = `
            <div class="alert alert-error alert-soft">
                <span>Podana kwota musi być liczbą.</span>
            </div>
        `;
        return;
    }

    if (enteredAmount <= 0) {
        result.innerHTML = `
            <div class="alert alert-error alert-soft">
                <span>Kwota musi być większa od zera.</span>
            </div>
        `;
        return;
    }

    const rate = await getExchangeRate(selectedCurrency);

    const resultInPLN = enteredAmount * rate;

    result.innerHTML = `
        <div class="alert alert-success alert-soft">
            <div>
                <p class="font-bold text-lg">
                    ${enteredAmount.toFixed(2)} ${selectedCurrency} =
                    ${resultInPLN.toFixed(2)} PLN
                </p>

                <p class="text-sm">
                    Kurs: 1 ${selectedCurrency} = ${rate.toFixed(4)} PLN
                </p>
            </div>
        </div>
    `;
});