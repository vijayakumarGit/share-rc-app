import React, { useContext, useEffect, useState } from "react";
import './learning.css'
import Header from '../Header/Header';
import SideNav from "../SideNav/SideNav";
import Content from "../ContentFile/ContentFile"
import ChartAnalysis from "../ChartAnalysis/ChartAnalysis";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import FilterDuration from '../FilterDuration/FilterDuration';
import { LoaderContext } from "../../App";
import Modal from '../Modal/Modal';
import { symbols } from "../constant";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Hidden, TextField, Typography } from "@mui/material";
import MobContent, { MobInput } from "../MobContent/MobContent";
const instance = axios.create({ baseURL: 'https://share-node-app-testphase.up.railway.app' })
export const Learning = () => {
    const { toggleLoader } = useContext(LoaderContext)
    const location = useLocation();
    const [rowData, setRowData] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [showTable, setShowTable] = useState(true);
    const [limit, setLimt] = useState('100');
    const [modalOpen, setModalOpen] = useState(false)
    const [item, setItem] = useState({});
    const [filterValue, setFilterValue] = useState([]);
    const [shareData, setShareData] = useState({});
    let cacheData = '';
    let optParams = {
        opt1: 'change-over-0', opt2: 'desc', opt3: 'gain'
    }
    let isActive = false
    useEffect(() => {
        isActive = false;
        if (['/losers'].includes(location.pathname)) {
            optParams = {
                opt1: 'change-under-0', opt2: 'asc', opt3: 'loser'
            }
        } else if (['/gainers'].includes(location.pathname)) {
            optParams = {
                opt1: 'change-over-0', opt2: 'desc', opt3: 'gain'
            }
        } else if (['/watch-list'].includes(location.pathname)) {
            return getWatchListData()
        } else {
            isActive = true
        }
        // getData()
        getWatchListData()
    }, [location.pathname])
    const getWatchListData = () => {
        // const symbols='$NVDA,$BURU'
        const watchListUrl = `https://api.stockanalysis.com/api/watchlist/?symbols=${symbols}&columns=price,change,volume,premarketPrice,premarketChangePercent,postmarketPrice,postmarketChangePercent,marketCap,peRatio,earningsDate,low52ch,high52ch,compactPrice,compactChange,dps,dividendYield,dividendGrowth,exDivDate,paymentDate,payoutRatio,buybackYield,totalReturn,ch1w,ch1m,chYTD,ch1y,ch3y,ch5y,priceTarget,priceTargetChange,analystRatings,revenueNextYear,epsNextYear,earningsTime,earningsRevenueEstimate,earningsRevenueActual,earningsEpsEstimate,earningsEpsActual,earningsRevenueEstimateGrowth,earningsRevenueActualGrowth,earningsEpsEstimateGrowth,earningsEpsActualGrowth,revenue,revenueGrowth,eps,epsGrowth,fcf,fcfGrowth,ch15y,ch6m,chg,premarketChange,postmarketChange`
        toggleLoader(true)
        axios({
            method: 'get',
            url: watchListUrl,
        }).then((respx) => {

            instance({
                method: 'get',
                url: '/read-data'
            }).then((resp) => {
                setPriceData(resp.data)
                setRowData(respx.data.data)
                const shareData = Object.keys(resp.data).reduce((preValue, key) => {
                    return {
                        ttPrice: parseFloat(preValue.ttPrice + (resp.data[key]?.buySharePrice?.value || 0)),
                        ttShare: parseFloat(preValue.ttShare + (resp.data[key]?.qty?.value || 0)),
                        ttProfit: 0,
                        noOfCompany: resp.data[key]?.qty?.value ? preValue.noOfCompany + 1 : preValue.noOfCompany
                    }
                }, { ttPrice: 0, ttShare: 0, ttProfit: 0, noOfCompany: 0 })
                setShareData(shareData)
                toggleLoader(false)
            }).catch(() => {
                toggleLoader(false)
            })

        }).catch(() => {
            toggleLoader(false)
        })


    }

    const getData = (optParams2, limitx) => {
        const gainer = `http://api.stockanalysis.com/api/screener/s/f?m=${optParams2?.opt2 || 'change'}&s=${optParams.opt2}&c=no,s,n,premarketChangePercent,premarketPrice,postmarketChangePercent,postmarketPrice,postClose,preClose,change,price,volume,marketCap,netCash,netIncome,fcf,revenueGrowth,revenue,sector,industry,ch1w,ch1m,chYTD,ch3m,ch6m,ch1y,ch3y,ch5y,ch10y,ch15y,ch20y&cn=${limitx || limit || '100'}&f=close-over-1,${optParams2?.opt1 || optParams.opt1}&i=stocks`
        const active = `https://api.stockanalysis.com/api/screener/s/f?m=volume&s=desc&c=no,s,n,premarketChangePercent,premarketPrice,postmarketChangePercent,postmarketPrice,postClose,preClose,change,price,volume,marketCap,netCash,netIncome,fcf,revenueGrowth,revenue,sector,industry,ch1w,ch1m,chYTD,ch3m,ch6m,ch1y,ch3y,ch5y,ch10y,ch15y,ch20y&cn=${limitx || limit || '100'}&f=price-over-1&p=1&i=stocks`
        cacheData = optParams2;
        setLimt(limitx)
        toggleLoader(true)
        axios({
            method: 'get',
            url: isActive ? active : gainer,
        }).then((resp) => {
            // console.log(resp.data.data.data);
            setRowData(resp.data.data.data)
            toggleLoader(false)
        }).catch(() => {
            toggleLoader(false)
        })
    }
    const handleChange = () => {
        setShowTable(!showTable)
    }
    const handleModalOpen = (item) => {
        setItem(item)
        setModalOpen(true)
    }
    const handleSaveApi = (data, val) => {
        let updatePriceData = { ...priceData }
        if (data) {
            if (!updatePriceData[data.s]) {
                updatePriceData[data.s] = {}
            }
            updatePriceData[data.s][val.keyx] = { value: val.value, date: new Date() };
        } else {
            updatePriceData[val.keyx] = { value: val.value, date: new Date() };
        }
        // if(updatePriceData[data.s]['qty'] && updatePriceData[data.s]['buyPrice']){
        //     updatePriceData[data.s]['buySharePrice'] = 
        // }
        toggleLoader(true)
        instance.post('/update-data', updatePriceData).then((resp) => {
            toggleLoader(false)
        }).catch(() => {
            toggleLoader(false)
        })
    }

    // onClick={()=>window.open(`https://uk.finance.yahoo.com/quote/${data.s.substring(1)}/`)}
    return (
        <main id="learning_container">
            <Header handleChange={handleChange} />
            <article>
                {/* <Routes>
                    <Route path="/" element={() => <Navigate to="/gainers" />} />
                    <Route path="/gainers" element={<Content />} />
                    <Route path="/losers" element={<Content />} />
                </Routes> */}
                {/* <BrowserRouter>
                    <Router
                        path="/"
                        element={<Content />}
                    />
                </BrowserRouter> */}
                <Hidden smDown>
                    <FilterDuration handleClick={handleModalOpen} updateValue={getData} location={location.pathname} handleLimit={(e) => getData(cacheData, e.target.value)} rowData={rowData} />

                    {showTable ? <Content rowData={rowData} handleModalOpen={handleModalOpen} /> : <ChartAnalysis rowData={rowData} />}
                </Hidden>
                <Hidden smUp>

                    <div style={{ position: 'fixed', width: '100%', 'background-color': '#f6f6f6', zIndex: 999 }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">TT Value</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <div>
                                    <Typography >
                                        Total Price : {shareData?.ttPrice}
                                    </Typography>
                                    <Typography >
                                        Total Share : {shareData?.ttShare}
                                    </Typography>
                                    <Typography >
                                        Total Profit : {shareData?.ttProfit}
                                    </Typography>
                                    <Typography >
                                        No of company : {shareData?.noOfCompany}
                                    </Typography>
                                    <div style={{ paddingBottom: '20px' }}>
                                        {priceData?.ttSgd?.value && <MobInput defaultValue={priceData?.ttSgd?.value} lable={'Total Price SGD'} keyx={'ttSgd'} key={'x-12345678'} handleSave={(v) => handleSaveApi(undefined, v)} />}
                                    </div>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                        
                    </div>
                    <div style={{ marginTop: '50px' }}>
                    <Autocomplete
                            multiple
                            options={symbols.split(',')}
                            id="auto-complete"
                            autoComplete
                            includeInputInList
                            getOptionLabel={(option) => option.substring(1)}
                            onChange={(event, newValue) => {
                                setFilterValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter by sumbol" variant="standard" />
                            )}

                        />
                        {rowData.filter(v => filterValue.length > 0 ? filterValue.includes(v.s) : true).map((data, i) => <div><MobContent data={data} handleSave={(val) => { handleSaveApi(data, val) }} priceData={priceData} key={'abc' + i} /></div>)}

                    </div>
                </Hidden>

                {/* <ChartAnalysis /> */}
            </article>
            <aside>
                <SideNav />
            </aside>
            <Modal open={modalOpen} handleClose={() => { setModalOpen(false) }} data={item} location={location.pathname} />
            {/* <footer>
                <span><small>
                    Copyright
                </small> &copy; <small>2024 Medha Group of Company</small></span>
            </footer> */}
        </main>
    )
}
export default Learning;