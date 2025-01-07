import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import Chart from "react-apexcharts";

const Modal = (props) => {
    const staticValue = ['premarketChangePercent','postmarketChangePercent',"change", "ch1w", "ch1m", "ch3m", "ch6m", "ch1y", "ch3y", "ch5y", "ch10y", "chYTD"]
    const newDaTA = {
        series: [{
            name: 'change',
            data: staticValue.map((i) => props.data[i] || 0)
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                    color: 'red',
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#9042f5"]
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: staticValue,
            },
            yaxis: {
                title: {
                    text: '% Change'
                }
            },
            fill: {
                type: 'bar',
                opacity: 1,
                colors: ['/losers'].includes(props.location) ? ['#eb0c0c'] : ['#42f554'] 
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "%"
                    }
                }
            }
        },
    }
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={props.open}
            onClose={props.handleClose}
            scroll={'body'}
        >
            <DialogTitle>Symbol : <a style={{ color: 'blue' }} href={`https://www.google.com/search?q=NASDAQ:${props.data.s}`} target="_blank" rel="noreferrer"> {props.data.s} </a> and Company : <a style={{ color: 'blue' }} href={`https://stockanalysis.com/stocks/${props.data.s && props.data.s.substring(1)}/`} target="_blank" rel="noreferrer"> {props.data.n} </a> </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color:'#4260f5'}}>
                    Sector: {props.data.sector}
                </DialogContentText>
                <DialogContentText sx={{color:'#4260f5'}}>
                    Industry: {props.data.industry}
                </DialogContentText>
                <DialogContentText sx={{color:'#4260f5'}}>
                    Current Price : {props.data.price}$ Premarket Price : {props.data.premarketPrice} 
                </DialogContentText>
                <Box>

                    <Chart options={newDaTA.options}
                        series={newDaTA.series}
                        type="bar" />
                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default Modal