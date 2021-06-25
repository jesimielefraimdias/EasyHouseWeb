import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import {
    Layout,
    ContentStyled
} from "../../layout/privateLayout";

import {
    TitleStyled,
    CardCreateStyled,
    LabelStyled,
    LabelOptionStyled,
    InputGroupStyled,
    ErrorStyled,
    ButtonStyled,
    FormStyled,
    ContainerGroupStyled,
    Field,
    FilesStyled
} from "./layout";

const CreateExpense = () => {
    const { id } = useParams();
    console.log("o id", id);
    const initialValues = {
        files: null,
        description: "asdasd",
        expense_date: new Date(),
        value: 5000,
    };

    const valueValidation = value => {
        console.log("value", value);
        console.log("value1", value);

        if (value == 0 || !!parseFloat(value)) {
            return true;
        }
        return false;
    }

    const validationSchema = yup.object().shape(
        {
            nickname: yup.string()
                .min(5, "Apelido muito curto")
                .max(255, "Apelido muito longo")
                .required("Preencha o campo!"),
            value: yup.string()
            // .test("testValue", "Digite um valor válido",
            //     valueValidation
            // ),
            ,
            description: yup.string(),
            expense_date: yup.date(),
        }
    );

    const handleSubmit = async (values, actions) => {
        try {

            const formData = new FormData();
            console.log("aqio", id);

            formData.append("property_id", id);
            //            console.log("enviou", values.files, values.files);
            for (let i in values) {
                if (i !== "files") {
                    formData.append(i, values[i]);
                }
            }
            // console.log("enviou2", typeof values.files);
            // console.log([...values.files][0], values.files.length);
            [...values.files].forEach(element => {
                console.log(element);
                formData.append("files", element);
            });
            // console.log("aqui",formData);
            const response = await axiosServer.post(`createExpense`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });


            if (response.status === 201) {

                alert("Despesa cadastrado com sucesso.");
                setTimeout(_ => {
                    actions.resetForm();
                }, 2 * 1000);

            }

        } catch (error) {
            console.log(error);
            alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");
        }
    }

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <TitleStyled>Cadastrar Despesa</TitleStyled>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        {({
                            resetForm,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            handleSubmit,
                            isValid,
                            values
                        }) => {
                            return (

                                <FormStyled>

                                    <ContainerGroupStyled gridArea="C1">
                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="nickname">Título da despesa</LabelStyled>
                                            <Field
                                                name="nickname"
                                                placeholder="Título da despesa"
                                            />

                                            <ErrorMessage
                                                name="nickname"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>
                                    </ContainerGroupStyled>

                                    <ContainerGroupStyled gridArea="C2">
                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="description">Descrição</LabelStyled>
                                            <Field
                                                name="description"
                                                placeholder="Descrição da despesa"
                                            />

                                            <ErrorMessage
                                                name="description"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>
                                    </ContainerGroupStyled>


                                    <ContainerGroupStyled gridArea="C3">

                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="value">Digite o valor da despesa:</LabelStyled>
                                            <Field
                                                name="value"
                                                placeholder="Digite o valor da despesa"
                                                type="number"
                                                min="0.00"
                                                step="0.10"
                                            />

                                            <ErrorMessage
                                                name="value"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>

                                    </ContainerGroupStyled>

                                    <ContainerGroupStyled gridArea="C4">
                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="files">Fotos</LabelStyled>

                                            <FilesStyled
                                                type="file"
                                                multiple
                                                onChange={(event) => {
                                                    // console.log(event.currentTarget.files);
                                                    // console.log([...event.currentTarget.files]);
                                                    setFieldValue("files", event.currentTarget.files);
                                                }}
                                            />

                                            <ErrorMessage
                                                name="files"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>
                                    </ContainerGroupStyled>

                                    <ContainerGroupStyled gridArea="C5">
                                        <InputGroupStyled>
                                            <LabelStyled htmlFor="expense_date">Data da despesa</LabelStyled>
                                            <DatePicker
                                                selected={values.expense_date}
                                                onChange={value => {
                                                    setFieldValue("expense_date", value, true);
                                                }}
                                            />

                                            <ErrorMessage
                                                name="expense_date"
                                                component={ErrorStyled}
                                            />
                                        </InputGroupStyled>
                                    </ContainerGroupStyled>


                                    <ContainerGroupStyled gridArea="BT">
                                        <ButtonStyled type="button" onClick={handleSubmit}>Cadastrar Despesa</ButtonStyled>
                                    </ContainerGroupStyled>
                                </FormStyled>
                            )
                        }}
                    </Formik>
                </CardCreateStyled>
            </ContentStyled>
        </Layout >
    );
}

export default CreateExpense;