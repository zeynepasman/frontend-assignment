import { useEffect } from 'react';
import { useService } from "../../lib/services/fetchApi";
import { Row, Col, Descriptions, Statistic } from 'antd';
import moment from "moment";
import Loader from "../../components/Loader/Loader";
import { Asset } from '../../lib/models/currency.model';
import { useParams } from 'react-router-dom';
import GoogleChart from 'react-google-charts';
import { StickerWidget } from '../../components/Sticker/StickerWidget';
import { ArrowUpOutlined } from '@ant-design/icons';


const rowStyle = { marginTop: '5%',marginBottom:'5%' };

export default function CurrenyDetail() {
  const { response, getById, graphHistory, getAssetHistory } = useService<Asset>();
  const { id } = useParams<{ id: string }>();
  const query: HistoryRequestQueryParams = {
    interval: 'h12',
    start: moment().subtract(7, 'd').valueOf(),
    end: moment().valueOf()
  }
  
  useEffect(() => {
    Promise.all([
      getById(id),
      getAssetHistory(id, `interval=${query.interval}&start=${query.start}&end=${query.end}`)
    ]);
    
  }, []);

  if (!response) {
    return (<Loader />)
  };

  return (
    <>
      <Row style={rowStyle}>
        <Col span={7} offset={1}>
          <StickerWidget
                width={'50%'}
                label={`${response.name}`}
                fontColor={'#ffffff'}
                bgColor={'#1890ff'}
          />
          <Statistic
            title="Price USD"
            value={response.priceUsd}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="$"
          />
          <Statistic
            title="Percent 24h"
            value={response.changePercent24Hr}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Col>
        <Col span={16} >
          <Descriptions
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          bordered
          layout="vertical"
          >
            <Descriptions.Item label="Market Cap USD">
              <Statistic
                value={response.marketCapUsd}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="$"
              />
            </Descriptions.Item>
            <Descriptions.Item label="Volume USD 24 hour">
              <Statistic
                value={response.volumeUsd24Hr}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="$"
              />
            </Descriptions.Item>
            <Descriptions.Item label="Supply">
              <Statistic
                value={response.marketCapUsd}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="$"
              />
            </Descriptions.Item>
          </Descriptions>  
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={15} offset={1}>
          {graphHistory ?
          <GoogleChart
            chartType="LineChart"
              loader={<Loader />}
            data={graphHistory}
            options={{
              hAxis: {
              title: 'Date',
              format: 'MM-dd-YYYY'
              },
              vAxis: {
                title: 'Price',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
     />:<Loader/>
          }
        </Col>
      </Row>
    
      </>
  );
}