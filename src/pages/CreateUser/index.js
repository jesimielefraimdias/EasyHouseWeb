import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import Footer from "../../components/Footer";

import { Link, useHistory } from "react-router-dom";



import {
    Layout,
    TitleStyled,
    ContentStyled,
    CardCreateStyled,
    LabelStyled,
    LabelRadioStyled,
    LabelOptionStyled,
    InputGroupStyled,
    InputRadioGroupStyled,
    ErrorStyled,
    WarningStyled,
    ButtonStyled,
    LoginStyled
} from "./layout";
import "./style.css";

import { nameIsValid, cpfIsValid } from "../../helpers/userValidation";

const CreateOperator = () => {


    const initialValues = {
        name: "",
        email: "",
        cpf: "",
        access_level: "O",
        password: "",
        passwordConfirm: ""
    };

    const validationSchema = yup.object().shape(
        {
            name: yup.string()
                .min(5, "Nome muito curto")
                .max(250, "Nome muito longo")
                .test("testName", "Nome inválido!",
                    value => {
                        if (value === undefined) return false;

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
                .required("Preencha o campo!"),
            cpf: yup.string()
                .min(11, "Precisa ter 12 digitos")
                .max(11, "Precisa ter 12 digitos")
                .test("testCpf", "Cpf inválido!",
                    value => {
                        if (value === undefined) return false;

                        if (value.length === 11) {
                            return cpfIsValid(value)
                        } else {
                            return true;
                        }
                    }
                )
                .required("Preencha o campo!"),
            password: yup.string()
                .min(8, "Mínimo 8 caracteres!")
                .max(20, "Máximo 20 caracteres!")
                .required("Preencha o campo!"),
            passwordConfirm: yup.string()
                .min(8, "Mínimo 8 caracteres!")
                .max(20, "Máximo 20 caracteres!")
                .required("Preencha o campo!")
        }
    );

    const handleSubmit = async (values, actions) => {
        console.log(values);
        try {
            let error = {
                error: false,
                errorCpf: "",
                errorEmail: "",
                errorPassword: ""
            }

            if (values.password !== values.passwordConfirm) {
                error.errorPassword = "As senhas não coincidem!";
                error.error = true;
            }

            if (error.error === true) {
                throw error;
            }

            const response = await axiosServer.post("/createUser", {
                name: values.name,
                email: values.email,
                cpf: values.cpf,
                password: values.password,
            });


            if (response.status === 200) {
                console.log(response.data.errorCpf);
                error.errorCpf = response.data.errorCpf;
                error.errorEmail = response.data.errorEmail;

                throw error;

            } else if (response.status === 201) {
                alert("Cadastrado com sucesso.\nVerifique seu email.");
                // setWarning({
                //     message: "Cadastrado com sucesso!",
                //     type: "success",
                //     timeInSeconds: 5
                // });
                setTimeout(_ => {
                    actions.resetForm();
                }, 2 * 1000);
            }

        } catch (error) {

            if (error.status !== undefined) {
                alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");
            } else {
                actions.setFieldError("cpf", error.errorCpf);
                actions.setFieldError("email", error.errorEmail);
                actions.setFieldError("password", error.errorPassword);
                actions.setFieldError("passwordConfirm", error.errorPassword);
            }
        }
    }

    return (
        <Layout>
            <Header />
            <ContentStyled>
                <CardCreateStyled>

                    <TitleStyled>Cadastro usuário</TitleStyled>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="name">Nome</LabelStyled>
                                <Field
                                    name="name"
                                    placeholder="Digite o nome"
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
                                    placeholder="Digite o email"
                                    className="inputText"
                                />

                                <ErrorMessage
                                    name="email"
                                    component={ErrorStyled}
                                />

                            </InputGroupStyled>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="cpf">CPF</LabelStyled>
                                <Field
                                    name="cpf"
                                    placeholder="Digite o cpf"
                                    className="inputText"
                                />

                                <ErrorMessage
                                    name="cpf"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <InputGroupStyled>
                                <LabelStyled
                                    htmlFor="password"
                                >
                                    Senha
                                </LabelStyled>

                                <Field
                                    name="password"
                                    type="password"
                                    className="inputText"
                                    placeholder="Digite a senha"
                                />
                                <ErrorMessage
                                    name="password"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <InputGroupStyled>
                                <LabelStyled
                                    htmlFor="passwordConfirm"
                                >
                                    Confirmação senha
                                </LabelStyled>

                                <Field
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="Confirme a senha"
                                    className="inputText"
                                />

                                <ErrorMessage
                                    name="passwordConfirm"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <ButtonStyled type="submit">Cadastrar</ButtonStyled>
                        </Form>
                    </Formik>

                    <LoginStyled>
                        <Link to="/" className="login">Voltar para tela de login</Link>
                    </LoginStyled>
                </CardCreateStyled>
            </ContentStyled>
            <Footer />
        </Layout >
    );
}

export default CreateOperator;