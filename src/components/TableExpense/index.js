import React, { useState, useEffect, forwardRef } from "react";
import { useHistory } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosServer from "../../services/axiosServer";
import MaterialTable from "material-table";
import UpdateExpense from "../UpdateExpense";
import {
    TableContainerStyled,
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

const formatter = (new Intl.DateTimeFormat('pt-BR'));
const TableExpense = ({ title, id }) => {
    const tableRef = React.createRef();
    const [data, setData] = useState([]);
    const history = useHistory();

    const getExpenses = async () => {
        try {
            const res = await axiosServer.get(`listExpenses2/${id}`);
            console.log(id, res.data, res.data.expenses);
            setData(res.data.expenses);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getExpenses();
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
                    { title: "Título da despesa", field: "nickname" },
                    {
                        title: "Valor da despesa", field: "value", render: rowData => {
                            return (<text>{rowData.value / 100}</text>);
                        }
                    },
                    { title: "Descrição", field: "description" },
                    {
                        title: "Data do gasto", field: "expense_date", render: rowData => {
                            // return (<text>{formatter.format(rowData.expense_date)}</text>)
                            const d = new Date(rowData.expense_date);
                            return (<text>{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}</text>)
                        }
                    },
                ]}
                detailPanel={[{
                    tooltip: "Exibir",
                    render: rowData => {

                        return (
                            <UpdateExpense
                                reset={() => tableRef.current && tableRef.current.onQueryChange()}
                                params={rowData}
                            />
                        );
                    }
                }]}
                actions={[
                    {
                        icon: _ => { return (<RefreshStyled>Criar Despesa</RefreshStyled>); },
                        tooltip: 'Criar Despesa',
                        isFreeAction: true,
                        onClick: _ => {
                            try {
                                history.push(`/CreateExpense/${id}`);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    },
                    {
                        icon: _ => { return (<RefreshStyled>Atualizar</RefreshStyled>); },
                        tooltip: 'Atualizar',
                        isFreeAction: true,
                        onClick: async _ => {
                            try {
                                await getExpenses();
                            } catch (e) {
                                console.log(e);
                            }
                        }
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


export default TableExpense;