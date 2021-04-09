// import axiosViaCep from "../services/axiosViaCep";
const axiosViaCep = require("../services/axiosViaCep");

exports.nationalityIsValid = nationality => {

    const nationalityStandard = /[^a-zà-ú]/gi;

    if (nationality === undefined ||
        nationality === null ||
        nationality.length <= 0 ||
        nationality.length > 50 ||
        nationalityStandard.test(nationality)) {
        return false;
    }

    return true;
}

exports.educationLevelIsValid = educationLevel => {

    //Elementary School Incomplete
    if (educationLevel === "ESI") {
        return "Fundamental incompleto";
    }
    //Elementary School Complete
    else if (educationLevel === "ESC") {
        return "Fundamental completo";
    }
    //High School Incomplete
    else if (educationLevel === "HSI") {
        return "Médio incompleto";
    }
    //High School ccomplete
    else if (educationLevel === "HSC") {
        return "Médio completo";
    }
    //College Incomplete 
    else if (educationLevel === "CI") {
        return "Superior incompleto";
    }
    //College Complete 
    else if (educationLevel === "CC") {
        return "Superior completo";
    }

    return null;
}

exports.sexIsValid = sex => {

    //Man
    if (sex === "M") {
        return "Homem";
    }
    //Woman
    else if (sex === "W") {
        return "Mulher";
    }

    return null;
}

exports.maritalStatusIsValid = maritalStatus => {
    // Married
    if (maritalStatus === "MA") {
        return "Casado";
        // Single
    } else if (maritalStatus === "SI") {
        return "Solteiro";
    }

    return null;
}

exports.dateIsValid = date => {

    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}

exports.payDayIsValid = payDay => {

    if (payDay.getDate() <= 0 || payDay.getDate() > 31) {
        return null;
    }

    const day = payDay.getDate() < 10 ? "0" + payDay.getDate() : payDay.getDate();

    return `Dia do pagamento: ${day}`;
}

exports.listEmittingOrgan = (emittingOrgan = null) => {

    const list = [
        { emittingOrgan: "SSP", extendedEmittingOrgan: "Secretaria de Segurança Pública" },
        { emittingOrgan: "PM", extendedEmittingOrgan: "Polícia Militar" },
        { emittingOrgan: "PC", extendedEmittingOrgan: "Polícia Civil" },
        { emittingOrgan: "CNT", extendedEmittingOrgan: "Carteira Nacional de Habilitação" },
        { emittingOrgan: "DIC", extendedEmittingOrgan: "Diretoria de Identificação Civil" },
        { emittingOrgan: "CTPS", extendedEmittingOrgan: "Carteira de Trabaho e Previdência Social" },
        { emittingOrgan: "FGTS", extendedEmittingOrgan: "Fundo de Garantia do Tempo de Serviço" },
        { emittingOrgan: "IFP", extendedEmittingOrgan: "Instituto Félix Pacheco" },
        { emittingOrgan: "IPF", extendedEmittingOrgan: "Instituto Pereira Faustino" },
        { emittingOrgan: "IML", extendedEmittingOrgan: "Instituto Médico - Legal" },
        { emittingOrgan: "MTE", extendedEmittingOrgan: "Ministério do Trabalho e Emprego" },
        { emittingOrgan: "MMA", extendedEmittingOrgan: "Ministério da Marinha" },
        { emittingOrgan: "MAE", extendedEmittingOrgan: "Ministério da Aeronáutica" },
        { emittingOrgan: "MEX", extendedEmittingOrgan: "Ministério do Exército" },
        { emittingOrgan: "POF", extendedEmittingOrgan: "Polícia Federal" },
        { emittingOrgan: "POM", extendedEmittingOrgan: "Polícia Militar" },
        { emittingOrgan: "SES", extendedEmittingOrgan: "Carteira de Estrangeiro" },
        { emittingOrgan: "SJS", extendedEmittingOrgan: "Secretaria da Justiça e Segurança" },
        { emittingOrgan: "SJTS", extendedEmittingOrgan: "Secretaria da Justiça do Trabalho e Segurança" },
        { emittingOrgan: "ZZZ", extendedEmittingOrgan: "Outros" }
    ];

    if (emittingOrgan === null) {
        return list;
    }

    const element = list.find(element => element.emittingOrgan === emittingOrgan);
    return element === undefined ? null : element;

}

exports.cepIsValid = async cep => {
    try {
        const res = await axiosViaCep.get(`/ws/${cep}/json/unicode/`);

        // console.log(res.data.cep);
        return res.data;
    } catch (e) {
        return null;
    }
}

exports.districtIsValid = district => {
    const districtStandard = /[^a-zà-ú ]/gi;


    if (district === undefined ||
        district === null ||
        district.length <= 0 ||
        district.length > 50 ||
        districtStandard.test(district)) {

        return false;
    }

    return true;
}

exports.monthlyIncomeIsValid = (monthlyIncome) => {

    try {
        const note = monthlyIncome.split("R$")[1].split(",")[0].split(".").join("");
        const change = monthlyIncome.split("R$")[1].split(",")[1];

        const unmaskedMonthlyIncome = parseFloat(`${note}.${change}`);

        return unmaskedMonthlyIncome;

    } catch (e) {
        return null;
    }
}

exports.celPhoneIsValid = celPhone => {
    try {
        if (celPhone.length === 11) {
            const x = celPhone;
            return `(${x[0]}${x[1]}) ${x[2]}${x[3]}${x[4]}${x[5]}${x[6]} - ${x[7]}${x[8]}${x[9]}${x[10]}`
        }
        else if (celPhone.length === 12) {
            const x = celPhone;
            return `(${x[0]}${x[1]}) ${x[2]}${x[3]}${x[4]}${x[5]} - ${x[6]}${x[7]}${x[8]}${x[9]}`
        }
    } catch (e) {
        return null;
    }
}

exports.addressIsValid = address => {
    if (address.length <= 0 || address.length > 200) {
        return false;
    }

    return true;
}

exports.occupationIsValid = occupation => {

    if (occupation.length <= 0 || occupation.length > 50) {
        return false;
    }

    return true;
}

exports.ideaTitleIsValid = ideaTitle => {

    if (ideaTitle.length <= 0 || ideaTitle.length > 200) {
        return false;
    }

    return true;
}

exports.ideaTextIsValid = ideaText => {

    if (ideaText.length <= 0 || ideaText.length > 5000) {
        return false;
    }

    return true;
}

exports.loanIsValid = (loan) => {

    try {
        const note = loan.split("R$")[1].split(",")[0].split(".").join("");
        const change = loan.split("R$")[1].split(",")[1];
        const unmaskedLoan = parseFloat(`${note}.${change}`);

        return unmaskedLoan;

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
    if(maskedState === "N"){
        return "Não visualizado";
    } else if(maskedState === "E"){
        return "Avaliando informações";
    } else if(maskedState === "U"){
        return "Não aprovado";
    } else if(maskedState === "A"){
        return "Aprovado";
    }
}

exports.maskedCep = unmaskedCep =>{
    const x = unmaskedCep;
    return `${x[0]}${x[1]}${x[2]}${x[3]}${x[4]}-${x[5]}${x[6]}${x[7]}`
}