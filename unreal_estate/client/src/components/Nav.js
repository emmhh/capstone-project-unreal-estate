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
var ConfigFile = require('../config');

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

    await fetch(ConfigFile.Config.server + 'user/testlogin',{
      headers: {
        'Authorization': localStorage.getItem('Token'),
      }
    })
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
    await fetch(ConfigFile.Config.server + 'user/logout', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('Token'),
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
      localStorage.removeItem('Token')
      this.setState((previousState) => {
        return {
          drawerOpen: previousState.drawerOpen,
          is_user_logged_in: is_user_logged_in,
        }
      });
      window.location.href = ConfigFile.Config.server + '';
    })
  }

  toggleDrawer = (open) => () => {
    this.setState({
        drawerOpen: open
    })
  }

  render() {
    var is_user_logged_in = this.state.is_user_logged_in;
    let button, profileLink, bookingLink, signUpLink;
    if (is_user_logged_in){
      button =  <Button class='button' onClick={this.logout}>Logout</Button>;

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

      signUpLink = null;

    } else {

      button = <Link to='/login'>
        <Button class='button'>Login</Button>
      </Link>;

      signUpLink = <Link to='/signup' >
        <Button class='button'>Signup</Button>
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
            <Link to='/'>
              <Button class='button' href="/" variant="title" >
                  Unreal Estate
              </Button>
            </Link>
            <div style={{flexGrow: 1}} />
            {signUpLink}
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
                    {is_user_logged_in?
                      <Link to='/AdModule' style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                          <ListItemText primary="My properties" />
                        </ListItem>
                      </Link>
                    :
                      null
                    }
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
