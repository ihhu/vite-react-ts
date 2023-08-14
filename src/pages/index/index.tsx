import { FC, useEffect } from 'react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import useRequest from '@/hooks/useRequest';
import { getIndex } from '@/apis/index';
import { NavLink } from 'react-router-dom';

const Index: FC = () => {
  const { run, cancel, data, loading } = useRequest(getIndex, { manual: !1 });
  const handleClick = () => {
    run();
  };
  return (
    <div className="index-page">
      <Button type="primary">Button</Button>index page
      <p>
        <br />
        <Button type="primary" className="block w-100" loading={loading} onClick={handleClick}>
          请求数据
        </Button>
        <Button type="primary" onClick={() => cancel()}>
          取消请求
        </Button>
        <br />
        <NavLink to="/about">to about pate</NavLink>
      </p>
    </div>
  );
};

export default Index;
