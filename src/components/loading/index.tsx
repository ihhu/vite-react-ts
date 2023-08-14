import { Spin } from 'antd';
const Loading = () => {
    return (
        <Spin tip="Loading..." size="large">
            <div style={{ textAlign: 'center', paddingTop: '200px' }}></div>
        </Spin>
    );
};

export default Loading;
