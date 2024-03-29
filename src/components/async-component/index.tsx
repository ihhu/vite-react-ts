import { ComponentType, Suspense } from 'react';
import Loading from '@/components/loading';

function asyncComponent<T extends JSX.IntrinsicAttributes>(AsyncComponent: ComponentType<T>) {
  const Component = function (props: T) {
    return (
      <Suspense fallback={<Loading />}>
        <AsyncComponent {...props} />
      </Suspense>
    );
  };
  return Component;
}
export default asyncComponent;
