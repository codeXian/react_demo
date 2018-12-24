import { Button } from 'antd';
import React from 'react';

// function Render(props) {
//   console.log('redner1');
//   return (
//     <div>
//       <p>name: {props.name}</p>
//       <p>age: {props.age}</p>
//       <p>address: {props.address}</p>
//     </div>
//   );
// }

const Render = React.memo(function Render(props) {
  console.log('redner2');
  return (
    <div>
      <p>name: {props.name}</p>
      <p>age: {props.age}</p>
      <p>address: {props.address}</p>
      <div>
        like:
        {props.like.map(item => (
          <div key={item.key}>{item.value}</div>
        ))}
      </div>
    </div>
  );
});

export default class MemoComponent extends React.PureComponent {
  state = {
    user: null,
  };
  handleClick = () => {
    this.setState({
      user: {
        name: 'codexian',
        age: 24,
        address: '浙江省余姚市',
        like: [
          {
            key: 'basketball',
            value: '篮球',
          },
          {
            key: 'sing',
            value: '唱歌',
          },
        ],
      },
    });
  };
  render() {
    return (
      <div>
        <div className="btn">
          <Button onClick={this.handleClick}>传递对象</Button>
        </div>
        <div className="result">
          {this.state.user !== null && <Render {...this.state.user} />}
        </div>
      </div>
    );
  }
}
