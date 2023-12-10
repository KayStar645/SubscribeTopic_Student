import { MenuItemType } from '@assets/types/menu';
import { TFunction } from 'i18next';
import { FaBookJournalWhills, FaBoxesStacked, FaHouseChimney } from 'react-icons/fa6';
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
        {
            code: 'thesis',
            label: t('menu:thesis'),
            parent: 'thesis',
            icon: <FaBookJournalWhills />,
            permission: '',
            checkPermission: true,
            to: '',
            items: [
                {
                    code: 'register_topic',
                    parent: 'thesis',
                    label: t('menu:register_topic'),
                    to: `/${lng}/${ROUTES.thesis.register_topic}`,
                    checkPermission: false,
                },
                {
                    code: 'group',
                    parent: 'thesis',
                    label: t('menu:group'),
                    to: `/${lng}/${ROUTES.thesis.group}`,
                    permission: PERMISSION.group.view,
                    checkPermission: true,
                },
                {
                    code: 'invite',
                    parent: 'thesis',
                    label: t('menu:invite'),
                    to: `/${lng}/${ROUTES.thesis.invite}`,
                    permission: PERMISSION.invite.view,
                    checkPermission: true,
                },
            ],
        },
    ];
};

export { ADMIN_MENU };
