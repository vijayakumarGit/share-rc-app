import React from 'react';
import styled from 'styled-components';
import mleft from '../../assets/images/mleft.png';
import mright from '../../assets/images/mright.png';
import Android from '../../assets/images/Android.png';
import Apple from '../../assets/images/Apple.png';
import {Typography} from '@mui/material';

const TextLable=styled(Typography)((props)=>({
'&&':{
fontWeight:props.bold || 'unset',
marginBottom:props.bottom || 'unset'
}
}))

const LandingPage = () => {
    return (<Container>
        <LeftContainer>
            <img src={mright} alt="rightImage" style={{
                position: 'relative',
                top: 128,
                left: 70
            }} />
            <img src={mleft} alt="leftImage" style={{
                position: 'absolute', left: 305,
                top: 335
            }} />
        </LeftContainer>
        <RightContainer>
            <TextContainer>
                <Typography fontSize='22px' fontWeight='500' mb={3}>
                    Welcome [First Name]!
                </Typography>
                <Typography mb={4} >
                    This website will be enabled on your hire date.
                </Typography>
                <Typography sx={{width:'375px'}} mb={13}>
                    You may complete your onboarding activities now by downloading the Me@Campus mobile app.
                </Typography>
                <Typography fontWeight='500'>
                    Scan a QR code to download Me@Campus
                </Typography>
            </TextContainer>
            <QRContainer>
                <div>
                <Typography bold='200' bottom='15px'>
                   iOS
                </Typography>

                    <img src={Apple} alt="ios"/>
                </div>
                <div>
                <Typography fontWeight='200' bottom='15'>
                Andriod
                </Typography>
                <img src={Android} alt="andriod" />
                </div>
            </QRContainer>
        </RightContainer>
    </Container>)
}


export const Container = styled.div`
    display: flex;
    position: fixed;
    height: 100%;
    width: 100%;  
`

export const LeftContainer = styled.div`
width:50%;
background-color: #041E42;
`
export const LeftImage = styled.div`
background-image: url(${mleft});
  background-repeat: no-repeat;
  background-size: auto;
`
export const RightContainer = styled.div`
width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
export const TextContainer = styled.div`
text-align: center;
`
export const TextField = styled.div`
font-size: ${({ size }) => size ? size + 'px' : 'unset'};
    font-weight: ${({ bold }) => bold ? bold : 'unset'};
    margin-bottom: ${({ bottom }) => bottom + 'px'};
`
export const QRContainer = styled.div`
text-align: center;
display: flex;
margin-top: 32px;
width: 450px;
justify-content: space-between;
`

export default LandingPage;
