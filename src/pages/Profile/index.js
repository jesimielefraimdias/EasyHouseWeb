import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import Navbar from "../../components/Navbar";
import axiosServer from "../../services/axiosServer";

import { nameIsValid, cpfIsValid } from "../../helpers/userValidation";

import {
    Layout,
    ContentStyled
} from "../../layout/privateLayout";

import {
    TitleStyled,
    CardProfileStyled,
    LabelStyled,
    InputGroupStyled,
    ErrorStyled,
    WarningStyled,
    ButtonStyled
} from "./layout";

import "./style.css";


const Profile = () => {

    const [initialValues, setInitialValues] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [warningEmail, setWarningEmail] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axiosServer.post("/getUser");

                setEmail(res.data.email);
                setValidated(res.data.validated);

                setInitialValues({
                    name: res.data.name,
                    email: res.data.email,
                    cpf: res.data.cpf,
                    password: "",
                    newPassword: "",
                    passwordConfirm: ""
                });

            } catch (error) {
                alert("Estamos com alguns erros!");
            }
        }
        getUser();
    }, []);

    const validationSchema = yup.object().shape(
        {
            name: yup.string()
                .min(5, "Nome muito curto")
                .max(250, "Nome muito longo")
                .test("testName", "Nome inválido!",
                    value => {
                        if (value.length > 5) {
                            return nameIsValid(value);
                        } else {
                            return true;
                        }
                    }
                )
                .required("Preencha o campo!"),
            email: yup.string()
                .email("Email inválido!")
                .required("Preencha o campo!")
                .test("warningEmail", "",
                    value => {
                        if (email !== value) {
                            setWarningEmail(
                                "Se o email for alterado, você precisará validar através de um link que enviaremos no seu email!"
                            );
                        }
                        else setWarningEmail(null);

                        return true;
                    }),
            cpf: yup.string()
                .min(11, "Precisa ter 12 digitos")
                .max(11, "Precisa ter 12 digitos")
                .test("testCpf", "Cpf inválido!",
                    (value) => {
                        if (value.length === 11) {
                            return cpfIsValid(value)
                        } else {
                            return true;
                        }
                    }
                )
                .required("Preencha o campo!"),
            password: yup.string().min(8, "Mínimo 8 caracteres!")
                .max(20, "Máximo 20 caracteres!"),
            newPassword: yup.string().min(8, "Mínimo 8 caracteres!")
                .max(20, "Máximo 20 caracteres!"),
            passwordConfirm: yup.string().min(8, "Mínimo 8 caracteres!")
                .max(20, "Máximo 20 caracteres!")
        }
    );

    const handleSubmit = async (values, actions) => {

        try {
            let error = {
                error: false,
                errorCpf: "",
                errorEmail: "",
                errorPassword: "",
                errorPasswordConfirm: ""
            }

            if (values.password.length === 0 &&
                (values.newPassword.length > 0 || values.passwordConfirm > 0)) {
                error.password = "Digite a senha!";
                error.error = true;
            }

            if (values.newPassword !== values.passwordConfirm) {
                error.errorPasswordConfirm = "As senhas não coincidem!";
                error.error = true;
            }

            if (error.error === true) {
                throw error;
            }

            let response;

            if (values.password.length === 0 && values.newPassword.length === 0 &&
                values.passwordConfirm.length === 0) {
                response = await axiosServer.put("/updateProfile", {
                    name: values.name,
                    email: values.email,
                    cpf: values.cpf
                });
            } else {
                response = await axiosServer.put("/updateProfile", {
                    name: values.name,
                    email: values.email,
                    cpf: values.cpf,
                    password: values.password,
                    newPassword: values.newPassword,
                });
            }

            if (response.status === 200) {
                error.errorCpf = response.data.errorCpf;
                error.errorEmail = response.data.errorEmail;
                error.errorPassword = response.data.errorPassword;

                throw error;
            }
            if (response.status === 204) {
                const res = await axiosServer.post("/getUser");

                setEmail(res.data.email);
                setValidated(res.data.validated);

                setInitialValues({
                    name: res.data.name,
                    email: res.data.email,
                    cpf: res.data.cpf,
                    password: "",
                    newPassword: "",
                    passwordConfirm: ""
                });

                actions.resetForm();
                setIsDisabled(!isDisabled);
            }

        } catch (error) {
            console.log(error);
            if (error.status !== undefined) {
                alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");
            } else {
                console.log(error);
                actions.setFieldError("cpf", error.errorCpf);
                actions.setFieldError("email", error.errorEmail);
                actions.setFieldError("password", error.errorPassword);
                actions.setFieldError("newPassword", error.errorPasswordConfirm);
                actions.setFieldError("passwordConfirm", error.errorPasswordConfirm);
            }
        }
    }

    return (
        <Layout>
            <Navbar />

            <ContentStyled>
                <CardProfileStyled>
                    <TitleStyled>
                        {isDisabled ? "Meus dados" : "Alterando meus dados"}
                    </TitleStyled>

                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ resetForm, isValid }) => {
                            return (
                                <>
                                    <ButtonStyled onClick={
                                        () => {
                                            if (!isDisabled) {
                                                resetForm();
                                            }
                                            setIsDisabled(!isDisabled);

                                        }}>
                                        {isDisabled ? "Deseja alterar os dados?" : "Cancelar alteração"}
                                    </ButtonStyled>

                                    <Form className ="provavelmente" className = "provavelmente">
                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="name">Nome</LabelStyled>
                                            <Field
                                                name="name"
                                                disabled={isDisabled}
                                                placeholder="Digite seu nome"
                                                className="inputText"
                                            />

                                            <ErrorMessage
                                                name="name"
                                                component={ErrorStyled}
                                            />

                                        </InputGroupStyled>

                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="email">E-mail</LabelStyled>
                                            <Field
                                                name="email"
                                                type="email"
                                                disabled={isDisabled}
                                                placeholder="Digite seu email"
                                                className="inputText"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component={ErrorStyled}
                                            />
                                            <WarningStyled>
                                                {warningEmail}
                                            </WarningStyled>

                                        </InputGroupStyled>

                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="cpf">CPF</LabelStyled>
                                            <Field
                                                name="cpf"
                                                className="Form-Field"
                                                disabled={validated ? true : isDisabled}
                                                placeholder="Digite seu cpf"
                                                className="inputText"
                                            />

                                            <ErrorMessage
                                                name="cpf"
                                                component="span"
                                            />
                                        </InputGroupStyled>

                                        <InputGroupStyled>
                                            <LabelStyled
                                                htmlFor="password"
                                                hidden={isDisabled}
                                            >
                                                Senha atual
                                            </LabelStyled>

                                            <Field
                                                name="password"
                                                type="password"
                                                disabled={isDisabled}
                                                hidden={isDisabled}
                                                placeholder="Digite sua senha atual"
                                                className="inputText"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="span"
                                            />
                                        </InputGroupStyled>

                                        <InputGroupStyled>
                                            <LabelStyled

                                                htmlFor="newPassword"
                                                hidden={isDisabled}
                                            >
                                                Nova senha
                                            </LabelStyled>

                                            <Field
                                                name="newPassword"
                                                type="password"
                                                disabled={isDisabled}
                                                hidden={isDisabled}
                                                placeholder="Digite sua nova senha"
                                                className="inputText"
                                            />
                                            <ErrorMessage
                                                name="newPassword"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>

                                        <InputGroupStyled>
                                            <LabelStyled
                                                htmlFor="passwordConfirm"
                                                hidden={isDisabled}
                                            >
                                                Confirmação da nova senha
                                                </LabelStyled>

                                            <Field
                                                name="passwordConfirm"
                                                type="password"
                                                disabled={isDisabled}
                                                hidden={isDisabled}
                                                placeholder="Confirme sua nova senha"
                                                className="inputText"
                                            />

                                            <ErrorMessage
                                                name="passwordConfirm"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>

                                        {
                                            isDisabled ? null :
                                                < ButtonStyled
                                                    disabled={!isValid}
                                                    hidden={isDisabled}
                                                    type="submit"
                                                >
                                                    {isValid ? "Salvar alteração" : "Esqueceu alguma coisa?"}
                                                </ButtonStyled>
                                        }

                                    </Form>
                                </>
                            );
                        }}
                    </Formik>
                </CardProfileStyled>
            </ContentStyled>
            {/* <Footer /> */}
        </Layout >
    );
}

export default Profile;