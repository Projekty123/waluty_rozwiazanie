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

function showResult(amount, currencyCode, rate) {
    const resultInPLN = amount * rate;

    result.innerHTML = `
        <div class="alert alert-success alert-soft">
            <div>
                <p class="font-bold text-lg">
                    ${amount.toFixed(2)} ${currencyCode} =
                    ${resultInPLN.toFixed(2)} PLN
                </p>

                <p class="text-sm">
                    Kurs: 1 ${currencyCode} = ${rate.toFixed(4)} PLN
                </p>
            </div>
        </div>
    `;
}

function showError(message) {
    result.innerHTML = `
        <div class="alert alert-error alert-soft">
            <span>${message}</span>
        </div>
    `;
}

function showLoading() {
    result.innerHTML = `
        <div class="alert alert-info alert-soft">
            <span class="loading loading-spinner loading-sm"></span>
            <span>Pobieranie aktualnego kursu...</span>
        </div>
    `;
}

calculateBtn.addEventListener("click", async function () {
    const selectedCurrency = currency.value;
    const enteredAmount = Number(amount.value);

    result.innerHTML = "";

    if (selectedCurrency === "") {
        showError("Wybierz walutę.");
        return;
    }

    if (amount.value.trim() === "") {
        showError("Wpisz kwotę.");
        return;
    }

    if (isNaN(enteredAmount)) {
        showError("Podana kwota musi być liczbą.");
        return;
    }

    if (enteredAmount <= 0) {
        showError("Kwota musi być większa od zera.");
        return;
    }

    calculateBtn.disabled = true;

    showLoading();

    try {
        const rate = await getExchangeRate(selectedCurrency);

        showResult(enteredAmount, selectedCurrency, rate);
    } catch (error) {
        showError(
            "Nie udało się pobrać aktualnego kursu. Spróbuj ponownie później."
        );
    } finally {
        calculateBtn.disabled = false;
    }
});