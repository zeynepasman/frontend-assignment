import React from 'react';
import userpic from '../../assets/images/profile.png';
import { Popover } from "antd";

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  return (
    <Popover
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <ul className="isoRight">
      <div className="isoImgWrapper">
        <img alt="user" src={userpic} />
        </div>
      </ul>
    </Popover>
  );
}
