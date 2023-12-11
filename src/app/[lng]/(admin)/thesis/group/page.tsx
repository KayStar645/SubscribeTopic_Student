'use client';

import { ROUTES, ROWS_PER_PAGE } from '@assets/configs';
import { DATE_FILTER } from '@assets/configs/general';
import { language, request } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { GroupParamType, GroupType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { MetaType } from '@assets/types/request';
import { Loader } from '@resources/components/UI';
import { Dropdown } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const GroupPage = ({ params: { lng } }: PageProps) => {
    const { t } = useTranslation(lng);
    const [meta, setMeta] = useState<MetaType>(request.defaultMeta);

    const [params, setParams] = useState<GroupParamType>({
        page: meta.currentPage,
        pageSize: meta.pageSize,
        sorts: '-DateCreated',
        isGetGroupMe: true,
    });

    const groupQuery = useGetList<GroupType>({
        module: 'group',
        params,
        _onSuccess: (data) => {},
    });

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setParams((prev) => ({ ...prev, pageSize: e.rows, currentPage: e.first + 1 }));
    };

    const renderActions = (data: GroupType) => {
        return (
            <div className='flex align-items-center justify-content-center'>
                <Link href={language.addPrefixLanguage(lng, `${ROUTES.thesis.group}/${data.id}`)}>
                    <i className='pi pi-pencil hover:text-primary cursor-pointer' />
                </Link>
            </div>
        );
    };

    return (
        <div className='flex flex-column gap-4'>
            <div className='flex align-items-center justify-content-between bg-white p-3 border-round-lg shadow-3'>
                <p className='text-xl font-semibold'>{t('list_of', { module: t('module:group').toLowerCase() })}</p>
            </div>

            <div className='flex align-items-center justify-content-between'>
                <InputText placeholder={`${t('search')}...`} className='w-20rem' />
            </div>

            <div className='border-round-xl overflow-hidden relative shadow-5'>
                <Loader show={groupQuery.isFetching} />

                <DataTable value={groupQuery.response?.data || []}>
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                        }}
                        header={t('common:action')}
                        body={renderActions}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                        }}
                        field='name'
                        header={t('common:name_of', { obj: t('module:group').toLowerCase() })}
                    />
                    <Column
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                        }}
                        field='countMember'
                        header={t('module:field.group.count_member')}
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
                        first={request.currentPage(meta.currentPage)}
                        rows={meta.pageSize}
                        totalRecords={meta.totalCount}
                        rowsPerPageOptions={ROWS_PER_PAGE}
                        onPageChange={onPageChange}
                        className='border-noround p-0'
                    />
                </div>
            </div>
        </div>
    );
};

export default GroupPage;
