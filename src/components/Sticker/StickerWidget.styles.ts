import styled from 'styled-components';
import { borderRadius } from '../../lib/helpers/style_utils';

const StickerWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  ${borderRadius(10)};

 

  .contentWrapper {
    width: 100%;
    padding: 10px 5px 10px 10px;
    display: flex;
    flex-direction: column;

    .text {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.1;
      text-align: center
      margin: 0 0 5px;
    }

    .label {
      font-size: 16px;
      font-weight: 400;
      text-align: center
      margin: 0;
      line-height: 1.2;
    }
  }
`;

export { StickerWidgetWrapper };
