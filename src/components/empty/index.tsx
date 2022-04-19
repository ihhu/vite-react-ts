import styles from './index.module.less';
import React, { FC } from 'react';
import { Empty as AntEmpty, EmptyProps } from 'antd';

interface EmptyType extends React.FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}

const Empty: EmptyType = props => {
    return <AntEmpty className={styles['empty']} image={AntEmpty.PRESENTED_IMAGE_SIMPLE} {...props} />;
};
Empty.PRESENTED_IMAGE_SIMPLE = AntEmpty.PRESENTED_IMAGE_SIMPLE;
Empty.PRESENTED_IMAGE_DEFAULT = AntEmpty.PRESENTED_IMAGE_DEFAULT;

export default Empty;
