import { AUTH_TOKEN, FACULTY_TOKEN, USER, getAdminMenu, getUserMenu } from '@assets/configs';
import { LanguageType } from '@assets/types/lang';
import { useTranslation } from '@resources/i18n';
import { MenuItem } from '../UI';
import { Avatar } from 'primereact/avatar';
import { useEffect, useRef, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { OverlayPanel } from 'primereact/overlaypanel';
import menuSlice from '@assets/redux/slices/menu/slice';
import { MenuItemType } from '@assets/types/menu';
import { useDispatch } from '@assets/redux';

const Menu = ({ lng }: LanguageType) => {
    const { t } = useTranslation(lng);
    const adminMenu = getAdminMenu(t, lng);
    const userMenu = getUserMenu(t, lng);
    const [user, setUser] = useState({ userName: '' });
    const userModalRef = useRef<OverlayPanel>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(getCookie(AUTH_TOKEN) ? JSON.parse(getCookie(AUTH_TOKEN)!) : '');
    }, []);

    const renderItem = (item: MenuItemType) => {
        const onLogoutClick = () => {
            deleteCookie(AUTH_TOKEN);
            deleteCookie(USER);
            deleteCookie(FACULTY_TOKEN);
            dispatch(menuSlice.actions.onItemClick({ activeItem: 'home', openMenu: false, parent: '' }));
        };

        return (
            <MenuItem
                key={item.code}
                {...item}
                onItemClick={() => {
                    let event = () => {};

                    if (item.code === 'logout') {
                        event = onLogoutClick;
                    }

                    event();
                }}
            />
        );
    };

    return (
        <div className='flex flex-column gap-2 w-15rem h-screen relative ' style={{ zIndex: 1000 }}>
            <ul className='p-2 pt-0 overflow-y-auto h-full'>
                <div
                    className='flex align-items-center gap-2 hover:surface-hover cursor-pointer p-1 pr-3 bg-white mb-4'
                    style={{ borderRadius: 9999 }}
                    onClick={(e) => userModalRef?.current?.toggle(e)}
                >
                    <Avatar icon='pi pi-user' className='bg-primary text-white border-circle' size='large' />
                    <div className='flex-1'>
                        <p className='text-sm text-600 pb-1'>{t('common:hello')}</p>
                        <p className='text-sm font-semibold'>{user.userName}</p>
                    </div>

                    <i className='pi pi-angle-down ml-2' />
                </div>

                {adminMenu.map((item) => (
                    <MenuItem key={item.code} {...item} />
                ))}
            </ul>

            <OverlayPanel ref={userModalRef} className='px-2 py-1'>
                {userMenu.map(renderItem)}
            </OverlayPanel>
        </div>
    );
};

export default Menu;
