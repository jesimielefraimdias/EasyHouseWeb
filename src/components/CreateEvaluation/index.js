import React, { useState, useEffect } from "react";
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

const CreateEvaluation = (props) => {
    // console.log("aqui",props.user_id);
    const [initialValues, setInitialValues] = useState({});
    const [viewed, setViewed] = useState();
    const [evaluationId, setEvaluationId] = useState();

    useEffect(() => {

        const getEvaluation = async () => {
            try {
                const res = await axiosServer.get("/getEvaluation"
                    , {
                        params: {
                            evaluation_id: props.evaluation_id
                        }
                    }
                );
                console.log(res.data);
                setInitialValues({
                    title: res.data.title,
                    evaluation: res.data.evaluation
                });
                setViewed(res.data.viewed);
                setEvaluationId(res.data.evaluation_id);

            } catch (error) {
                console.log(error);
                alert("Estamos com alguns erros2!");
            }
        }
        getEvaluation();
    }, []);


    const handleSubmit = async (values, actions) => {
        try {

            await axiosServer.post("/viewed", {
                evaluationId: evaluationId,
                viewed: !viewed
            });

            const viewed_ = viewed === 1 ? 0 : 1;
            setViewed(viewed_);
            props.reset();
            // alert("Alterado com sucesso!");
        } catch (error) {
            alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");

        }
    }

    return (
        <CardCreateStyled>

            <TitleStyled>{viewed ? "Visualizado" : "Ainda não visualizado"}</TitleStyled>

            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                <Form>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="title">Título</LabelStyled>
                        <Field
                            name="title"
                            placeholder="Dê um título para sua avaliação"
                            className="inputText"
                            disabled={true}
                        />

                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="evaluation">Avaliação</LabelStyled>

                        <Field
                            name="evaluation"
                            component="textarea"
                            placeholder="Escreva sua avaliação"
                            className="text"
                            disabled={true}
                        />

                    </InputGroupStyled>

                    <ButtonStyled type="submit">
                        {viewed ? "Trocar para não visualizado" : "Trocar para visualizado"}
                    </ButtonStyled>
                </Form>
            </Formik>
        </CardCreateStyled>
    );
}

export default CreateEvaluation;