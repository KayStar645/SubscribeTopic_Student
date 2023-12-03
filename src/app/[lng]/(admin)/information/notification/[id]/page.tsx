'use client';

import { HTML } from '@assets/helpers/string';
import { useGetDetail } from '@assets/hooks/useGet';
import { NotificationParamType, NotificationType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import moment from 'moment';
import { Card } from 'primereact/card';

const NotificationDetailPage = ({ params: { id } }: PageProps) => {
    const { data } = useGetDetail<NotificationType, NotificationParamType>({ module: 'notification', params: { id } });

    return (
        <Card
            className='mr-2 relative overflow-hidden'
            title={
                <div className='flex align-items-center justify-content-between'>
                    <p className='flex-1'>{data?.name}</p>
                    <p className='text-sm font-normal text-600'>
                        {moment(data?.lastModifiedDate).format('DD/MM/YYYY')}
                    </p>
                </div>
            }
        >
            <p dangerouslySetInnerHTML={HTML(data?.content)} className='text-900' />
        </Card>
    );
};

export default NotificationDetailPage;
