import React, { useState, useEffect, forwardRef } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosServer from "../../services/axiosServer";
import MaterialTable from "material-table";
import DetailProfile from "../DetailedProfile";
import UpdateProperty from "../UpdateProperty";
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
import GoogleMapsVisualization from "../GoogleMapsVisualization";

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

const Table = ({ title, user_id = null }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const tableRef = React.createRef();

    const getProperties = async () => {
        try {
            let res;

            if (!!user_id === false) res = await axiosServer.get("listProperties");
            else res = await axiosServer.get(`listProperties/${user_id}`);
            console.log(res.data);
            setData(res.data);
            setFilteredData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

        getProperties();
    }, []);

    return (
        <>
            <TableContainerStyled>

                <MaterialTable
                    title={title}
                    tableRef={tableRef}
                    options={{
                        search: false,
                        filtering: true
                    }}
                    onFilterChange={_ => {
                        console.log(tableRef?.current?.state?.data);
                        // setFilteredData(!!tableRef && !!tableRef.current ? tableRef.current.state.data : []);
                    }}
                    icons={tableIcons}
                    data={data}
                    columns={[
                        { title: "Nickname", field: "nickname", },
                        { title: "Número", field: "number" },
                        { title: "Cep", field: "cep" },
                        {
                            title: "Imóvel para",
                            field: "contract",
                            lookup: { S: "Venda", R: "Aluguel", A: "Ambos" },
                            // render: rowData => {
                            //     let access_level;

                            //     if (rowData.access_level === "U") access_level = "Usuário";
                            //     if (rowData.access_level === "A") access_level = "Administrador";

                            //     return (<text>{access_level}</text>)
                            // }
                        },
                        { title: "Bairro", field: "district" },
                        {
                            title: "Valor do Aluguel", field: "rent_amount",
                            render: rowData => {

                                return (<text>{rowData.rent_amount / 100}</text>);
                            }
                        },
                        {
                            title: "Valor da Propriedade",
                            field: "property_value",
                            render: rowData => {
                                return (<text>{rowData.property_value / 100}</text>);
                            }
                        },
                    ]}
                    detailPanel={[{
                        tooltip: "Exibir",
                        render: rowData => {

                            return (
                                <UpdateProperty
                                    reset={() => tableRef.current && tableRef.current.onQueryChange()}
                                    user_id={rowData}
                                />
                            );
                        }
                    }]}
                    actions={[
                        {
                            icon: _ => { return (<RefreshStyled>Atualizar</RefreshStyled>); },
                            tooltip: 'Atualizar',
                            isFreeAction: true,
                            onClick: async _ => {
                                try {
                                    await getProperties();
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
                {/* <GoogleMapsVisualization locations={tableRef?.current?.state.data} /> */}
            </TableContainerStyled>
        </>
    );
}


export default Table;