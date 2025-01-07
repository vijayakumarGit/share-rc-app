import { Card, CardActionArea, CardContent, InputAdornment, TextField, Typography } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import React, { useRef, useState } from 'react'
import { Box } from '@mui/system';
const colorSymbol = blue[500];
const optionData = [
    { key1: ['Change 1W', 'ch1w', '%'], key2: ['Change 1M', 'ch1m', '%'] },
    { key1: ['Change 1Y', 'ch1y', '%'], key2: ['Change 3Y', 'ch3y', '%'] },
    { key1: ['Change 5Y', 'ch5y', '%'], key2: ['Change YTD', 'chYTD', '%'] },
    { key1: ['Price Target', 'priceTarget', '$'] }]
const MobInput = ({ lable,keyx,handleSave,priceData,data }) => {
    const [isEdit, setEdit] = useState(false);
    const value=useRef(null)
    return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField id="input-with-sx" label={lable} variant="standard" disabled={!isEdit} defaultValue={priceData?.[data.s]?.[keyx]?.value} onChange={(e)=>value.current = e.target.value }   slotProps={{ inputLabel: { shrink: true } }}/>
        {isEdit ? <DoneOutlinedIcon sx={{ color: green[500], mr: 1, my: 0.5 }} onClick={() => {setEdit(false); handleSave({keyx,value:value.current})}} /> : <EditOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => {setEdit(true) }} />}
    </Box>
}

const MobContent = ({ data,handleSave,priceData }) => {
   const additionalProps={
    priceData,
    handleSave,
    data
   }
    return (
        <Card style={{ marginBottom: '1px' }}>
            <CardActionArea>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="h5" component="div" color={colorSymbol}  >
                            <Typography component="div" variant="h5">
                                {data.s?.substring(1)}
                            </Typography>
                        </Typography>
                        <Typography gutterBottom component="div" textAlign="right" color={data.change && parseFloat(data.change) > 0 ? green[500] : red[500]}>
                            <Typography component="div" variant="h5">
                                {data.price}$
                            </Typography>
                            <Typography component="div">
                                {data.change}%
                            </Typography>
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography gutterBottom component="div" >
                            {data.n}
                        </Typography>
                        {data.analystRatings && <Typography gutterBottom component="div"  >
                            Rating : <Typography component="span" color={green[500]}>{data.analystRatings || '-'}</Typography>
                        </Typography>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography component="div">
                            <MobInput key={'x-123'} lable="Best Buy" keyx='bestBuy' {...additionalProps} />
                        </Typography>
                        <Typography gutterBottom component="div" >
                            <MobInput key={'x-1234'} lable="Qty" keyx='qty' {...additionalProps}  />
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography gutterBottom component="div" >
                            <MobInput key={'x-12345'} lable="Buy Price"  keyx='buyPrice' {...additionalProps}  />
                        </Typography>
                        <Typography gutterBottom component="div" >
                            <MobInput lable="Buy Share price" keyx='buySharePrice' {...additionalProps} />
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography gutterBottom component="div" >
                            <MobInput key={'x-123456'} lable="Profit"  keyx='profit' {...additionalProps}  />
                        </Typography>
                        <Typography gutterBottom component="div" >
                            <MobInput key={'x-1234567'} lable="Selling Price"  keyx='sp' {...additionalProps}  />
                        </Typography>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Typography gutterBottom component="div" fontSize="10px">
                            Pre Market
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.premarketChangePercent && parseFloat(data.premarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.premarketPrice}
                            </Typography>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.premarketChangePercent && parseFloat(data.premarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.premarketChange}
                            </Typography>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.premarketChangePercent && parseFloat(data.premarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.premarketChangePercent}%
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography gutterBottom component="div" fontSize="10px">
                            Post Market
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.postmarketChangePercent && parseFloat(data.postmarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.postmarketPrice}
                            </Typography>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.postmarketChangePercent && parseFloat(data.postmarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.postmarketChange}
                            </Typography>
                            <Typography gutterBottom component="div" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data.postmarketChangePercent && parseFloat(data.postmarketChangePercent) > 0 ? green[500] : red[500]}>
                                {data.postmarketChangePercent}%
                            </Typography>
                        </div>
                    </div>
                    {optionData.map((key) => {
                        return (
                            <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography gutterBottom component="span" fontSize="10px" >
                                        {key.key1[0]}
                                    </Typography>
                                    {data[key.key1[1]] && <Typography gutterBottom component="span" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data[key.key1[1]] && parseFloat(data[key.key1[1]]) > 0 ? green[500] : red[500]}>
                                        {data[key.key1[1]]}  {key.key1[2]}
                                    </Typography>}
                                </div>
                                {key.key2 && <div>
                                    <Typography gutterBottom component="span" fontSize="10px">
                                        {key.key2[0]}
                                    </Typography>
                                    {data[key.key2[1]] && <Typography gutterBottom component="span" fontSize="10px" paddingLeft='5px' fontWeight="600" color={data[key.key1[1]] && parseFloat(data[key.key1[1]]) > 0 ? green[500] : red[500]}>
                                        {data[key.key2[1]]}  {key.key2[2]}
                                    </Typography>}
                                </div>}
                            </div>
                        )
                    })}


                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default MobContent