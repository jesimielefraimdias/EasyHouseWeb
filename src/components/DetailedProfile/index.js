import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axiosServer from "../../services/axiosServer";

import {
    CardProfileStyled,
    LabelStyled,
    LabelRadioStyled,
    LabelOptionStyled,
    InputGroupStyled,
    ErrorStyled,
    WarningStyled,
    ButtonStyled
} from "./layout";
import "./style.css";
import { nameIsValid, cpfIsValid } from "../../helpers/userValidation";




const DetailedProfile = ({ user_id, reset }) => {

    const [initialValues, setInitialValues] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);

    //Para mostrar mensagem de alteração de email.
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(true);
    const [removed, setRemoved] = useState(false);
    //Warnings
    const [warningEmail, setWarningEmail] = useState(null);
    const [warningRemoved, setWarningRemoved] = useState(null);
    const [warningValidated, setWarningValidated] = useState(null);

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axiosServer.get("/getAnotherUser"
                    , {
                        params: {
                            user_id
                        }
                    }
                );

                setEmail(res.data.email);
                setValidated(res.data.validated);
                setRemoved(res.data.removed);

                setInitialValues({
                    access_level: res.data.access_level,
                    validated: res.data.validated ? "true" : "false",
                    removed: res.data.removed ? "true" : "false",
                    name: res.data.name,
                    email: res.data.email,
                    cpf: res.data.cpf
                });

            } catch (error) {
                alert("Estamos com alguns erros!");
            }
        }
        getUser();
    }, []);

    const validationSchema = yup.object().shape(
        {
            removed: yup.string()
                .test("warningUserIsRemoved", "",
                    value => {
                        if (value === "true" && !removed) setWarningRemoved("Se o usuário estiver inativo ele perderá o acesso a plataforma!");
                        else setWarningRemoved(null);

                        return true;
                    })
                .required(),
            validated: yup.string()
                .test("warningUserIsValid", "",
                    value => {
                        if (value === "true" && !validated) setWarningValidated("Se o cadastro for realizado como ativo, o CPF não poderá ser alterado!");
                        else setWarningValidated(null);

                        return true;
                    })
                .required(),
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
                        if (email !== value) setWarningEmail("Se o email for alterado, você precisará validar através de um link que enviaremos no seu email!");
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
                .required("Preencha o campo!")
        }
    );

    const handleSubmit = async (values, actions) => {

        try {

            let error = {
                error: false,
                errorCpf: "",
                errorEmail: "",
            }

            if (error.error === true) {
                throw error;
            }
            console.log(values.removed);
            const response = await axiosServer.put("/updateAdministratorLevel", {
                user_id,
                access_level: values.access_level,
                validated: values.validated,
                removed: values.removed,
                email: values.email
            });

            if (response.status === 200) {
                error.errorEmail = response.data.errorEmail;

                throw error;
            }
            if (response.status === 204) {
                reset();
            }

        } catch (error) {
            if (error.status !== undefined) {
                alert("Estamos passando por problemas e já estamos trabalhando para arrumar!");
            } else {
                actions.setFieldError("email", error.errorEmail);
            }
        }
    }

    const enableChange = () => {
        const isDisabled_ = !isDisabled;

        if (isDisabled_ && !isDisabled) {
            reset();
        }
        setIsDisabled(!isDisabled);
    }

    return (
        <CardProfileStyled>
            <ButtonStyled onClick={enableChange}>
                {isDisabled ? "Deseja alterar os dados?" : "Cancelar alteração"}
            </ButtonStyled>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>

                    <InputGroupStyled>
                        <LabelOptionStyled htmlFor="access_level">
                            Nível de acesso
                        </LabelOptionStyled>
                        
                        <Field
                            name="access_level"
                            as="select"
                            disabled={isDisabled}
                        >
                            <option value="U">Usuário</option>
                            <option value="O">Operador</option>
                            <option value="A">Administrador</option>
                        </Field>

                        <ErrorMessage
                            name="acess_level"
                            component={ErrorStyled}
                        />
                    </InputGroupStyled>


                    <InputGroupStyled>
                        <LabelRadioStyled>
                            <Field
                                type="radio"
                                name="removed"
                                value="false"
                                disabled={isDisabled}
                            />
                                     Ativo
                        </LabelRadioStyled>

                        <LabelRadioStyled>

                            <Field
                                type="radio"
                                name="removed"
                                value="true"
                                disabled={isDisabled}
                            />
                                    Inativo
                        </LabelRadioStyled>

                        <WarningStyled>
                            {warningRemoved}
                        </WarningStyled>

                        <ErrorMessage
                            name="removed"
                            component={ErrorStyled}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelRadioStyled>
                            <Field
                                type="radio"
                                name="validated"
                                value="true"
                                disabled={validated ? true : isDisabled}
                            />
                                    Validado
                                </LabelRadioStyled>

                        <LabelRadioStyled>

                            <Field
                                type="radio"
                                name="validated"
                                value="false"
                                disabled={validated ? true : isDisabled}
                            />
                                    Desvalidado
                                </LabelRadioStyled>

                        <WarningStyled>{warningValidated}</WarningStyled>
                        <ErrorMessage
                            name="validated"
                            component="span"
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="name">Nome</LabelStyled>
                        <Field
                            name="name"
                            className="inputText"
                            disabled={true}
                        />
                        <ErrorMessage
                            name="name"
                            component={ErrorStyled}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="email">
                            E-mail
                                </LabelStyled>

                        <Field
                            name="email"
                            type="email"
                            className="inputText"
                            disabled={isDisabled}
                        />
                        <WarningStyled>
                            {warningEmail}
                        </WarningStyled>

                        <ErrorMessage
                            name="email"
                            component={ErrorStyled}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="cpf">CPF</LabelStyled>
                        <Field
                            name="cpf"
                            className="inputText"
                            disabled={true}
                        />
                        <ErrorMessage
                            name="cpf"
                            component={ErrorStyled}
                        />
                    </InputGroupStyled>


                    <ButtonStyled hidden={isDisabled} type="submit">
                        Salvar
                            </ButtonStyled>

                </Form>
            </Formik>
        </CardProfileStyled>
    );
}

export default DetailedProfile;