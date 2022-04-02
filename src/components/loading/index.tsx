import React from 'react';
import { Spin } from 'antd';
const Loading = () => {
    return (
        <div style={{ textAlign: 'center', paddingTop: '200px' }}>
            <Spin tip="Loading..." size="large" />
        </div>
    );
};
 
export default Loading;
 