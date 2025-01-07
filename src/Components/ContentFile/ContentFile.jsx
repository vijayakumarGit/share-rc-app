// import { Button } from "@mui/base";
import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios'
import { exportToExcel } from 'react-json-to-excel';
// Theme
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useLocation } from "react-router";
// eslint-disable-next-line import/no-anonymous-default-export
import Modal from '../Modal/Modal';
const Content = ({ rowData,handleModalOpen }) => {
    const containerStyle = useMemo(() => ({
        width: "100%",
        height: '700px',
        marginTop: '30px'
    }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
   
    const [item, setItem] = useState({});
    // Row Data: The data to be displayed.


    const valueCelStyle = (params) => {
        if (params.value > 0) {
            return { color: 'green' }
        }
        return { color: 'red' }
    }

    // Column Definitions: Defines & controls grid columns.
    // rowGroup: true, hide: true
    const [colDefs, setColDefs] = useState([
        { headerName: "S.No", field: 'no', filter: false },
        { headerName: "Symbol", field: 's', },
        { headerName: "Sector", field: 'sector',  },
        { headerName: "Industry", field: 'industry' },
        { headerName: "Company Name", field: 'n', },
        { headerName: "Stock Price", field: 'price', valueFormatter: params => params.value ? '$' + params.value : '', cellStyle: valueCelStyle },
        { headerName: "Day Changes", field: 'change', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },

        { headerName: "Premarket Price", field: 'premarketPrice', valueFormatter: params => params.value ? '$' + params.value : '', cellStyle: valueCelStyle },
        { headerName: "Premarket Price close", field: 'preClose', valueFormatter: params => params.value ? '$' + params.value : '', cellStyle: valueCelStyle },
        { headerName: "Pre market %", field: 'premarketChangePercent', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Postmarket Price", field: 'postmarketPrice', valueFormatter: params => params.value ? '$' + params.value : '', cellStyle: valueCelStyle },
        { headerName: "Post Price Close", field: 'postClose', valueFormatter: params => params.value ? '$' + params.value : '', cellStyle: valueCelStyle },
        { headerName: "Post market Change Percent", field: 'postmarketChangePercent', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },

        { headerName: "Changes 1W", field: 'ch1w', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 1M", field: 'ch1m', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 3M", field: 'ch3m', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 6M", field: 'ch6m', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 1Y", field: 'ch1y', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 5Y", field: 'ch5y', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 10Y", field: 'ch10y', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Changes 15Y", field: 'ch15y', valueFormatter: params => params.value ? params.value + '%' : '', cellStyle: valueCelStyle },
        { headerName: "Volume", field: 'volume' },
        { headerName: "Market Cap", field: 'marketCap' },
        { headerName: "Revenue", field: 'revenue', },
        { headerName: "Revenue Growth", field: 'revenueGrowth', },
        { headerName: "Net Income", field: 'netIncome', },
        { headerName: "FCF", field: 'fcf', },
        { headerName: "Net Cash", field: 'netCash', },
    ]);


    const defaultColDef = {
        filter: "agTextColumnFilter",
        floatingFilter: true,

    };
    const handleClick = (opt1, opt2, opt3) => {
        const url = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=${opt2}&c=no,s,n,change,price,volume,marketCap,lowPrice&cn=100&f=close-over-1,${opt1},volume-over-10000,marketCap-over-1000000&i=stocks`
        axios({
            method: 'get',
            url,
        }).then(function (response) {
            const data = response.data.data.data
            console.log(data, opt3)
            exportToExcel(data, opt3)
        }).catch(function (err) {
            console.log(err)
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const downloadAdd = async (opt1, opt2, opt3) => {
        const gainerDay = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=dec&c=no,s,n,change,price,volume,marketCap&cn=100&f=close-over-1,change-over-0,volume-over-10000,marketCap-over-1000000&i=stocks`
        const loserDay = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=asc&c=no,s,n,change,price,volume,marketCap&cn=100&f=close-over-1,change-under-0,volume-over-10000,marketCap-over-1000000&i=stocks`
        const loserWeek = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=dec&c=no,s,n,ch1w,price,volume,marketCap&cn=100&f=price-over-1,close-over-1,volume-over-10000,marketCap-over-10000000,ch1w-under-0&i=stocks`
        const gainerWeek = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=dec&c=no,s,n,ch1w,price,volume,marketCap&cn=100&f=price-over-1,close-over-1,volume-over-10000,marketCap-over-10000000,ch1w-over-0&i=stocks`
        const gainerMoth = `http://api.stockanalysis.com/api/screener/s/f?m=change&s=asc&c=no,s,n,change,price,volume,marketCap&cn=100&f=close-over-1,change-under-0,volume-over-10000,marketCap-over-1000000&i=stocks`

        const gainers_day = await axios({
            method: 'get',
            url: gainerDay,
        })
        const loser_day = await axios({
            method: 'get',
            url: loserDay,
        })
        const sheets = [{
            sheetName: "gainers",
            details: gainers_day.data.data.data
        }, {
            sheetName: "losers",
            details: loser_day.data.data.data
        }]
        exportToExcel(sheets, `alldata${new Date()}`, true)
    }
    const onGridReady = (gridApi, columnApi,) => {
        // gridApi.api.sizeColumnsToFit();
        // gridApi.api.autoSizeAllColumns();
        gridApi.api.autoSizeAllColumns();

    }
    const handleRowDbClicked = (gridApi) => {
      
        // setModalOpen(true)
        // setItem(gridApi.data)
        handleModalOpen(gridApi.data)
    }
    const gridOptions = {

        autoGroupColumnDef: {
            headerName: 'Sector',//custom header name for group
            pinned: 'left',//force pinned left. Does not work in columnDef
        },
        onGridReady: (params) => params.api.autoSizeAllColumns(),
        isGroupOpenByDefault: (params, index) => {
            return params.rowNode.rowIndex === 1
        },
        onRowDoubleClicked: handleRowDbClicked
    }
    return (
        <div style={containerStyle}>
            <div
                className="ag-theme-quartz-dark" // applying the Data Grid theme
                style={{ height: '100%', width: "100%" }} // the Data Grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    enableCellTextSelection
                    ensureDomOrder
                    groupDisplayType={'singleColumn'}
                    autoSizeStrategy={{
                        type: "fitCellContents",
                    }}
                    gridOptions={gridOptions}
                />
            </div>
          


            {/* <div>
                Chart Data
            </div> */}
            {/* Content<br />
            <br />
            <Button onClick={() => handleClick("change-over-0", "dec", "gain")}>Get stock data Top Gainers</Button>
            <br />
            <br />
            <br />
            <Button onClick={() => handleClick("change-under-0", "asc", "loser")}>Get stock data Losers </Button>
            <br />
            <br />
            <br />
            <Button onClick={() => downloadAdd("change-under-0", "asc", "loser")}>Get stock All Data </Button> */}

        </div>
    )
}

export default React.memo(Content);