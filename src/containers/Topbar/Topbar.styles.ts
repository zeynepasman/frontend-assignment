import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  transition,
  borderRadius,
} from '../../lib/helpers/style_utils';


const TopbarWrapper = styled.div`
  .isomorphicTopbar {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding:  '0 265px 0 31px' ;
    z-index: 1000;
    ${transition()};

    @media only screen and (max-width: 767px) {
      padding:  '0px 260px 0px 15px !important';
    }

   
    .isoLeft {
      display: flex;
      align-items: center;

      @media only screen and (max-width: 767px) {
        margin:'0 0 0 20px' ;
      }
      h3 {
          font-size: 21px;
          font-weight: 300;
          line-height: 70px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${palette('grayscale', 6)};
          display: block;
          text-decoration: none;
          margin: 0px 50px 0 50px;
      } 
  
    }
    .isoRight {
      display: flex;
      align-items: center;

      li {
        margin-left: '35px' ;
        margin-right:  '0' ;
        cursor: pointer;
        line-height: normal;
        position: relative;
        display: inline-block;

        @media only screen and (max-width: 360px) {
          margin-left: '25px' ;
          margin-right:  '0';
        }

        &:last-child {
          margin: 0;
        }

        i {
          font-size: 24px;
          color: ${palette('text', 0)};
          line-height: 1;
        }

        &.isoUser {
          .isoImgWrapper {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: ${palette('grayscale', 9)};
            ${borderRadius(50)};

            img {
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }

 
`;

export default TopbarWrapper;
