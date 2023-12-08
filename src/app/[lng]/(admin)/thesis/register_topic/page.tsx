'use client';

import { DEFAULT_PARAMS, ROWS_PER_PAGE } from '@assets/configs';
import { DATE_FILTER } from '@assets/configs/general';
import { request } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { TeacherType, TopicParamType, TopicType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { Loader } from '@resources/components/UI';
import { Dropdown } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const RegisterTopicPage = ({ params: { lng } }: PageProps) => {
    const topicQuery = useGetList<TopicType>({ module: 'register_topic' });
    const teacherQuery = useGetList<TeacherType>({ module: 'teacher' });
    const [params, setParams] = useState<TopicParamType>(DEFAULT_PARAMS);
    const { t } = useTranslation(lng);

    const debounceKeyword = useDebouncedCallback((keyword) => {
        setParams((prev) => ({
            ...prev,
            filters: request.handleFilter(prev.filters, '(internalCode|name)', '@=', keyword),
        }));
    }, 600);

    const renderActions = (data: TopicType) => {
        return (
            <div className='flex align-items-center gap-3'>
                <Button label='Đăng ký' />
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
                        field='lecturerThesis.name'
                        header={t('module:field.thesis.lecturer')}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header={t('module:field.thesis.instruction')}
                        body={(data: TopicType) => <p>{data.thesisInstructions?.map((t) => t.name).join(', ')}</p>}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header={t('module:field.thesis.review')}
                        body={(data: TopicType) => <p>{data.thesisReviews?.map((t) => t.name).join(', ')}</p>}
                    />
                </DataTable>

                <div className='flex align-items-center justify-content-between bg-white px-3 py-2'>
                    <Dropdown
                        id='date_created_filter'
                        value='date_decrease'
                        optionValue='code'
                        onChange={(sortCode) => {
                            const filter = DATE_FILTER(t).find((t) => t.code === sortCode);

                            setParams((prev) => {
                                return {
                                    ...prev,
                                    sorts: request.handleSort(filter, prev),
                                };
                            });
                        }}
                        options={DATE_FILTER(t)}
                    />

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
