import * as React from 'react';
import { Icon } from 'antd';

type Props = {
  onChange: Function,
  value: string,
  icon?: string
};

class Input extends React.Component<Props> {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { value, icon, ...other } = this.props;
    return (
      <span className="ant-input-affix-wrapper">
        {icon &&
          <span className="ant-input-prefix">
            <Icon type={icon} style={{ fontSize: 13 }} />
          </span>}
        <input
          {...other}
          value={value}
          onChange={this.handleChange}
          className="ant-input ant-input-lg"
        />
      </span>
    );
  }
}

export default Input;
