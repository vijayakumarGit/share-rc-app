import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

const ChartAnalysis = ({ rowData }) => {
    const [orgData, setOrgData] = useState([]);
    const staticValue = ["change", "ch1w", "ch1m", "ch3m", "ch6m", "ch1y", "ch3y", "ch5y", "ch10y", "chYTD","premarketChangePercent","postmarketChangePercent"]
    const newDaTA = {
        series: [{
            name: 'change',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'ch1w',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'ch1m',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
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
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
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
                opacity: 1
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

    useEffect(() => {
        const splitedData = rowData.reduce((preValue, currentValue) => {
            preValue[currentValue.sector] ? preValue[currentValue.sector].push(currentValue) : preValue[currentValue.sector] = [currentValue]
            return preValue
        }, {})
        let datax = [];
        let modifiedValue={};
        Object.keys(splitedData).forEach((key)=>{
            if(splitedData[key].length > 5){
                let newKey=0;
                let tempArray=[]
                splitedData[key].forEach((item)=>{
                    tempArray.push(item)
                    if(tempArray.length && tempArray.length % 5 === 0){
                        modifiedValue[key+'_'+newKey]=tempArray;
                        tempArray=[]
                        newKey=newKey+1
                    }
                })
                if(tempArray.length){
                    newKey=newKey+1
                    modifiedValue[key+'_'+newKey]=tempArray;
                }
            }else{
                modifiedValue[key]=splitedData[key];
            }
        })
        for (let sector in modifiedValue) {
            let companyArray = {}
            let optCompany = []
            let orgArray = []
            let tempCompany = []
            let tempArray = []
            modifiedValue[sector].forEach((company) => {
                staticValue.forEach((val, index) => {
                    if (!companyArray[val]) {
                        companyArray[val] = []
                    }
                    let orgValue = company[val] ? company[val] : 0;
                    companyArray[val].push(orgValue)
                })
                tempCompany.push(company.n)
            })
            Object.keys(companyArray).forEach((key) => {
                tempArray.push({
                    name: key,
                    data: companyArray[key]
                })
            })
            datax.push({ company: tempCompany, optCompany: tempArray, sector })
        }
        setOrgData(datax)
        // for(let sector in splitedData){
            
        // }

    }, [rowData])


    return (
        <div>
            {orgData.map((item) => {
                return (
                    <Chart options={{
                        ...newDaTA.options, xaxis: {
                            categories: item.company,
                        },
                        title: {
                            text: item.sector,
                            align: 'left'
                        }
                    }}
                        series={item.optCompany} type="bar" />
                )
            })}
            {/* <Chart options={newDaTA.options} series={newDaTA.series} type="bar" height={500} /> */}
        </div>
    )
}
export default ChartAnalysis;