const formulario = document.getElementById("form");


const nombre = document.getElementById("firstName");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");
const monto = document.getElementById("amount");
const plazo = document.getElementById("fees");
const moneda = document.getElementById("coin")


const montoDepositado = document.getElementById("finalAmount");
const plazoFinal = document.getElementById("finalFees");
const montoFinal = document.getElementById("totalAmount");
const interesesFinal = document.getElementById("interests");

const tasa = 0.20;


formulario.addEventListener("submit", (e) => {


    e.preventDefault();
    calcularIntereses();
    calcularMontoFinal();
    pintarTuPlazoFijo();
    guardarCalculoLocalStorage();
    obtenerCalculoLocalStorage();
})





const calcularIntereses = () => {
    intereses = monto.value * (tasa * plazo.value / 365);

}

const calcularMontoFinal = () => {
    montoTotal = parseInt(monto.value) + parseFloat(intereses.toFixed(2));
    const cotizar = construirPLazoFijo(monto.value, plazo.value, montoTotal - monto.value, montoTotal)

    pintarTuPlazoFijo(cotizar)
    guardarCalculoLocalStorage(cotizar)
}

const pintarTuPlazoFijo = (cotizar) => {
    montoDepositado.innerText = `$${cotizar.monto}`;
    plazoFinal.innerText = `${cotizar.plazo}`;
    interesesFinal.innerText = `$${cotizar.intereses.toFixed(2)}`;
    montoFinal.innerText = `$${cotizar.total.toFixed(2)}`;

}

const construirPLazoFijo = (montoValue, plazoValue, interesesValue, totalValue) => {
    return {
        monto: montoValue,
        plazo: plazoValue,
        intereses: interesesValue,
        total: totalValue,
    }
}

const guardarCalculoLocalStorage = (cotizar) => {
    localStorage.setItem("cotizar", JSON.stringify(cotizar))

};
const obtenerCalculoLocalStorage = () => {
    const cotizarStorage = JSON.parse(localStorage.getItem("cotizar"));
    return cotizarStorage;
}

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("cotizar")) {
        const cotizarStorage = obtenerCalculoLocalStorage();
        pintarTuPlazoFijo(cotizarStorage);
    }
})

