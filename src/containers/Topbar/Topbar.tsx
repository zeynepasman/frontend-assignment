import React, { FC } from 'react';
import { Layout } from 'antd';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import { CSSProperties } from 'styled-components';
import userpic from '../../assets/images/favicon.png';

const { Header } = Layout;

const Topbar: FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  
  const styling: CSSProperties = {
    background: '#ffff',
    position: 'fixed',
    width: '100%',
    height: 70,
  };

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <div className="isoImgWrapper">
              <img alt="user" src={userpic} />    
          </div>
          <h3>CryptoMarket</h3>
          </div>
        <ul className="isoRight">  
          <li className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
export default Topbar;
