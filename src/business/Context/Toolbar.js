import { Button } from 'antd';
import React from 'react';
import ThemedButton from './ThemedButton';

function Toolbar(props) {
  return (
    <div>
      <Button onClick={props.changeTheme} style={{ marginRight: 10 }}>
        change theme
      </Button>
      <ThemedButton />
    </div>
  );
}

export default Toolbar;
