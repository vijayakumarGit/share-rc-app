import React from 'react';
import phone_lg from '../../assets/images/phone_lg.png';
import phone_md from '../../assets/images/phone_md.png';
import logo_product_lg from '../../assets/images/logo_product_lg.png';
import logo_product_md from '../../assets/images/logo_product_sm.png';
import Android from '../../assets/images/Android.png';
import Apple from '../../assets/images/Apple.png';
import apple_logo from '../../assets/images/apple_logo.png';
import google_play_logo from '../../assets/images/google_play_logo.png';
import { Box, Button, Grid, Hidden, Typography } from '@mui/material';
// import {
//   getUserState,
//   getCCMState,
//   getUserRbac,
//   getOriginalUserState,
// } from '@homeoffice-web/web-utils';
// import { retrieveUserData } from '@homeoffice-web/user-service';

// import { useSelector } from '@xarc/react-redux';

const LandingPage = () => {
  // const userState = useSelector(getUserState);
  // console.log(userState);
  const filter='test'
  const data=[{name:'test'},{name:'saurabh'},{name:'sharama'},{name:'srini'},{name:'payroll'},{name:'bulk uobsen'}]
  console.log(data.filter((item) =>{ return item.name.includes(filter) }))
  return (
    <Grid container style={{ minHeight: '100vh' }}>
     {data.filter((item)=>{
       return item.name.includes(filter) && <div>{item.name}</div>
     })}
    </Grid>
  );
};

export default LandingPage;
