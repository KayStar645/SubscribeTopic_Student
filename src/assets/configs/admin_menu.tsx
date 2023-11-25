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
            to: `/${lng}/${ROUTES.home.index}`,
            permission: '',
            checkPermission: true,
        },
        {
            code: 'information',
            label: t('menu:information'),
            parent: 'information',
            icon: <FaBoxesStacked />,
            to: '',
            permission: '',
            checkPermission: true,
            items: [
                {
                    code: 'notification',
                    parent: 'information',
                    label: t('menu:notification'),
                    to: `/${lng}/${ROUTES.information.notification}`,
                    permission: PERMISSION.notification.view,
                    checkPermission: true,
                },
            ],
        },
    ];
};

export { ADMIN_MENU };
