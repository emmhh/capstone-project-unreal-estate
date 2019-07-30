import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Book from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../css/Nav.css';
class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
        drawerOpen: false,
        is_user_logged_in: false,
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.checkState = this.checkState.bind(this);
    this.logout = this.logout.bind(this);
    this.checkState();
  }

  checkState = async function () {
    
    await fetch('http://127.0.0.1:8000/user/testlogin')
      .then((resultLogin) => {
        return resultLogin.json()
      })
      .then((responce) => {
        // console.log(resultLogin.context);
        var is_user_logged_in;
        if (responce && responce.user_logged_in) {
          is_user_logged_in = true;
        } else {
          is_user_logged_in = false;
        }
        localStorage.setItem('is_user_logged_in', is_user_logged_in);
        this.setState((previousState) => {
          return {
            drawerOpen: previousState.drawerOpen,
            is_user_logged_in: is_user_logged_in,
          }
        });
      });
  }

  logout = async function () {
    await fetch('http://127.0.0.1:8000/user/logout', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then((responce) => {
      return responce.json();
    })
    .then((responce) => {
      var is_user_logged_in;
      if (responce && responce.user_logged_in) {
        is_user_logged_in = true;
      } else {
        is_user_logged_in = false;
      }
      localStorage.setItem('is_user_logged_in', is_user_logged_in);
      this.setState((previousState) => {
        return {
          drawerOpen: previousState.drawerOpen,
          is_user_logged_in: is_user_logged_in,
        }
      });
    })
  }

  toggleDrawer = (open) => () => {
    this.setState({
        drawerOpen: open
    })
  }

  render() {
    var is_user_logged_in = this.state.is_user_logged_in;
    let button, profileLink, bookingLink;
    if (is_user_logged_in){
      button =  <Button onClick={this.logout}>Logout</Button>;
      
      profileLink = <Link to='/profile' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>;
      
      bookingLink = 
        <Link to='/mybookings' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItem>
        </Link>;
    } else {
      button = <Link to='/login'>
        <Button >Login</Button>
      </Link>;
      profileLink = null;
      bookingLink = null;
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
              <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
              </IconButton>
            <Button href="/" variant="title" color="inherit">
                Unreal Estate
            </Button>
            <div style={{flexGrow: 1}} />
            <Link to='/signup' >
              <Button >Signup</Button>
            </Link>
            {button}
          </Toolbar>
        </AppBar>
        <SwipeableDrawer open={this.state.drawerOpen}
              onClose={this.toggleDrawer(false)}
              onOpen={this.toggleDrawer(true)}>
          <div tabIndex={0} role="button"
                  onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
              <div style={{width: '250px'}}>
                  <List>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                      <ListItem button>
                          <ListItemIcon>
                              <HomeIcon/>
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                      </ListItem>
                    </Link>
                    <Link to='/AdModule' style={{ textDecoration: 'none' }}>
                      <ListItem button>
                          <ListItemIcon>
                              <HomeIcon/>
                          </ListItemIcon>
                        <ListItemText primary="Become a host" />
                      </ListItem>
                    </Link>
                    {profileLink}
                    {bookingLink}
                  </List>
                  <Divider />
              </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }

}

export default Nav
