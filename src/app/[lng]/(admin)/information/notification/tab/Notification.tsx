import { ROUTES } from '@assets/configs';
import { language } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { NotificationParamType, NotificationType } from '@assets/interface';
import { Loader } from '@resources/components/UI';
import { Dropdown } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import moment from 'moment';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { useContext, useState } from 'react';
import { NotificationPageContext } from '../page';
import CustomImage from '@resources/components/UI/Image';

const NotificationTab = () => {
    const [notiType, setNotiType] = useState('F');
    const { isLoading, response } = useGetList<NotificationType, NotificationParamType>({
        module: 'notification',
        params: {
            removeFacultyId: notiType == 'F' ? false : true,
        },
    });

    const { lng } = useContext(NotificationPageContext);
    const { t } = useTranslation(lng);

    return (
        <Card
            className='relative overflow-hidden'
            header={
                <div className='px-3 pt-4'>
                    <Dropdown
                        id='noti_type'
                        row={true}
                        label={t('common:type_of', { obj: t('module:notification').toLowerCase() })}
                        value={notiType}
                        options={[
                            { label: t('common:general'), value: 'G' },
                            { label: t('common:by_faculty'), value: 'F' },
                        ]}
                        onChange={(e) => {
                            setNotiType(e);
                        }}
                    />
                </div>
            }
        >
            <div className='flex flex-column gap-5'>
                <Loader show={isLoading} />

                {response?.data?.map((notification) => (
                    <div key={notification.id} className='flex gap-3 cursor-pointer'>
                        <CustomImage
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
    );
};

export default NotificationTab;
