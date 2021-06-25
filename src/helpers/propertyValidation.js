// import axiosViaCep from "../services/axiosViaCep";
const axiosViaCep = require("../services/axiosViaCep");

exports.cepIsValid = async cep => {
    try {
        const res = await axiosViaCep.get(`/ws/${cep}/json/unicode/`);

        console.log("aqui",res.data);
        return res.data;
    } catch (e) {
        return null;
    }
}

exports.documentIsValid = document => {
    if (document !== null && (document.size > 5 * 1024 * 1024 || document.type !== "application/pdf")) {
        return false;
    }

    return true;
}

exports.formatMoney = unmaskedMoney => {
    return `R$ ${new Intl.NumberFormat('br-PT', { currency: 'BRL' }).format(unmaskedMoney)}`;

}

exports.formatState = maskedState => {
    // (N) - not viewed, (E) - evaluating information, (U) - unapproved, (A) - approved
    if (maskedState === "N") {
        return "Não visualizado";
    } else if (maskedState === "E") {
        return "Avaliando informações";
    } else if (maskedState === "U") {
        return "Não aprovado";
    } else if (maskedState === "A") {
        return "Aprovado";
    }
}

exports.maskedCep = unmaskedCep => {
    const x = unmaskedCep;
    return `${x[0]}${x[1]}${x[2]}${x[3]}${x[4]}-${x[5]}${x[6]}${x[7]}`
}