# Kalkulator walut

## Opis projektu

Kalkulator walut to prosta aplikacja internetowa, która pozwala przeliczać waluty EUR, USD, GBP i CHF na polskie złote (PLN).

Kurs waluty jest za każdym razem pobierany z publicznego API Narodowego Banku Polskiego, dzięki czemu aplikacja korzysta z aktualnych danych zamiast zapisanych na stałe kursów.

## Źródło danych

Aplikacja korzysta z publicznego API NBP:

* tabela A kursów walut,
* kurs średni (`mid`),
* dane są pobierane w formacie JSON.

## Jak działa aplikacja?

Po wybraniu waluty, wpisaniu kwoty i kliknięciu przycisku **„Przelicz”**:

1. Aplikacja sprawdza, czy wybrano walutę.
2. Sprawdza, czy podana kwota jest poprawna i większa od zera.
3. Pokazuje komunikat o pobieraniu aktualnego kursu.
4. Pobiera kurs wybranej waluty z API NBP.
5. Przelicza podaną kwotę na PLN.
6. Wyświetla wynik oraz wykorzystany kurs.

## Obsługa błędów

Aplikacja wyświetla odpowiednie komunikaty, gdy:

* nie wybrano waluty,
* nie podano kwoty,
* kwota nie jest liczbą,
* kwota jest mniejsza lub równa zero,
* nie udało się pobrać danych z API.

Podczas pobierania kursu przycisk **„Przelicz”** jest zablokowany, aby nie można było rozpocząć kilku zapytań jednocześnie.

## Technologie

* HTML
* JavaScript
* Tailwind CSS
* DaisyUI
* API NBP

## Czego nauczyłam się podczas tworzenia projektu?

Podczas tworzenia kalkulatora nauczyłam się korzystać z zewnętrznego API oraz pobierać dane za pomocą `fetch()`.

Przećwiczyłam również:

* `async` i `await`,
* pracę z JSON,
* obsługę błędów za pomocą `try...catch...finally`,
* walidację danych formularza,
* wyświetlanie stanów ładowania,
* oddzielenie pobierania danych od części odpowiedzialnej za wyświetlanie wyniku.
