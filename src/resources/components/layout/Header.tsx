import { LanguageType } from '@assets/types/lang';
import { useTranslation } from '@resources/i18n';
import { Avatar } from 'primereact/avatar';
import { Breadcrumb } from '../UI';

const Header = ({ lng }: LanguageType) => {
    const { t } = useTranslation(lng);

    return (
        <div className='flex align-items-center justify-content-between flex-1 h-4rem px-4'>
            {/* <Breadcrumb lng={lng} /> */}

            <div className='flex align-items-center justify-content-end gap-6' style={{ marginRight: '-0.5rem' }}>
                <div className='flex align-items-center gap-2'>
                    <Avatar icon='pi pi-bell' className='bg-primary text-white border-circle' />
                    <p>{t('notification')}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
