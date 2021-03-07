import { FC } from 'react';
import { CSSProperties } from 'styled-components';
import { StickerWidgetWrapper } from './StickerWidget.styles';

interface Props {
  fontColor: string;
  bgColor: string;
  width: string;
  label: string;
}
const StickerWidget: FC<Props> = ({
  fontColor, bgColor, width, label
}) => {
  const textColor = {
    color: fontColor,
  };
  const widgetStyle: CSSProperties = {
    backgroundColor: bgColor,
    width: width,
  };
  
  return (
    <StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
      <div className="contentWrapper">

        <h3 className="text" style={textColor}>
          {label}
        </h3>
      </div>
    </StickerWidgetWrapper>
  );
}
export { StickerWidget };

