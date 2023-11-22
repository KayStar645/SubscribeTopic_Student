import { MenuItemType } from '@assets/types/menu';
import { TFunction } from 'i18next';
import { FaBoxesStacked, FaHouseChimney } from 'react-icons/fa6';
import { PERMISSION, ROUTES } from '.';

const ADMIN_MENU = (t: TFunction, lng: string): MenuItemType[] => {
    return [
        {
            code: 'home',
            label: t('menu:home'),
            icon: <FaHouseChimney />,
            parent: 'home',
            to: `/${lng}/${ROUTES.admin.home}`,
            permission: '',
            checkPermission: true,
        },
        {
            code: 'master_data',
            label: t('menu:master_data'),
            parent: 'master_data',
            icon: <FaBoxesStacked />,
            to: '',
            permission: '',
            checkPermission: true,
            items: [
                {
                    code: 'notification',
                    parent: 'master_data',
                    label: t('menu:notification'),
                    to: `/${lng}/${ROUTES.admin.notification}`,
                    permission: PERMISSION.notification.view,
                    checkPermission: true,
                },
            ],
        },
    ];
};

export { ADMIN_MENU };
