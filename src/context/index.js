import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'default',
  toggleTheme: () => {},
});

export const UserContext = React.createContext({
  name: 'Guest',
});
