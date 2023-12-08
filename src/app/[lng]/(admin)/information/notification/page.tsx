'use client';

import { ROUTES } from '@assets/configs';
import { language } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { NotificationParamType, NotificationType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { Loader } from '@resources/components/UI';
import { useTranslation } from '@resources/i18n';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { createContext, useState } from 'react';
import InviteTab from './tab/Invite';
import NotificationTab from './tab/Notification';
import moment from 'moment';

interface NotificationPageContextType {
    lng: string;
}

const NotificationPageContext = createContext<NotificationPageContextType>({
    lng: '',
});

const NotificationPage = ({ params: { lng } }: PageProps) => {
    const [tab, setTab] = useState<'NT' | 'IV'>('NT');
    const { t } = useTranslation(lng);
    const { isLoading, data } = useGetList<NotificationType, NotificationParamType>({
        module: 'notification',
        params: {
            filters: `lastModifiedDate>=${moment().subtract({ day: 7 }).format('yyyy-MM-DD')}`,
        },
    });

    const value = {
        lng,
    };

    return (
        <NotificationPageContext.Provider value={value}>
            <div className='pr-2 flex'>
                <div className='col-7'>
                    <div className='flex align-items-center gap-3 mb-3'>
                        <div
                            className={classNames('flex p-ripple px-5 py-2 border-round-3xl cursor-pointer', {
                                'bg-primary': tab == 'NT',
                                'surface-400': tab != 'NT',
                            })}
                            onClick={() => setTab('NT')}
                        >
                            {t('common:notification')}
                            <Ripple />
                        </div>

                        <div
                            className={classNames('flex p-ripple px-5 py-2 border-round-3xl cursor-pointer', {
                                'surface-400': tab != 'IV',
                                'bg-primary': tab == 'IV',
                            })}
                            onClick={() => setTab('IV')}
                        >
                            {t('common:invite')}
                            <Ripple />
                        </div>
                    </div>

                    {tab == 'NT' && <NotificationTab />}

                    {tab == 'IV' && <InviteTab />}
                </div>

                <div className='col-5'>
                    <Card title={t('module:field.notification.recent')} className='relative overflow-hidden'>
                        <Loader show={isLoading} />

                        <div className='flex flex-column gap-5'>
                            {data?.data?.map((notification) => (
                                <div key={notification.id} className='flex gap-3 cursor-pointer'>
                                    <Image
                                        src={notification.image?.path}
                                        alt='hi'
                                        width='100'
                                        imageClassName='shadow-3 border-round'
                                    />

                                    <div className='flex flex-column justify-content-between flex-1'>
                                        <Link
                                            href={language.addPrefixLanguage(
                                                lng,
                                                `${ROUTES.information.notification}/${notification.id}`,
                                            )}
                                            className='text-900 font-semibold no-underline hover:text-primary'
                                        >
                                            {notification.name}
                                        </Link>

                                        <p className='text-right text-xs'>
                                            {moment(notification.lastModifiedDate).format('DD/MM/YYYY')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </NotificationPageContext.Provider>
    );
};

export default NotificationPage;
export { NotificationPageContext };
