import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
// import Footer from "../../components/Footer";

import {
    Layout,
    ContentStyled
} from "../../layout/privateLayout";

import {
    TitleStyled,
    CardCreateStyled,
    LabelStyled,
    LabelRadioStyled,
    LabelOptionStyled,
    InputGroupStyled,
    InputRadioGroupStyled,
    ErrorStyled,
    WarningStyled,
    ButtonStyled
} from "./layout";
import "./style.css";

const CreateEvaluation = () => {

    const initialValues = {
        title: "",
        evaluation: "",
    };

    const validationSchema = yup.object().shape(
        {
            title: yup.string()
                .min(5, "Título muito curto")
                .max(250, "Título muito longo")
                .required("Preencha o campo!"),
            evaluation: yup.string()
                .min(5, "Avaliação muito curto")
                .max(5000, "Avaliação muito longa")
                .required("Preencha o campo!"),
        }
    );

    const handleSubmit = async (values, actions) => {
        try {

            await axiosServer.post("/createEvaluation", {
                title: values.title,
                evaluation: values.evaluation
            });

            setTimeout(_ => {
                actions.resetForm();
            }, 2 * 1000);

            alert("Avaliação enviada com sucesso, obrigado!");
        } catch (error) {
            alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");

        }
    }

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>

                    <TitleStyled>De uma sugestão sobre nossa plataforma</TitleStyled>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="title">Título</LabelStyled>
                                <Field
                                    name="title"
                                    placeholder="Dê um título para sua avaliação"
                                    className="inputText"
                                />

                                <ErrorMessage
                                    name="título"
                                    component={ErrorStyled}
                                />
                            </InputGroupStyled>

                            <InputGroupStyled>
                                <LabelStyled htmlFor="evaluation">Avaliação</LabelStyled>

                                <Field
                                    name="evaluation"
                                    component="textarea"
                                    placeholder="Escreva sua avaliação"
                                    className="text"
                                />

                                <ErrorMessage
                                    name="evaluation"
                                    component={ErrorStyled}
                                />

                            </InputGroupStyled>

                            <ButtonStyled type="submit">Enviar avaliação</ButtonStyled>
                        </Form>
                    </Formik>
                </CardCreateStyled>
            </ContentStyled>
        </Layout >
    );
}

export default CreateEvaluation;