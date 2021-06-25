import React, { useState, useEffect, forwardRef } from "react";
import axiosServer from "../../services/axiosServer";
import MaterialTable from "material-table";
import DetailProfile from "../../components/DetailedProfile";
import {
    TableContainerStyled,
    PainelContainerStyled,
    RefreshStyled,
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
    const [data, setData] = useState([]);

    const getUsers = async () => {
        try {
            const res = await axiosServer.get("getUsers");
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

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
                data={data}
                columns={[
                    { title: "Nome", field: "name" },
                    {
                        title: "CPF",
                        field: "cpf",
                        render: rowData => {
                            if (rowData.cpf === null) {
                                return "";
                            }
                            return (formatCpf(rowData.cpf));
                        }
                    },
                    { title: "E-mail", field: "email" },
                    {
                        title: "Nível de acesso",
                        field: "access_level",
                        lookup: { A: "Administrador", U: "Usuário" },
                        render: rowData => {
                            let access_level;

                            if (rowData.access_level === "U") access_level = "Usuário";
                            if (rowData.access_level === "A") access_level = "Administrador";

                            return (<text>{access_level}</text>)
                        }
                    },
                    {
                        title: "Logado pela",
                        field: "loggedWith",
                        lookup: { api: "plataforma", google: "Google" },
                        render: rowData => {
                            let loggedWith;

                            if (rowData.loggedWith === "api") loggedWith = "Plataforma";
                            else loggedWith = "Google";

                            return (<text>{loggedWith}</text>)
                        }
                    }
                ]}
                detailPanel={[{
                    tooltip: "Exibir",
                    render: rowData => {

                        return (
                            <PainelContainerStyled>
                                <DetailProfile
                                    reset={async () => { await getUsers() }}
                                    user_id={rowData.id}
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
                        onClick: async () => { await getUsers() }
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