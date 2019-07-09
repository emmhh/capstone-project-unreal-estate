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
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (open) => () => {
    this.setState({
        drawerOpen: open
    })
  }

  render() {
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
            <Button href="/signup" color="inherit">Signup</Button>
            <Button href="/login" color="inherit">Login</Button>
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
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                      <ListItem button>
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </Link>
                    <Link to='/bookings' style={{ textDecoration: 'none' }}>
                      <ListItem button>
                        <ListItemIcon>
                          <Book />
                        </ListItemIcon>
                        <ListItemText primary="Bookings" />
                      </ListItem>
                    </Link>
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
