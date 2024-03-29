'use client';

import { API, DEFAULT_PARAMS, ROUTES, ROWS_PER_PAGE } from '@assets/configs';
import { language, request } from '@assets/helpers';
import { HTML } from '@assets/helpers/string';
import { useGetDetail, useGetList } from '@assets/hooks/useGet';
import { TeacherType, TopicParamType, TopicType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { Loader } from '@resources/components/UI';
import { Dropdown } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

const RegisterTopicPage = ({ params: { lng } }: PageProps) => {
    const teacherQuery = useGetList<TeacherType>({ module: 'teacher' });
    const [params, setParams] = useState<TopicParamType>(DEFAULT_PARAMS);
    const { t } = useTranslation(lng);
    const [selected, setSelected] = useState<TopicType>();

    const { response, isFetching } = useGetDetail<TopicType>({
        module: 'topic',
        enabled: !!selected?.id,
        params: {
            id: selected?.id,
            isAllDetail: true,
        },
        _onSuccess(_data) {},
    });

    const topicMutation = useMutation<any, AxiosError, { thesisId: number }>({
        mutationFn: (data) => {
            return request.post(API.post.register_topic, data);
        },
    });

    const topicQuery = useGetList<TopicType>({
        module: 'register_topic',
        params: {
            ...params,
            removeFacultyId: true,
            isAllDetail: true,
        },
    });

    const debounceKeyword = useDebouncedCallback((keyword) => {
        setParams((prev) => ({
            ...prev,
            filters: request.handleFilter(prev.filters, '(internalCode|name)', '@=', keyword),
        }));
    }, 600);

    const renderActions = (data: TopicType) => {
        return (
            <div className='flex justify-content-center gap-3'>
                <i className='pi pi-eye cursor-pointer hover:text-primary' onClick={() => setSelected(data)} />
            </div>
        );
    };

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setParams((prev) => ({ ...prev, pageSize: e.rows, currentPage: e.first + 1 }));
    };

    return (
        <div className='flex flex-column gap-4'>
            <div className='flex align-items-center justify-content-between bg-white h-4rem px-3 border-round-lg shadow-3'>
                <p className='text-xl font-semibold'>{t('list_of', { module: t('module:thesis').toLowerCase() })}</p>
            </div>

            <div className='flex align-items-center gap-3'>
                <InputText
                    placeholder={`${t('search')}...`}
                    className='w-20rem'
                    onChange={(e) => debounceKeyword(e.target.value)}
                />
            </div>

            <div className='border-round-xl overflow-hidden relative shadow-2'>
                <Loader show={topicQuery.isFetching || teacherQuery.isFetching} />

                <DataTable
                    value={topicQuery.response?.data || []}
                    rowHover={true}
                    stripedRows={true}
                    showGridlines={true}
                    emptyMessage={t('list_empty')}
                >
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header={t('common:action')}
                        body={renderActions}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='internalCode'
                        header={t('common:code_of', { obj: t('module:thesis').toLowerCase() })}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='name'
                        header={t('common:name_of', { obj: t('module:thesis').toLowerCase() })}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header='Số lượng sinh viên'
                        body={(data: TopicType) => (
                            <p className='text-center'>
                                {data.minQuantity} - {data.maxQuantity}
                            </p>
                        )}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header='Chuyên ngành phù hợp'
                        body={(data: TopicType) => <div>{data.thesisMajors?.map((t) => t.name).join(', ')}</div>}
                />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header='Ghi chú'
                        body={(data: TopicType) => <div>{data.messages?.join(', ')}</div>}
                    />
                </DataTable>

                <div className='flex align-items-center justify-content-between bg-white px-3 py-2'>
                    <div></div>

                    <Paginator
                        first={request.currentPage(topicQuery.response?.extra?.currentPage)}
                        rows={topicQuery.response?.extra?.pageSize}
                        totalRecords={topicQuery.response?.extra?.totalCount}
                        rowsPerPageOptions={ROWS_PER_PAGE}
                        onPageChange={onPageChange}
                        className='border-noround p-0'
                    />
                </div>
            </div>

            {selected && (
                <div className='bg-white border-round-xl p-3 overflow-hidden shadow-2 relative'>
                    <Loader show={isFetching || topicMutation.isPending} />

                    <div className='flex flex-column gap-3'>
                        <p className='font-bold text-800 text-xl pb-3 text-center'>Chi tiết đề tài</p>

                        {response?.data?.thesisInstructions && response?.data?.thesisInstructions.length > 0 && (
                            <Panel
                                toggleable={true}
                                collapsed={true}
                                header='Giảng viên hướng dẫn'
                                className='shadow-2 border-1 border-300 border-round-xl overflow-hidden'
                            >
                                <div className='p-3'>
                                    {response?.data?.thesisInstructions?.map((teacher, index) => (
                                        <>
                                            <div className='flex flex-column gap-3' key={teacher.id}>
                                                <div className='flex align-items-center'>
                                                    <p className='w-15rem'>
                                                        {t('common:name_of', {
                                                            obj: t('module:teacher').toLowerCase(),
                                                        })}
                                                    </p>
                                                    <p className='text-900 font-semibold'>{teacher?.name}</p>
                                                </div>

                                                <div className='flex align-items-center'>
                                                    <p className='w-15rem'>{t('common:email')}</p>
                                                    <p className='text-900 font-semibold'>{teacher?.email}</p>
                                                </div>

                                                <div className='flex align-items-center'>
                                                    <p className='w-15rem'>{t('module:field.teacher.academic')}</p>
                                                    <p className='text-900 font-semibold'>{teacher?.academicTitle}</p>
                                                </div>
                                            </div>

                                            {index < response.data?.thesisInstructions?.length! - 1 && (
                                                <div className='px-8'>
                                                    <Divider />
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </Panel>
                        )}

                        <div className='p-3 bg-white border-round-xl shadow-2'>
                            <div className='flex align-items-center justify-content-between gap-3'>
                                {isFetching ? (
                                    <Skeleton className='flex-1 h-2rem' />
                                ) : (
                                    <p className='flex-1 font-bold text-xl text-800'>{response?.data?.name}</p>
                                )}

                                <Button
                                    label='Đăng ký'
                                    size='small'
                                    visible={selected?.isRegister}
                                    onClick={() => {
                                        topicMutation.mutate(
                                            {
                                                thesisId: selected?.id!,
                                            },
                                            {
                                                onSuccess: () => {
                                                    toast.success('Đăng ký đề tài thành công');
                                                },
                                            },
                                        );
                                    }}
                                />
                            </div>

                            <Divider align='center'>
                                <div className='flex align-items-center gap-2'>
                                    <i className='pi pi-comments' />
                                    <p className='font-semibold'>Lời mời đầu</p>
                                </div>
                            </Divider>

                            {isFetching ? (
                                <Skeleton className='h-10rem' />
                            ) : (
                                <p dangerouslySetInnerHTML={HTML(response?.data?.summary)} />
                            )}

                            <Divider align='center'>
                                <div className='flex align-items-center gap-2'>
                                    <i className='pi pi-question-circle' />
                                    <p className='font-semibold'>Về đề tài</p>
                                </div>
                            </Divider>

                            {isFetching ? (
                                <Skeleton className='h-3rem' />
                            ) : (
                                <p>
                                    Đề tài phù hợp với sinh viên thuộc chuyên nghành{' '}
                                    {response?.data?.thesisMajors?.map((t) => t.name).join(', ')}, yêu cầu tối thiểu{' '}
                                    {response?.data?.minQuantity} thành viên và tối đa {response?.data?.maxQuantity}{' '}
                                    thành viên tham gia thực hiện, được hướng dẫn bởi{' '}
                                    {response?.data?.thesisInstructions
                                        ?.map((t) => t.academicTitle + ' ' + t.name)
                                        .join(', ')}{' '}
                                    với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterTopicPage;
