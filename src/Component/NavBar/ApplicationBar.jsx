import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, List, ListItem, ListItemText, Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useRefContext } from '../../Provider/RefProvider';
import useWindowDimensions from '../../Hook/useWindowDimensions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
import styles from './application-bar.module.scss';

const useStyles = makeStyles({
  paper: {
    background: 'black'
  },
  root: {
  },
  appBar: {
    background: 'black'
  },
  list: {
    color: 'white'
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
  }
});

const ApplicationBar = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { refs, displayedItemList, setDisplayedItemList } = useRefContext();
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, signOut } = useAuth();

  useEffect(() => {
    if(displayedItemList.length > 0) {
      setSelectedItem(displayedItemList[0]);
    } else {
      setSelectedItem('');
    }
  }, [displayedItemList, setDisplayedItemList]);

  const toggleDrawer = (open) => (event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleItemClick = (itemName) => () => {
    if(!isHome()) {
      navigate('/');
    }
    scrollToDiv(itemName, 64);
  };

  const isHome = () => {
    return '/' === loc.pathname;
  };

  const scrollToDiv = (refName, offset) => {
    if(refs.length === 0) {
      return;
    }
    const ref = refs.find(elm => elm.key === refName).ref;
    // offset for the appBar
    const top = ref.current.offsetTop - offset;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAnchorEl(null);
    } catch (e) {
      console.log('error while signing out!', e);
    }
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.list}
    >
      <List>
        <ListItem button key="Home" onClick={()=> scrollToDiv('home', 56)}>
          <ListItemText primary="HOME" />
        </ListItem>
        <ListItem button key="MENU" onClick={()=> scrollToDiv('menu', 56)}>
          <ListItemText primary="MENU" />
        </ListItem>
        <ListItem button key="ABOUT" onClick={()=> scrollToDiv('about', 56)}>
          <ListItemText primary="ABOUT" />
        </ListItem>
        <ListItem button key="CONTACT" onClick={()=> scrollToDiv('contact', 56)}>
          <ListItemText primary="CONTACT" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolBar}>
          <div onClick={handleItemClick('home')}>
            <div className={styles.pageName}>
              Food Truck
            </div>
          </div>
          { width <= 768 && 
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={isDrawerOpen} onClose={toggleDrawer(false)} classes={{ paper: classes.paper }} className={classes.drawer}>
              {list()}
            </Drawer>
          </>
          } 
          { width > 768 &&
            <div className={styles.navBarItems}>
              <div className={styles.item} onClick={handleItemClick('home')} style={{cursor: 'pointer', color: selectedItem === 'home' ? 'blue' : 'white'}} >
                HOME
              </div>
              {isHome() &&
                <>
                  <div className={styles.item} onClick={handleItemClick('menu')} style={{cursor: 'pointer', color: selectedItem === 'menu' ? 'blue' : 'white'}}>
                    MENU
                  </div>
                  <div className={styles.item} onClick={handleItemClick('about')} style={{cursor: 'pointer', color: selectedItem === 'about' ? 'blue' : 'white'}}>
                    ABOUT
                  </div>
                  <div className={styles.item} onClick={() => navigate('/contact')} style={{cursor: 'pointer', color: selectedItem === 'contact' ? 'blue' : 'white'}}>
                    CONTACT
                  </div>
                </>
              }
            </div>
          }
          {currentUser && 
            <div className="account-button-wrapper">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                <MenuItem onClick={() => navigate('/admin')}>Admin Dashboard</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

ApplicationBar.propTypes = {
  location: PropTypes.object
};

export default ApplicationBar;