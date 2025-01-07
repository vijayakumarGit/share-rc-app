import { Avatar, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'


const FilterDuration = (props) => {
    const staticValue = ["change", "ch1w", "ch1m", "ch3m", "ch6m", "ch1y", "ch3y", "ch5y", "ch10y", "chYTD","premarketChangePercent","postmarketChangePercent"]
    const limit = ["100", "200", "500", "800", "1000", "1500", "2000","3000","10000"]
    const [duration, setDuration] = useState('');
    const handleChange = (event) => {
        setDuration(event.target.value);
        if (event.target.value) {
            let additonalObj = {}
            if (['/losers'].includes(props.location)) {
                let val;
                if (event.target.value === 'change') {
                    val = { opt1: `${event.target.value}-under-0`, opt2: event.target.value }
                } else if(event.target.value === 'postmarketChangePercent'){
                    val = { opt1: `postmarketPrice-over-1,postmarketChangePercent-over-0,postClose-over-1`, opt2: event.target.value }
                } else if(event.target.value === 'premarketChangePercent'){
                    val = { opt1: `price-over-1,preClose-over-1,premarketChangePercent-under-0`, opt2: event.target.value }
                }  else {
                    val = { opt1: `price-over-1,${event.target.value}-under-0`, opt2: event.target.value }
                }
                props.updateValue(val)
            } else {
                let val;
                if (event.target.value === 'change') {
                    val = { opt1: `${event.target.value}-over-0`, opt2: event.target.value }
                } else if(event.target.value === 'postmarketChangePercent'){
                    val = { opt1: `postmarketPrice-over-1,postmarketChangePercent-over-0,postClose-over-1`, opt2: event.target.value }
                } else if(event.target.value === 'premarketChangePercent'){
                    val = { opt1: `premarketPrice-over-1,preClose-over-1,premarketChangePercent-over-0`, opt2: event.target.value }
                }  else {
                    val = { opt1: `price-over-1,${event.target.value}-over-0`, opt2: event.target.value }
                }
                props.updateValue(val)
            }
        }
    }
    return (<div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">Duration</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={duration}
                onChange={handleChange}
                label="Duration"
            >

                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {staticValue.map((v) => <MenuItem value={v}>{v}</MenuItem>)}


            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">Limit</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
          
                onChange={props.handleLimit}
                label="Limit"
            >

                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {limit.map((v) => <MenuItem value={v}>{v}</MenuItem>)}
            </Select>
        </FormControl>
        {/* <Stack direction="coloumn" spacing={2}> */}
            {props?.rowData?.slice(0,9)?.map((v)=><Chip variant="outlined" color={['/losers'].includes(props.location) ? 'error' :  "success"}  label={`${v.s} ${v.sector} ${v[duration || 'change']}%`} onClick={()=>props.handleClick(v)} />)}
        {/* </Stack> */}

    </div>)
}
export default FilterDuration