import React, { Component } from 'react';
import Toolbar from '../../business/Context/Toolbar';
import { ThemeContext, UserContext } from '../../context';

const PRIMARY = 'primary';
const DANGER = 'danger';

// context api 的使用

export default class Context extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: PRIMARY,
      toggleTheme: this.toggleTheme,
    };
  }
  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === PRIMARY ? DANGER : PRIMARY,
    }));
  };
  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <UserContext.Provider value="admin" >
          <Toolbar changeTheme={this.toggleTheme} />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
