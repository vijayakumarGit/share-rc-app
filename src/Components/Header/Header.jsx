import React from 'react';
import { amber } from '@mui/material/colors';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import DehazeIcon from '@mui/icons-material/Dehaze';
import MenuIcon from '@mui/icons-material/Menu';
import './header.css';
import { AppBar, Hidden, IconButton, Switch, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = (props) => {

    return (
        <AppBar>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{
                        marginRight: 1,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography noWrap component="span" fontSize={28} fontWeight={500} >
                    7
                </Typography>
                <StarHalfRoundedIcon sx={{ color: amber[500],fontSize: '35px', marginTop:'-24px', marginLeft:'-10px' }} />
                <Button variant="contained" color="success" sx={{
                        marginRight: 1,
                    }} >
                <Link to={'/watch-list'}> 
                Watch List
                </Link>
                </Button>
                <Hidden smDown>
                <Button variant="contained" color="success" sx={{
                        marginRight: 1,
                    }} >
                
                <Link to={'/gainers'}> 
                Gainers
                </Link>
                </Button>
                <Button variant="contained" color="error" >
                <Link to={'/losers'}> 
                Losers
                </Link>
                </Button>
                <Button variant="contained" color="error"  sx={{
                        marginLeft: 1,
                    }}>
                <Link to={'/active'}> 
                Active
                </Link>
                </Button>
                <Typography noWrap component="span"  sx={{
                        marginLeft: 1,
                    }} >
                  Table
                </Typography>
                <Switch color="warning"  onChange={props.handleChange} />
                <Typography noWrap component="span" >
                  Chart
                </Typography>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default Header;