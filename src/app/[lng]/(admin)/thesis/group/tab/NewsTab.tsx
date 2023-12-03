import GroupBackgroundImg from '@resources/image/layout/img_group_bg.jpg';
import { useContext, useMemo } from 'react';
import { GroupPageContext } from '../page';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

const NewsTab = () => {
    const { t } = useContext(GroupPageContext);

    const ITEMS = useMemo(
        () => [
            {
                label: 'Add',
                icon: 'pi pi-pencil',
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh',
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
            },
            {
                label: 'React Website',
                icon: 'pi pi-external-link',
            },
        ],
        [],
    );

    return (
        <div
            style={{
                width: 1000,
                margin: '0 auto',
            }}
        >
            <div
                className='border-round-xl flex flex-column justify-content-between p-3'
                style={{
                    backgroundImage: `url('${GroupBackgroundImg.src}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: 240,
                }}
            >
                <div className='flex-1'></div>
                <div className='text-white'>
                    <p className='font-bold text-3xl mb-2'>Nhóm nghiên cứu thầy thọ</p>
                    <p
                        className='font-semibold text-xl overflow-hidden'
                        style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    >
                        Xây dựng hệ thống quản lý tiến trình khóa luận tốt nghiệp
                    </p>
                </div>
            </div>

            <div className='mt-3 flex gap-3'>
                <div className='w-16rem flex flex-column gap-3'>
                    <div className='shadow-1 border-round p-3 bg-white'>
                        <div className='flex align-items-center justify-content-between relative'>
                            <p className='font-semibold'>
                                {t('common:code_of', { obj: t('module:group').toLowerCase() })}
                            </p>

                            <Tooltip target='.group-action .p-speeddial-action' position='right' />
                            <SpeedDial
                                model={ITEMS}
                                radius={120}
                                direction='down'
                                showIcon='pi pi-ellipsis-v'
                                hideIcon='pi pi-ellipsis-v'
                                className='group-action'
                                buttonClassName='p-button-secondary p-button-icon-only p-button-text p-button-rounded w-3rem h-3rem'
                                style={{ top: '-66%', right: -12 }}
                            />
                        </div>

                        <p className='mt-3 font-semibold text-2xl text-blue-600'>if62qsx</p>
                    </div>

                    <div className='shadow-1 border-round p-3 bg-white flex flex-column gap-3 relative z-5'>
                        <p className='font-semibold'>{t('module:field.group.due_soon')}</p>

                        <p className='text-500 text-sm'>{t('module:field.group.no_due_soon')}</p>

                        <div className='flex justify-content-end'>
                            <p className='text-right font-semibold text-blue-600 cursor-pointer hover:bg-blue-50 px-3 py-2 border-round'>
                                {t('common:see_all')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex-1'>
                    <div className='shadow-1 border-round px-4 py-3 bg-white flex align-items-center gap-3 cursor-pointer hover:bg-blue-50'>
                        <Button icon='pi pi-book' rounded={true} />

                        <div className='flex flex-column gap-2'>
                            <p className='font-semibold text-sm text-900'>Ngô Văn Sơn đã đăng 1 bài tập mới: BT1</p>
                            <p className='text-sm text-700'>23 Thg 2 12:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsTab;
