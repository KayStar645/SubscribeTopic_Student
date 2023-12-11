'use client';

import { API, AUTH_TOKEN } from '@assets/configs';
import { request } from '@assets/helpers';
import { HTML } from '@assets/helpers/string';
import useCookies from '@assets/hooks/useCookies';
import { AuthType, ExchangeParamType, ExchangeType, JobParamType, JobType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { ResponseType } from '@assets/types/request';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '@resources/components/UI';
import { InputFile } from '@resources/components/form/InputFile';
import { useTranslation } from '@resources/i18n';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import moment from 'moment';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { FaUserGroup } from 'react-icons/fa6';
import * as yup from 'yup';

const defaultValues: JobType = {
    id: 0,
    name: '',
    instructions: '',
    due: new Date(),
    files: [],
};

const schema = (t: TFunction) =>
    yup.object({
        name: yup.string().required(
            t('validation:required', {
                attribute: t('common:name_of', { obj: t('module:job') }).toLowerCase(),
            }),
        ),
        instructions: yup.string().required(),
        due: yup.date(),
    });

const ExercisePage = ({ params, searchParams }: PageProps) => {
    const { id, lng } = params;
    const { topicId } = searchParams;
    const { t } = useTranslation(lng);
    const [auth] = useCookies<AuthType>(AUTH_TOKEN);
    const [content, setContent] = useState('');

    const jobDetail = useQuery<JobType | null, AxiosError<ResponseType>>({
        queryKey: ['job_detail', id],
        refetchOnWindowFocus: false,
        enabled: id !== '0',
        queryFn: async () => {
            const params: JobParamType = {
                id,
                isAllDetail: true,
            };

            const response = await request.get<JobType>(API.detail.job, { params });

            return response.data.data;
        },
    });

    const jobMutation = useMutation<any, AxiosError<ResponseType>, JobType>({
        mutationFn: async (data) => {
            data.thesisId = topicId;

            return id == '0'
                ? request.post(API.list.job, {
                      ...data,
                      files: data?.files?.map((t) => t.path),
                      due: moment(data.due).format('YYYY-MM-DDTHH:mm'),
                  })
                : request.update(API.list.job, {
                      ...data,
                      files: data?.files?.map((t) => t.path),
                      due: moment(data.due).format('YYYY-MM-DDTHH:mm'),
                  });
        },
    });

    const exchangeQuery = useQuery<ExchangeType[], AxiosError<ResponseType>>({
        refetchOnWindowFocus: false,
        queryKey: ['exchanges', 'list'],
        queryFn: async () => {
            const response = await request.get<ExchangeType[]>(API.list.exchange, {
                params: {
                    removeFacultyId: true,
                    jobId: id,
                } as ExchangeParamType,
            });

            return response.data.data || [];
        },
    });

    const exchangeMutation = useMutation({
        mutationFn: () => {
            return request.post(API.list.exchange, {
                content,
                jobId: id,
            });
        },
        onSuccess: () => {
            setContent('');
            exchangeQuery.refetch();
        },
    });

    const { control, handleSubmit, reset, getValues, setValue } = useForm({
        resolver: yupResolver(schema(t)) as Resolver<JobType>,
        defaultValues,
    });

    useEffect(() => {
        if (jobDetail.data) {
            reset(jobDetail.data);
        }
    }, [jobDetail.data, reset]);

    return (
        <div className='flex pr-2 gap-5'>
            <Loader
                show={
                    jobDetail.isFetching ||
                    jobMutation.isPending ||
                    exchangeMutation.isPending ||
                    exchangeQuery.isLoading
                }
            />

            <div className='flex-1'>
                <div className='flex gap-3 bg-white p-4 border-round shadow-1'>
                    <Button icon='pi pi-book' rounded={true} className='w-3rem h-3rem' />

                    <div className='flex-1'>
                        <div className={classNames('border-blue-700 pb-3 border-bottom-1')}>
                            <div className='flex gap-3'>
                                <div className='flex-1'>
                                    <p className='font-semibold text-3xl text-blue-700 mt-1'>{jobDetail.data?.name}</p>
                                </div>
                            </div>

                            <div className='flex align-items-center justify-content-between my-3'>
                                <p className='text-sm text-700'>
                                    {jobDetail.data?.teacherBy?.name} •{' '}
                                    {moment(jobDetail.data?.lastModifiedDate).format('DD MMM')}
                                </p>
                                <p className='text-sm font-semibold text-900'>
                                    Đến hạn {moment(jobDetail.data?.due).format('HH:mm DD MMM')}
                                </p>
                            </div>

                            <div dangerouslySetInnerHTML={HTML(getValues('instructions'))} />
                        </div>

                        <div className='mt-5'>
                            <div className='flex flex-column gap-4 min-h-30rem overflow-auto'>
                                {exchangeQuery.data &&
                                    exchangeQuery.data?.length > 0 &&
                                    exchangeQuery.data?.map((feedback) => (
                                        <div key={feedback.id} className='flex gap-2 align-items-start'>
                                            <Avatar icon='pi pi-user' className='bg-primary text-white border-circle' />

                                            <div className='flex flex-column gap-2'>
                                                {feedback?.teacher?.name || feedback?.student?.name}
                                                <Chip label={feedback?.content} className='bg-gray-200' />
                                                <p className='text-xs'>
                                                    {moment(feedback?.lastModifiedDate).format('DD/MM/YYYY HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className='mt-4 flex flex-column gap-3'>
                                <div className='flex align-items-center gap-3'>
                                    <FaUserGroup />
                                    <p className='text-900 font-semibold'>Nhận xét về công việc</p>
                                </div>

                                <div className='flex gap-3'>
                                    <Avatar
                                        icon='pi pi-user'
                                        className='bg-primary text-white border-circle mt-1'
                                        size='normal'
                                    />

                                    <InputTextarea
                                        autoResize={true}
                                        rows={2}
                                        className='border-round-3xl flex-1 text-sm'
                                        placeholder='Thêm nhận xét cho công việc'
                                        onChange={(e) => setContent(e.target.value)}
                                    />

                                    {content && (
                                        <Button
                                            icon='pi pi-send'
                                            className='w-2rem h-2rem mt-1'
                                            rounded={true}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                exchangeMutation.mutate();
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-25rem'>
                <div className='flex flex-column gap-4'>
                    <div className='p-4 bg-white shadow-2 border-round'>
                        <div className='flex align-items-center gap-2 mb-3'>
                            <p className='text-xl font-semibold flex-1'>Tài liệu đi kèm</p>
                        </div>

                        <InputFile
                            id='form_data_files'
                            folder='test_cua_son_2/'
                            fileClassName='col-12'
                            value={getValues('files')}
                            multiple={true}
                            hasDefault={false}
                            onChange={({ file, files }) => {
                                if (files) {
                                    setValue('files', files);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExercisePage;
