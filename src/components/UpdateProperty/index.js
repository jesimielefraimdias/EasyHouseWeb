import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import axiosViaCep from "../../services/axiosViaCep";

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
    FilesStyled,
    Layout,
    ContentStyled
} from "./layout";
import Carousel from "../../components/Carousel";
import GoogleMaps from "../../components/GoogleMaps";

const UpdateProperty = (params) => {

    const history = useHistory();
    const [files, setFiles] = useState(null);
    const [warning, setWarning] = useState({});

    const initialValues = {
        ...params.user_id
    };

    const getProperty = async () => {
        try {
            // console.log("aqui", params.user_id);
            const res = await axiosServer.get(`getProperty/${params.user_id.id}`);
            console.log(res.data);
            setFiles(res.data.files);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getProperty();
    }, []);
    // const initialValues = {
    //     files: [],
    //     nickname: "",
    //     number: "",
    //     cep: "",
    //     address: "",
    //     complement: "",
    //     room: "",
    //     restroom: "",
    //     district: "",
    //     description: "",
    //     contract: "A",
    //     rentAmount: "",
    //     propertyValue: "",
    // };

    const valueValidation = value => {
        console.log("value", value);
        console.log("value1", value);

        if (value == 0 || !!parseFloat(value)) {
            return true;
        }
        return false;
    }

    const quantityValidation = value => {

        const quantity = parseInt(value);
        if (!!quantity && quantity > 0) {
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
            number: yup.number()
                .required("Preencha o campo!")
                .test("testNumber", "Digite uma quantidade válida", quantityValidation),
            room: yup.number()
                .required("Preencha o campo!")
                .test("testNumber", "Digite uma quantidade válida", quantityValidation),
            restroom: yup.number()
                .required("Preencha o campo!")
                .test("testNumber", "Digite uma quantidade válida", quantityValidation),
            cep: yup.string()
                .min(8, "cep muito curto")
                .max(8, "cep muito longo")
                .required("Preencha o campo!")
                .test("testCep", "Digite um cep válido",
                    async value => {
                        try {
                            if (!!!value || value.length < 8) throw true;

                            const res = await axiosViaCep.get(`/ws/${value}/json/unicode/`);

                            if (res.data.erro) throw new Error();
                            console.log("aqui", res.data);
                            // return res.data;
                            return true;
                        } catch (e) {
                            if (!!!value || value.length < 8) return true;

                            return false;
                        }
                    }),
            address: yup.string()
                .max(255, "Endereço muito longo")
                .required("Preencha o campo!"),
            complement: yup.string()
                .max(255, "Complemento muito longo")
                .required("Preencha o campo!"),
            district: yup.string()
                .max(255, "Complemento muito longo")
                .required("Preencha o campo!"),
            description: yup.string()
                .max(255, "Complemento muito longo")
                .required("Preencha o campo!"),
            contract: yup.string()
                .test("testContract", "Selecione uma opção",
                    value => {

                        if (value !== "S" && value !== "R" && value !== "A") return false;

                        return true;
                    })
                .required("Selecione uma opção!"),
            rentAmount: yup.string()
                .test("testValue", "Digite um valor válido",
                    valueValidation
                ),
            propertyValue: yup.string()
                .test("testValue", "Digite um valor válido",
                    valueValidation
                ),
            // files: yup.array()
        }
    );

    const handleSubmit = async (values, actions) => {
        try {


            const response = await axiosServer.post("updateProperty", values);


            if (response.status === 201) {

                alert("Imóvel alterado com sucesso.");
                setTimeout(_ => {
                    actions.resetForm();
                }, 2 * 1000);

                setWarning({
                    message: "Imóvel cadastrado com sucesso!",
                    type: "success",
                    timeInSeconds: 5
                });

            }

        } catch (error) {
            console.log(error);
            alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");
        }
    }

    return (
        <CardCreateStyled>
            <ButtonStyled onClick={_ => {
                history.push(`/ListExpenses/${params.user_id.id}`);
            }}>
                Listar despesas
            </ButtonStyled>

            <TitleStyled>Atualizar Imóvel</TitleStyled>

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

                            <ContainerGroupStyled gridArea="CA">
                                <Carousel files={files} />
                            </ContainerGroupStyled>
                            <ContainerGroupStyled gridArea="OP">
                                <InputGroupStyled>
                                    <LabelOptionStyled htmlFor="contract">
                                        Opções do apartamento:
                                    </LabelOptionStyled>

                                    <Field
                                        name="contract"
                                        as="select"
                                    >
                                        <option value="S">Venda</option>
                                        <option value="R">Alugar</option>
                                        <option value="A">Ambos</option>
                                    </Field>

                                    <ErrorMessage
                                        name="contract"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>



                            </ContainerGroupStyled>

                            <ContainerGroupStyled>
                                <InputGroupStyled>
                                    <LabelStyled htmlFor="cep">CEP</LabelStyled>
                                    <Field
                                        name="cep"
                                        placeholder="Digite o cep da sua região"
                                    />

                                    <ErrorMessage
                                        name="cep"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="nickname">Apelido</LabelStyled>
                                    <Field
                                        name="nickname"
                                        placeholder="Digite um apelido"
                                    />

                                    <ErrorMessage
                                        name="nickname"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="number">Número do imóvel</LabelStyled>
                                    <Field
                                        name="number"
                                        type="number"
                                        placeholder="Digite o número do imóvel"
                                    />

                                    <ErrorMessage
                                        name="number"
                                        component={ErrorStyled}
                                    />

                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="room">Quantidade de quartos</LabelStyled>
                                    <Field
                                        name="room"
                                        type="number"
                                        placeholder="Digite o número de quartos"
                                    />

                                    <ErrorMessage
                                        name="room"
                                        component={ErrorStyled}
                                    />

                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="restroom">Quantidade de banheiros</LabelStyled>
                                    <Field
                                        name="restroom"
                                        type="number"
                                        placeholder="Digite o número de banheiros"
                                    />

                                    <ErrorMessage
                                        name="restroom"
                                        component={ErrorStyled}
                                    />

                                </InputGroupStyled>

                            </ContainerGroupStyled>

                            <ContainerGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="district">Destrito</LabelStyled>
                                    <Field
                                        name="district"
                                        placeholder="Digite seu bairro"
                                    />

                                    <ErrorMessage
                                        name="district"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="description">Descrição</LabelStyled>
                                    <Field
                                        name="description"
                                        placeholder="Digite a descrição do seu imóvel"
                                    />

                                    <ErrorMessage
                                        name="description"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="address">Endereço</LabelStyled>
                                    <Field
                                        name="address"
                                        placeholder="Digite seu endereço"
                                    />

                                    <ErrorMessage
                                        name="address"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="complement">Complemento</LabelStyled>
                                    <Field
                                        name="complement"
                                        placeholder="Digite o complemento"
                                    />

                                    <ErrorMessage
                                        name="complement"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>
                                <InputGroupStyled>
                                    <LabelStyled htmlFor="rentAmount">Digite o valor do aluguel:</LabelStyled>
                                    <Field
                                        name="rentAmount"
                                        placeholder="Digite o valor do aluguel"
                                        type="number"
                                        min="0.00"
                                        step="0.10"
                                    />

                                    <ErrorMessage
                                        name="rentAmount"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>

                                <InputGroupStyled>
                                    <LabelStyled htmlFor="propertyValue">Valor do imóvel:</LabelStyled>
                                    <Field
                                        name="propertyValue"
                                        placeholder="Digite o valor do imóvel"
                                        type="number"
                                        min="0.00"
                                        step="0.10"
                                    />

                                    <ErrorMessage
                                        name="propertyValue"
                                        component={ErrorStyled}
                                    />
                                </InputGroupStyled>
                            </ContainerGroupStyled>
                            <ContainerGroupStyled gridArea="BT">
                                <ButtonStyled type="submit">Salvar</ButtonStyled>

                            </ContainerGroupStyled>
                        </FormStyled>
                    )
                }}
            </Formik>
            <Message {...warning} />
        </CardCreateStyled>
    );
}

export default UpdateProperty;