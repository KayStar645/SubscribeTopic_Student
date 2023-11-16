import { MenuItemType } from '@assets/types/menu';
import { TFunction } from 'i18next';
import { FaBoxesStacked, FaHouseChimney, FaBell } from 'react-icons/fa6';
import { ROUTES } from '.';

const getAdminMenu = (t: TFunction, lng: string): MenuItemType[] => {
    return [
        {
            code: 'home',
            label: t('menu:home'),
            icon: <FaHouseChimney />,
            parent: 'home',
            to: `/${lng}/${ROUTES.admin.home}`,
        },
        {
            code: 'notification',
            label: t('menu:notification'),
            parent: 'notification',
            icon: <FaBell />,
            to: `/${lng}/${ROUTES.admin.notification}`,
        },
    ];
};

export { getAdminMenu };
