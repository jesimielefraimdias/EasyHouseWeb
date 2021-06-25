import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import axiosViaCep from "../../services/axiosViaCep";

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
import GoogleMaps from "../../components/GoogleMaps";

const CreateProperty = () => {

    const [warning, setWarning] = useState({});

    const initialValues = {
        currentLocation: null,
        files: null,
        nickname: "",
        number: "",
        cep: "",
        address: "",
        complement: "",
        room: "",
        restroom: "",
        district: "",
        description: "",
        contract: "A",
        rentAmount: "",
        propertyValue: "",
    };
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
            currentLocation: yup.object().nullable()
                .test("testNumber", "Selecione a localização do imóvel", value => {
                    if (!!value) {
                        return true;
                    }
                    return false;

                }),
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

            const formData = new FormData();

            //            console.log("enviou", values.files, values.files);
            for (let i in values) {
                if (i !== "files" && i !== "currentLocation") {
                    formData.append(i, values[i]);
                } else if(i === "currentLocation"){
                    formData.append("lat", values[i].lat);
                    formData.append("lng", values[i].lng);
                }
            }
            // console.log("enviou2", typeof values.files);
            // console.log([...values.files][0], values.files.length);
            [...values.files].forEach(element => {
                console.log(element);
                formData.append("files", element);
            });
            // console.log("aqui",formData);
            const response = await axiosServer.post("createProperty", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });


            if (response.status === 201) {

                alert("Imóvel cadastrado com sucesso.");
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
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <TitleStyled>Cadastrar Imóvel</TitleStyled>

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
                                    <ContainerGroupStyled gridArea="MP">

                                        <GoogleMaps
                                            currentLocation={values.currentLocation}
                                            setCurrentLocation={value => {
                                                setFieldValue("currentLocation", value, true);
                                            }}
                                        />

                                        <ErrorMessage
                                            name="currentLocation"
                                            component={ErrorStyled}
                                        />
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
                                        <ButtonStyled type="submit">Cadastrar</ButtonStyled>
                                    </ContainerGroupStyled>
                                </FormStyled>
                            )
                        }}
                    </Formik>
                    <Message {...warning} />
                </CardCreateStyled>
            </ContentStyled>
        </Layout >
    );
}

export default CreateProperty;