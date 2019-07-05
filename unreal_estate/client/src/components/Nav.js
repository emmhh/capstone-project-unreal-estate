import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

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
              <Typography variant="title" color="inherit">
                  Unreal Estate
              </Typography>
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
