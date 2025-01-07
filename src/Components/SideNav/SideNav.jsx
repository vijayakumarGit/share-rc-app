import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const SideNav = () => {
    const open = false
    const handleClose=()=>{
        
    }
    return (
  
        <SwipeableDrawer
        anchor={'left'}
        open={open}
        onClose={handleClose}
      >
             <List component="nav"  sx={{ width: '100%'}}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }} selected>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
      </SwipeableDrawer>
    )
}
export default SideNav;