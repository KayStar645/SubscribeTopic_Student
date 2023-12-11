import { PageProps } from '@assets/types/UI';
import Chart from '@resources/components/layout/Chart';
import { useTranslation } from '@resources/i18n';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';

const HomePage = ({ params: { lng } }: PageProps) => {
    const { t } = useTranslation(lng);

    return (
        <div className='flex align-items-start gap-3'>
            <div className='flex-1'>
                <div className='flex align-items-center justify-content-between'>
                    <div className='col-6'>
                        <span className='p-input-icon-left'>
                            <i className='pi pi-search' />
                            <InputText placeholder={t('common:search')} className='border-round-3xl w-20rem' />
                        </span>
                    </div>

                    <div className='col-6 flex justify-content-end'>
                        <AvatarGroup>
                            <Avatar label='A' className='border-circle w-3rem h-3rem' />
                            <Avatar label='B' className='border-circle w-3rem h-3rem' />
                            <Avatar label='C' className='border-circle w-3rem h-3rem' />
                            <Button label='Thêm thành viên' size='small' rounded={true} />
                        </AvatarGroup>
                    </div>
                </div>

                <div className='flex mt-5 flex-wrap gap-3'>
                    <div className='flex-1 flex flex-column gap-3'>
                        <Card title='Sắp đến hạn' subTitle='Danh sách bài tập đến hạn'>
                            <div className='flex gap-3 mb-4'>
                                <Skeleton width='3rem' height='3rem' />

                                <div className='flex-1'>
                                    <Skeleton className='mb-2' />
                                    <Skeleton className='mb-2' />
                                </div>
                            </div>
                            <div className='flex gap-3 mb-4'>
                                <Skeleton width='3rem' height='3rem' />

                                <div className='flex-1'>
                                    <Skeleton className='mb-2' />
                                    <Skeleton className='mb-2' />
                                </div>
                            </div>
                        </Card>

                        <Card title='Hoàn thành' subTitle='Danh sách bài tập đã hoàn thành'>
                            <div className='flex gap-3 mb-4'>
                                <Skeleton width='3rem' height='3rem' />

                                <div className='flex-1'>
                                    <Skeleton className='mb-2' />
                                    <Skeleton className='mb-2' />
                                </div>
                            </div>
                            <div className='flex gap-3 mb-4'>
                                <Skeleton width='3rem' height='3rem' />

                                <div className='flex-1'>
                                    <Skeleton className='mb-2' />
                                    <Skeleton className='mb-2' />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className='h-full'>
                        <Card title='Điểm phản biện' className='h-full'>
                            <Chart />
                        </Card>
                    </div>

                    <div className='w-full'>
                        <Card title='Phản biện' subTitle='Lịch phản biện diễn ra trong 1 tuần'></Card>
                    </div>
                </div>
            </div>

            <div className='col-4'>
                <Card title='Thông báo' subTitle='3 thông báo mới từ khoa' className='mb-3'>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                </Card>

                <Card title='Đề tài' subTitle='3 đề tài vừa được duyệt'>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                    <div className='flex gap-3 mb-4'>
                        <Skeleton width='10rem' height='4rem' />
                        <div className='flex-1'>
                            <Skeleton className='mb-2' />
                            <Skeleton className='mb-2' />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;
