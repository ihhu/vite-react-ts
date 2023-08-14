import errorImage from '@/assets/images/404.png';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const NotFound = () => {
  const navigate = useNavigate();
  // 返回首页
  const onBack = () => {
    navigate('/', { replace: true });
  };
  return (
    <div className={styles.content}>
      <img src={errorImage} />
      <div className={styles.tips}>出错了，您访问的页面不存在</div>
      <Button type="primary" onClick={() => onBack()}>
        返回首页
      </Button>
    </div>
  );
};
export default NotFound;
