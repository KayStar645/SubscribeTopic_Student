'use client';

import { API, ROWS_PER_PAGE } from '@assets/configs';
import { request } from '@assets/helpers';
import { StudentParamType, StudentType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { ConfirmModalRefType } from '@assets/types/modal';
import { MetaType, ResponseType } from '@assets/types/request';
import Loader from '@resources/components/UI/Loader';
import { useTranslation } from '@resources/i18n';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useRef, useState } from 'react';
import InviteForm, { InviteFormRefType } from './form';

const InvitePage = ({ params: { lng } }: PageProps) => {
    const { t } = useTranslation(lng);
    const formRef = useRef<InviteFormRefType>(null);
    const confirmModalRef = useRef<ConfirmModalRefType>(null);
    const [meta, setMeta] = useState<MetaType>(request.defaultMeta);
    const [selected, setSelected] = useState<StudentType>();
    const [params, setParams] = useState<StudentParamType>({
        page: meta.currentPage,
        pageSize: meta.pageSize,
        sorts: '-DateCreated',
    });

    const studentQuery = useQuery<StudentType[], AxiosError<ResponseType>>({
        refetchOnWindowFocus: false,
        queryKey: ['students', 'list', params],
        queryFn: async () => {
            const response = await request.get<StudentType[]>(`${API.list.student_by_period}`, { params });

            setMeta({
                currentPage: response.data.extra?.currentPage,
                hasNextPage: response.data.extra?.hasNextPage,
                hasPreviousPage: response.data.extra?.hasPreviousPage,
                pageSize: response.data.extra?.pageSize,
                totalCount: response.data.extra?.totalCount,
                totalPages: response.data.extra?.totalPages,
                messages: response.data.extra?.messages,
            });

            return response.data.data || [];
        },
    });

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setParams((prev) => ({ ...prev, pageSize: e.rows, currentPage: e.first + 1 }));
    };

    const renderActions = (data: StudentType) => {
        return (
            <div className='flex align-items-center justify-content-center gap-3'>
                <i
                    className='pi pi-envelope hover:text-primary cursor-pointer'
                    onClick={() => {
                        formRef.current?.show?.(data);
                        setSelected(data);
                    }}
                />
            </div>
        );
    };
    return (
        <div className='flex flex-column gap-4'>
            <div className='flex align-items-center justify-content-between bg-white h-4rem px-3 border-round-lg shadow-3'>
                <p className='text-xl font-semibold'>{t('list_of', { module: t('module:student').toLowerCase() })}</p>
                <Button
                    label={t('create_new')}
                    icon='pi pi-plus'
                    size='small'
                    onClick={() => {
                        formRef.current?.show?.();
                        setSelected(undefined);
                    }}
                />
            </div>

            <div className='flex align-items-center justify-content-between'>
                <InputText placeholder={`${t('search')}...`} className='w-20rem' />
            </div>

            <div className='border-round-xl overflow-hidden relative shadow-5'>
                <Loader show={studentQuery.isFetching} />

                <DataTable
                    value={studentQuery.data || []}
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
                        header={t('common:code_of', { obj: t('module:student').toLowerCase() })}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='name'
                        header={t('common:name_of', { obj: t('module:student').toLowerCase() })}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='email'
                        header={t('email')}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='phoneNumber'
                        header={t('phone_number')}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        field='class'
                        header={t('module:field.student.class')}
                    />
                </DataTable>

                <div className='flex align-items-center justify-content-between bg-white px-3 py-2'>
                    <div></div>

                    <Paginator
                        first={request.currentPage(meta.currentPage)}
                        rows={meta.pageSize}
                        totalRecords={meta.totalCount}
                        rowsPerPageOptions={ROWS_PER_PAGE}
                        onPageChange={onPageChange}
                        className='border-noround p-0'
                    />
                </div>
            </div>

            <InviteForm
                lng={lng}
                title={`Gửi lời mới tới ${selected?.name}`}
                ref={formRef}
                onSuccess={(data) => studentQuery.refetch()}
            />
        </div>
    );
};

export default InvitePage;
