'use client';

import { API, DEFAULT_PARAMS, ROWS_PER_PAGE } from '@assets/configs';
import { DATE_FILTER } from '@assets/configs/general';
import { request } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { TeacherType, TopicParamType, TopicType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { ResponseType } from '@assets/types/request';
import { Loader } from '@resources/components/UI';
import { Dropdown } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const RegisterTopicPage = ({ params: { lng } }: PageProps) => {
    const teacherQuery = useGetList<TeacherType>({ module: 'teacher' });
    const [params, setParams] = useState<TopicParamType>(DEFAULT_PARAMS);
    const { t } = useTranslation(lng);

    const topicQuery = useGetList<TopicType>({
        module: 'register_topic',
        params: {
            ...params,
            removeFacultyId: true,
            isAllDetail: true,
        },
    });

    const topicMutation = useMutation<any, AxiosError, { thesisId: number }>({
        mutationFn: (data) => {
            return request.post(API.post.register_topic, data);
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
            <div className='flex justify-content-center'>
                <Button
                    severity='success'
                    label='Đăng ký'
                    className='white-space-nowrap'
                    size='small'
                    onClick={() =>
                        topicMutation.mutate({
                            thesisId: data.id!,
                        })
                    }
                />
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

                <Dropdown
                    id='thesis_lecturer'
                    showClear={true}
                    placeholder={t('module:field.thesis.lecturer')}
                    options={teacherQuery?.response?.data?.map((t) => ({ label: t.name, value: t.id }))}
                    onChange={(teacherId) => {
                        setParams((prev) => {
                            return {
                                ...prev,
                                filters: request.handleFilter(prev.filters || '', 'lecturerThesisId', '==', teacherId),
                            };
                        });
                    }}
                />
            </div>

            <div className='border-round-xl overflow-hidden relative shadow-5'>
                <Loader show={topicQuery.isFetching || teacherQuery.isFetching || topicMutation.isPending} />

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
                        header='Chuyên ngành phù hợp'
                        body={(data: TopicType) => <div>{data.thesisMajors?.map((t) => t.name).join(', ')}</div>}
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
        </div>
    );
};

export default RegisterTopicPage;
