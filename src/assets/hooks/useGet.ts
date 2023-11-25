import { API } from '@assets/configs';
import { detail, list } from '@assets/configs/keys';
import { request } from '@assets/helpers';
import { ResponseType } from '@assets/types/request';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseGetType<TParam> {
    module: keyof typeof API.admin;
    params?: TParam;
    enabled?: boolean;
}

interface UseGetListType<TParam> extends UseGetType<TParam> {
    module: keyof typeof API.admin;
}

interface UseGetDetailType<TParam> extends UseGetType<TParam> {
    module: keyof typeof API.detail;
}

const useGetList = <TQueryFnData = any, TParam = any>({ module, params, enabled = true }: UseGetListType<TParam>) => {
    return useQuery<TQueryFnData[], AxiosError<ResponseType>>({
        enabled,
        refetchOnWindowFocus: false,
        queryKey: [...list(params)[module], params],
        queryFn: async () => {
            const response = await request.get<TQueryFnData[]>(module, { params });

            return response.data.data || [];
        },
    });
};

const useGetDetail = <TQueryFnData, TParam>({ module, params, enabled = true }: UseGetDetailType<TParam>) => {
    return useQuery<TQueryFnData | null, AxiosError<ResponseType>>({
        enabled,
        refetchOnWindowFocus: false,
        queryKey: [...detail()[module], params],
        queryFn: async () => {
            const response = await request.get<TQueryFnData>(module + '/detail', { params });

            return response.data.data;
        },
    });
};

export { useGetList, useGetDetail };
