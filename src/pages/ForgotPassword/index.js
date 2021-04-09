import React, { useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";

import axiosServer from "../../services/axiosServer";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Footer from "../../components/Footer";

import {
    Layout,
    ContentStyled,
    LabelStyled,
    ErrorStyled
} from "../../layout/publicLayout";

import {
    CardForgotPasswordStyled,
    TitleStyled,
    InputGroupStyled,
    LoginStyled,
    ButtonStyled
} from "./layout";



import "./style.css";

const ForgotPassword = () => {

    const [warning, setWarning] = useState({});

    return (
        <Layout>
            <Header />

            <ContentStyled>
                <CardForgotPasswordStyled>
                    <TitleStyled>
                        Esqueceu sua senha?
                    </TitleStyled>

                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        validationSchema={yup.object().shape(
                            {
                                email: yup.string().email("Email inválido!").required("Preencha o campo!"),
                            }
                        )}
                        onSubmit={async (values, actions) => {
                            try {

                                await axiosServer.post("/forgotPassword", { email: values.email });
                                alert("Enviamos um email para você")

                            } catch (error) {
                                actions.setFieldError("email", "Email inexistente!");
                            }
                        }}
                    >

                        <Form>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="Email">Email</LabelStyled>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Digite seu email"
                                    className="inputText"
                                />
                                <ErrorMessage
                                    component={ErrorStyled}
                                    name="email"
                                />
                            </InputGroupStyled>
                            <ButtonStyled className="Form-Btn" type="submit">
                                Recuperar senha
                            </ButtonStyled>
                        </Form>
                    </Formik>
                    <Message {...warning} setWarning={setWarning} />

                    <LoginStyled>
                        <Link to="/" className="login">Voltar para tela de login</Link>
                    </LoginStyled>

                </CardForgotPasswordStyled>
            </ContentStyled>
            <Footer />
        </Layout>
    );
}

export default ForgotPassword;