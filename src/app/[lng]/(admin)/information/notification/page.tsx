'use client';

import { PageProps } from '@assets/types/UI';
import { Card } from 'primereact/card';
import { Ripple } from 'primereact/ripple';
import { createContext, useState } from 'react';
import NotificationTab from './tab/Notification';
import InviteTab from './tab/Invite';
import { classNames } from 'primereact/utils';
import { useQuery } from '@tanstack/react-query';
import { NotificationType } from '@assets/interface';
import { API, ROUTES } from '@assets/configs';
import { language, request } from '@assets/helpers';
import { Loader } from '@resources/components/UI';
import { Image } from 'primereact/image';
import Link from 'next/link';
import { useGetList } from '@assets/hooks/useGet';

interface NotificationPageContextType {
    lng: string;
}

const NotificationPageContext = createContext<NotificationPageContextType>({
    lng: '',
});

const NotificationPage = ({ params: { lng } }: PageProps) => {
    const [tab, setTab] = useState<'NT' | 'IV'>('NT');
    const value = {
        lng,
    };
    const { isLoading, data } = useGetList<NotificationType>({ module: 'notification' });

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
                            Thông báo
                            <Ripple />
                        </div>

                        <div
                            className={classNames('flex p-ripple px-5 py-2 border-round-3xl cursor-pointer', {
                                'surface-400': tab != 'IV',
                                'bg-primary': tab == 'IV',
                            })}
                            onClick={() => setTab('IV')}
                        >
                            Lời mời
                            <Ripple />
                        </div>
                    </div>

                    <Card className='relative overflow-hidden'>
                        {tab == 'NT' && <NotificationTab />}

                        {tab == 'IV' && <InviteTab />}
                    </Card>
                </div>

                <div className='col-5'>
                    <Card title='Thông báo mới trong tuần' className='relative overflow-hidden'>
                        <Loader show={isLoading} />

                        <div className='flex flex-column gap-5'>
                            {data?.map((notification) => (
                                <div key={notification.id} className='flex gap-3 cursor-pointer'>
                                    <Image
                                        src={notification.image}
                                        alt='hi'
                                        width='150'
                                        className='shadow-3 border-round'
                                    />

                                    <Link
                                        href={language.addPrefixLanguage(
                                            lng,
                                            `${ROUTES.information.notification}/${notification.id}`,
                                        )}
                                        className='text-900 font-semibold no-underline hover:text-primary'
                                    >
                                        {notification.name}
                                    </Link>
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
