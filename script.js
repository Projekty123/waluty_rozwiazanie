const currency = document.getElementById("currency");
const amount = document.getElementById("amount");
const calculateBtn = document.getElementById("calculate-btn");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
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
            <span>Dane są poprawne. Wkrótce pobierzemy kurs ${selectedCurrency}.</span>
        </div>
    `;
});