import { ROUTES } from '@assets/configs';
import { language } from '@assets/helpers';
import { useGetList } from '@assets/hooks/useGet';
import { NotificationType } from '@assets/interface';
import { Loader } from '@resources/components/UI';
import Link from 'next/link';
import { Image } from 'primereact/image';
import { useContext } from 'react';
import { NotificationPageContext } from '../page';

const NotificationTab = () => {
    const { isLoading, data } = useGetList<NotificationType>({ module: 'notification' });

    const { lng } = useContext(NotificationPageContext);

    return (
        <div className='flex flex-column gap-5'>
            <Loader show={isLoading} />

            {data?.map((notification) => (
                <div key={notification.id} className='flex gap-3 cursor-pointer'>
                    <Image src={notification.image} alt='hi' width='150' className='shadow-3 border-round' />

                    <Link
                        href={language.addPrefixLanguage(lng, `${ROUTES.information.notification}/${notification.id}`)}
                        className='text-900 font-semibold no-underline hover:text-primary'
                    >
                        {notification.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default NotificationTab;
