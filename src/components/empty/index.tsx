import styles from './index.module.less';
import { FC, ReactNode } from 'react';
import { Empty as AntEmpty, EmptyProps } from 'antd';

interface EmptyType extends FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
}

const Empty: EmptyType = props => {
  return <AntEmpty className={styles['empty']} image={AntEmpty.PRESENTED_IMAGE_SIMPLE} {...props} />;
};
Empty.PRESENTED_IMAGE_SIMPLE = AntEmpty.PRESENTED_IMAGE_SIMPLE;
Empty.PRESENTED_IMAGE_DEFAULT = AntEmpty.PRESENTED_IMAGE_DEFAULT;

export default Empty;
