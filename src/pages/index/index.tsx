import React, { FC } from 'react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const Index: FC = () => {
    return (
        <div className="index-page">
            <Button type="primary">Button</Button>index page
        </div>
    );
};

export default Index;
