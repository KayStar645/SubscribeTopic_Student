import { MenuItemType } from '@assets/types/menu';
import { TFunction } from 'i18next';
import { FaArrowRightArrowLeft, FaArrowRightFromBracket, FaUser } from 'react-icons/fa6';
import { LuLanguages } from 'react-icons/lu';
import { LANGUAGE, LANGUAGES, ROUTES } from '.';

const getUserMenu = (t: TFunction, lng: string): MenuItemType[] => {
    const currLanguage = LANGUAGE[lng.toUpperCase()].label || t('language');

    return [
        {
            code: 'info',
            parent: 'info',
            label: t('menu:info'),
            icon: <FaUser />,
        },
        {
            code: lng || 'language',
            parent: lng || 'language',
            label: currLanguage,
            icon: <LuLanguages />,
            items: LANGUAGES.map((t) => ({
                ...t,
                parent: 'language',
            })),
        },
        {
            code: 'logout',
            parent: 'logout',
            label: t('menu:logout'),
            icon: <FaArrowRightFromBracket />,
        },
    ];
};

export { getUserMenu };
