'use client';

import { API, AUTH_TOKEN } from '@assets/configs';
import { request } from '@assets/helpers';
import { HTML } from '@assets/helpers/string';
import {
    AuthType,
    ExchangeParamType,
    ExchangeType,
    JobParamType,
    JobResultParamType,
    JobResultType,
    JobType,
} from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { FileType } from '@assets/types/form';
import { ResponseType } from '@assets/types/request';
import { Loader } from '@resources/components/UI';
import { InputFile } from '@resources/components/form/InputFile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TFunction, t } from 'i18next';
import moment from 'moment';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import { createContext, useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
import JobInfo from '../Info';
import JobComments from '../Comment';
import { useGetDetail, useGetList } from '@assets/hooks/useGet';
import YourExercise from '../Exercise';
import { toast } from 'react-toastify';
import useCookies from '@assets/hooks/useCookies';

interface JobPageContextType {
    groupId: number;
    lng: string;
    t: TFunction;
    job?: JobType | null;
    comments?: ExchangeType[];
    exercise?: FileType[];
}

const JobPageContext = createContext<JobPageContextType>({
    groupId: 0,
    lng: 'vi',
    t: t,
    job: null,
    comments: [],
    exercise: [],
});

const JobPage = ({ params, searchParams }: PageProps) => {
    const { id, lng } = params;
    const { topicId, groupId } = searchParams;
    const [auth] = useCookies<AuthType>(AUTH_TOKEN);

    const jobDetail = useGetDetail<JobType>({
        module: 'job',
        params: {
            id,
            isAllDetail: true,
        },
    });

    const exchangeQuery = useGetList<ExchangeType, ExchangeParamType>({
        module: 'exchange',
        params: {
            removeFacultyId: true,
            jobId: id,
        },
    });

    const exerciseQuery = useGetList<JobResultType, JobResultParamType>({
        module: 'job_result',
        enabled: !!auth?.customer.Id,
        params: {
            removeFacultyId: true,
            jobId: id,
            studentId: auth?.customer.Id!,
        },
    });

    const jobResultMutation = useMutation<any, AxiosError<ResponseType>, { files: string[] }>({
        mutationFn: async (data) => {
            return request.post(API.list.job_result, {
                files: data.files,
                jobId: id,
            });
        },
    });

    const exchangeMutation = useMutation({
        mutationFn: (content: string) => {
            return request.post(API.list.exchange, {
                content,
                jobId: id,
            });
        },
        onSuccess: () => {
            exchangeQuery.refetch();
        },
    });

    const Placeholder = () => {
        return (
            <>
                <Skeleton height='3rem' className='w-full' />

                <div className='flex align-items-center justify-content-between my-3'>
                    <Skeleton height='1rem' width='15rem' />

                    <Skeleton height='1rem' width='15rem' />
                </div>

                <Skeleton height='4rem' className='w-full' />
            </>
        );
    };

    const jobPageValue: JobPageContextType = {
        groupId,
        lng,
        t,
        job: jobDetail.response?.data,
        comments: exchangeQuery.response?.data || [],
        exercise: exerciseQuery.response?.data?.[0]?.files || [],
    };

    return (
        <JobPageContext.Provider value={jobPageValue}>
            <div className='flex pr-2 gap-3'>
                <Loader
                    show={
                        jobDetail.isFetching ||
                        exchangeQuery.isFetching ||
                        exerciseQuery.isFetching ||
                        exchangeMutation.isPending ||
                        jobResultMutation.isPending
                    }
                />

                <div className='flex-1'>
                    <div className='flex gap-3 bg-white p-4 border-round shadow-1'>
                        <Button icon='pi pi-book' rounded={true} className='w-3rem h-3rem' />

                        <div className='flex-1 flex flex-column'>
                            <div>{jobDetail.isFetching ? <Placeholder /> : <JobInfo />}</div>

                            <Divider />

                            <InputFile
                                id='form_data_files'
                                value={jobDetail?.response?.data?.files || []}
                                multiple={true}
                                disabled={true}
                                hasDefault={false}
                            />

                            <Divider />

                            <JobComments
                                onSubmit={(content) => {
                                    exchangeMutation.mutate(content);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-25rem'>
                    <YourExercise
                        onSubmit={(files) => {
                            jobResultMutation.mutate(
                                {
                                    files,
                                },
                                {
                                    onSuccess: () => {
                                        toast.success('Nộp bài thành công');
                                    },
                                },
                            );
                        }}
                    />
                </div>
            </div>
        </JobPageContext.Provider>
    );
};

export default JobPage;
export { JobPageContext };
