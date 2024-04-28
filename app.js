// Seletores de entrada
const form = document.querySelector("form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Seletores de erro
const errorDay = document.querySelector(".error__day");
const errorMonth = document.querySelector(".error__month");
const errorYear = document.querySelector(".error__year");
const labels = document.querySelectorAll("label span");
const inputs = document.querySelectorAll("input");

// Seletores de resultados
const resultYear = document.querySelector(".lines__year");
const resultMonth = document.querySelector(".lines__month");
const resultDay = document.querySelector(".lines__day");

// Ouvintes de eventos
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

// Funções
function validateForm() {
  // Obtenha os valores das entradas
  const day = parseInt(dayInput.value || 0);
  const month = parseInt(monthInput.value || 0);
  const year = parseInt(yearInput.value || 0);
  const currentDate = new Date();
  let error = false;

  // Valide o dia
  if (day < 1 || day > new Date(year, month, 0).getDate() || isNaN(day)) {
    error = true;
    errorDay.textContent = "Must be a valid day";
  } else {
    errorDay.textContent = "";
  }

  // Valide o mês
  if (month < 1 || month > 12 || isNaN(month)) {
    error = true;
    errorMonth.textContent = "Must be a valid month";
  } else {
    errorMonth.textContent = "";
  }

  // Validar o ano
  if (year < 1900 || year > currentDate.getFullYear() || isNaN(year)) {
    error = true;
    errorYear.textContent = "Must be a valid year";
  } else {
    errorYear.textContent = "";
  }

  // Indicar erros
  if (error) {
    labels.forEach((label) => {
      label.style.color = "var(--light-red)";
    });

    inputs.forEach((input) => {
      input.style.border = "1px solid var(--light-red)";
    });

    resultYear.textContent = "--";
    resultMonth.textContent = "--";
    resultDay.textContent = "--";
  } else {
    // Redefinir a cor dos rótulos
    labels.forEach((label) => {
      label.style.color = "var(--smokey-grey)";
    });

    // Redefinir a cor da borda
    inputs.forEach((input) => {
      input.style.border = "1px solid var(--light-grey)";
    });
  }

  // Se todas as entradas forem válidas, exiba o resultado
  if (
    day >= 1 &&
    day <= new Date(year, month, 0).getDate() &&
    month >= 1 &&
    month <= 12 &&
    year >= 1900 &&
    year <= currentDate.getFullYear()
  ) {
    error = false;
    const birthDate = new Date(year, month - 1, day);
    let days = currentDate.getDate() - birthDate.getDate();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let years = currentDate.getFullYear() - birthDate.getFullYear();

    if (days < 0) {
      days = days + 30;
      months--;
    }

    if (months < 0) {
      months = months + 12;
      years--;
    }

    animateValue(years, resultYear);
    animateValue(months, resultMonth);
    animateValue(days, resultDay);
  }
}

// Animar o valor
function animateValue(val, elem) {
  let current = 0;
  let interval = setInterval(function () {
    // Valor animado se for maior que 0
    if (val > 0) {
      current += 1;
    }

    elem.textContent = current;

    if (current >= val) {
      clearInterval(interval);
    }
  }, 100);
}
