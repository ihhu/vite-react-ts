import { useRequest } from 'ahooks';
import { Service, Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { useRef, useEffect } from 'react';

const useCancelRequest: Plugin<any, any> = fetchInstance => {
    const abort = useRef<AbortController>();
    const serviceRef = useRef<Service<any, any>>(fetchInstance.serviceRef.current);
    useEffect(() => {
        const _originService = fetchInstance.serviceRef;
        serviceRef.current = (...args) => {
            abort.current = new AbortController();
            args = args.concat([{ signal: abort.current.signal }]);
            return _originService.current(...args);
        };
        fetchInstance.serviceRef = serviceRef;
        return () => {
            fetchInstance.setState({ params: undefined });
            fetchInstance.serviceRef = _originService;
        };
    }, []);
    return {
        onCancel: () => {
            abort.current?.abort();
        },
    };
};

export default function <TData, TParams extends any[]>(service: Service<TData, TParams>, options?: Options<TData, TParams>) {
    return useRequest(service, options, [useCancelRequest as Plugin<TData, TParams>]);
}
