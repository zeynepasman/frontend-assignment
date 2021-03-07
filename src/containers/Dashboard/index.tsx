import { Layout } from 'antd';
import { CSSProperties } from 'styled-components';
import Topbar from '../Topbar/Topbar';
import DashboardRoutes from './Routes';

const { Content } = Layout;
const layoutStyles: CSSProperties = {
  flexDirection: 'row', overflowX: 'hidden' 
};
const contentStyles: CSSProperties = {
  padding: '70px 0 0',
  position: 'relative',
};
export default function Dashboard() {
  return (
    <div>
   <Topbar />
      <Layout style={layoutStyles}>
        <Content style={contentStyles}>
          <DashboardRoutes />
        </Content>
      </Layout>
    </div>
   
  );
}