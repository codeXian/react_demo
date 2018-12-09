import React, { Component } from 'react';
import { Button } from 'antd';
import { ThemeContext, UserContext } from '../../context';

export default class ThemedButton extends Component {
  static contextType = ThemeContext;
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <UserContext.Consumer>
            {(name) => (
              <Button type={theme} onClick={toggleTheme} role={name}>
                我也能changeTheme
              </Button>
            )}
          </UserContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
