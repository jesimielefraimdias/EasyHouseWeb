exports.userAccessLevel = param => {
    if(param === "U") return "Usuário";
    else if(param === "O") return "Operador";
    else if(param === "A") return "Administrador";
    else return null;

}

exports.userValidated = param => {
    if(param == 0) return "Não validado";
    else if(param == 1) return "Validado";
    else return null;
}

exports.nameIsValid = (paramNome) => {
    const padraoNome = /[^a-zà-ú ]/gi;


    if (paramNome === null || paramNome.length === 0 || paramNome.length > 50 || padraoNome.test(paramNome)) {
        return false;
    }

    return true;
}

exports.cpfIsValid = (strCPF) => {
    let soma = 0;
    let resto;
    let i;

    if (strCPF === null || strCPF.length === 0) return false;
    if (strCPF === "00000000000") return false;
    if (strCPF === "11111111111") return false;
    if (strCPF === "22222222222") return false;
    if (strCPF === "33333333333") return false;
    if (strCPF === "44444444444") return false;
    if (strCPF === "55555555555") return false;
    if (strCPF === "66666666666") return false;
    if (strCPF === "77777777777") return false;
    if (strCPF === "88888888888") return false;
    if (strCPF === "99999999999") return false;

    for (i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

exports.passwordIsValid = (paramSenha) => {
    if (paramSenha === null) return false;
    let numberCaracters = paramSenha.length >= 8 && paramSenha.length <= 20 ? true : false;
    // let uppercase = /[A-Z]/.test(paramSenha);
    // let lowercase = /[a-z]/.test(paramSenha);
    // let number = /[0-9]/.test(paramSenha);
    // let specialChars = /[^\w]/.test(paramSenha);
    return numberCaracters;
    //return uppercase & lowercase & number & specialChars;
}

exports.formatCpf = maskedCpf => {
    const x = maskedCpf;
    return `${x[0]}${x[1]}${x[2]}.${x[3]}${x[4]}${x[5]}.${x[6]}${x[7]}${x[8]}-${x[9]}${x[10]}`;
}