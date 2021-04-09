import React, { useState, forwardRef } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosServer from "../../services/axiosServer";
import MaterialTable from "material-table";
import CreateEvaluation from "../../components/CreateEvaluation";

import {
    Layout,
    ContentStyled
} from "../../layout/privateLayout";

import {
    TitleStyled,
    TableContainerStyled,
    PainelContainerStyled,
    RefreshStyled,
    LabelStyled,
    LabelRadioStyled,
    LabelOptionStyled,
    InputGroupStyled,
    InputRadioGroupStyled,
    ErrorStyled,
    WarningStyled,
    ButtonStyled
} from "./layout";

import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from "@material-ui/icons";

import { formatCpf } from "../../helpers/userValidation";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (<ChevronRight {...props} ref={ref} />)),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = ({ title }) => {
    const tableRef = React.createRef();
    const [clearFilters, setClearFilters] = useState(true);

    return (
        <TableContainerStyled>

            <MaterialTable
                title={title}
                tableRef={tableRef}
                options={{
                    search: false,
                    filtering: true
                }}
                icons={tableIcons}
                data={
                    async query => {

                        let filters = [];

                        if (query.filters.length > 0 && !clearFilters) {
                            filters = query.filters.map(element => {

                                if (element.field === "access_level"
                                    && !Array.isArray(element.value)) {
                                    return { field: element.column.field, value: [element.value] };
                                }
                                return { field: element.column.field, value: element.value };
                            });
                        } else {
                            query.filters = [];
                        }

                        setClearFilters(false);
                        const response = await axiosServer.get("/getEvaluations"
                            , {
                                params: {
                                    page: query.page,
                                    pageSize: query.pageSize,
                                    filters: filters
                                }
                            }
                        );

                        return ({
                            data: response.data.users,
                            page: query.page,
                            totalCount: response.data.totalCount
                        });
                    }
                }
                columns={[
                    // { title: "Nome", field: "name" },
                    { 
                        title: "CPF", 
                        field: "cpf",
                        render: rowData => {
                            if(rowData.cpf === null){
                                return "";
                            }
                            return (formatCpf(rowData.cpf));
                        } 
                    },
                    { title: "E-mail", field: "email" },
                    { title: "Título", field: "title" },
                    // {
                    //     title: "Nível de acesso",
                    //     field: "access_level",
                    //     lookup: { A: "Administrador", O: "Operador", U: "Usuário" },
                    //     render: rowData => {
                    //         let access_level;

                    //         if (rowData.access_level === "U") access_level = "Usuário";
                    //         if (rowData.access_level === "O") access_level = "Operador";
                    //         if (rowData.access_level === "A") access_level = "Administrador";

                    //         return (<text>{access_level}</text>)
                    //     }
                    // },
                    {
                        title: "Visualizado",
                        field: "viewed",
                        lookup: { 0: "Não visualizado", 1: "Visualizado"},
                        render: rowData => {
                            let viewed;

                            if (rowData.viewed === 0) viewed = "Não visualizado";
                            else if (rowData.viewed === 1) viewed = "Visualizado";
                            
                            return (<text>{viewed}</text>)
                        }
                    }
                ]}
                detailPanel={[{
                    tooltip: "Exibir",
                    render: rowData => {

                        return (
                            <PainelContainerStyled>
                                <CreateEvaluation
                                    reset={() => tableRef.current && tableRef.current.onQueryChange()}
                                    evaluation_id={rowData.evaluation_id}
                                />
                            </PainelContainerStyled>
                        );
                    }
                }]}
                actions={[
                    {
                        icon: _ => { return (<RefreshStyled>Atualizar</RefreshStyled>); },
                        tooltip: 'Atualizar',
                        isFreeAction: true,
                        onClick: _ => tableRef.current && tableRef.current.onQueryChange()
                    }
                ]}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Nenhum registro para exibir'
                    },
                    toolbar: {
                        searchTooltip: 'Pesquisar'
                    },
                    pagination: {
                        labelRowsSelect: 'linhas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primeira página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página'
                    }
                }}
            />
        </TableContainerStyled>
    );
}


export default Table;