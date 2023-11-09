import styles from './index.module.less';
import { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Content } = Layout;

const Default: FC = () => {
  return (
    <Layout className={styles.default}>
      <Header>Header</Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Default;
