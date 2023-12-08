import { API } from '@assets/configs';
import { detail, list } from '@assets/configs/keys';
import { request } from '@assets/helpers';
import { ParamType, ResponseType } from '@assets/types/request';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';

interface UseGetType<TParam> {
    module: keyof typeof API.list;
    params?: TParam;
    enabled?: boolean;
    _onSuccess?: (_data: any) => void;
}

interface UseGetListType<TParam> extends UseGetType<TParam> {
    module: keyof typeof API.list;
}

interface UseGetDetailType<TParam> extends UseGetType<TParam> {
    module: keyof typeof API.detail;
}

const useGetList = <TQueryFnData, TParam = ParamType>({
    module,
    params,
    enabled = true,
    _onSuccess = () => {},
}: UseGetListType<TParam>) => {
    const query = useQuery<ResponseType<TQueryFnData[]>, AxiosError<ResponseType>>({
        enabled,
        refetchOnWindowFocus: false,
        queryKey: [...list(params)[module], params],
        queryFn: async () => {
            const response = await request.get<TQueryFnData[]>(API.list[module], { params });

            return response.data;
        },
    });
    const onSuccess = useCallback(() => {
        _onSuccess(query.data);
    }, [_onSuccess, query.data]);

    useEffect(() => {
        onSuccess();
    }, [onSuccess, query.data]);

    return { ...query, onSuccess, response: query.data };
};

const useGetDetail = <TQueryFnData, TParam>({
    module,
    params,
    enabled = true,
    _onSuccess = () => {},
}: UseGetDetailType<TParam>) => {
    const query = useQuery<TQueryFnData | null, AxiosError<ResponseType>>({
        enabled,
        refetchOnWindowFocus: false,
        queryKey: [...detail()[module], params],
        queryFn: async () => {
            const response = await request.get<TQueryFnData>(API.detail[module], { params });

            return response.data.data;
        },
    });

    const onSuccess = useCallback(() => {
        _onSuccess(query.data);
    }, [_onSuccess, query.data]);

    useEffect(() => {
        onSuccess();
    }, [onSuccess, query.data]);

    return { ...query, onSuccess, response: query.data };
};

export { useGetDetail, useGetList };
