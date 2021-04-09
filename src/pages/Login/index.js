import React, { useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "../../contexts/auth";
import { GoogleLogin } from 'react-google-login';

import {
    Layout,
    ContentStyled,
    CardLoginStyled,
    TitleStyled,
    LabelStyled,
    InputGroupStyled,
    ErrorStyled,
    ButtonStyled,
    CreateUserStyled,
    ForgotStyled
} from "./layout";

import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const Login = () => {

    const history = useHistory();
    const { signIn } = useUser();
    const [errorLogin, setErrorLogin] = useState(null);

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape(
        {
            email: yup.string().email("Email inválido!").required("Preencha o campo!"),
            password: yup.string().min(8, "Mínimo 8 caracteres!").required("Preencha o campo!")
        }
    );

    const handleSubmit = async values => {
        const res = await signIn(values.email, values.password, null);
        setErrorLogin(null);


        if (!res.error) {
            history.push("/");
        } else {
            setErrorLogin("Os dados não conferem");
        }
    }

    const responseGoogle = async response => {
        console.log("response", response.tokenId);
        const res = await signIn(null, null, response);
        setErrorLogin(null);


        if (!res.error) {
            history.push("/");
        } else {
            setErrorLogin("Os dados não conferem");
        }
    }

    return (
        <Layout>

            <Header />

            <ContentStyled>

                <CardLoginStyled>
                    <TitleStyled>LOGIN</TitleStyled>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        <Form>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="email">E-mail:</LabelStyled>
                                <Field
                                    name="email"
                                    placeholder="E-mail"
                                    type="email"
                                    className="inputText"
                                />

                                <ErrorMessage
                                    name="email"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="password">Senha: </LabelStyled>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    className="inputText"

                                />
                                <ErrorMessage
                                    name="password"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <ButtonStyled type="submit">ENTRAR</ButtonStyled>
                            <GoogleLogin
                                clientId="309165722872-gug1ideapidlhdqb7hm954f9fk24q4f8.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />,
                            <ErrorStyled name="errorLogin">{errorLogin}</ErrorStyled>



                        </Form>
                    </Formik>

                    <ForgotStyled>
                        <Link to="/ForgotPassword" className="forgotPassword">Esqueci minha senha</Link>
                    </ForgotStyled>

                    <CreateUserStyled>
                        <Link to="/CreateUser" className="forgotPassword">Cadastrar-se</Link>
                    </CreateUserStyled>

                </CardLoginStyled>
            </ContentStyled>

            <Footer />

        </Layout >
    );
}

export default Login;