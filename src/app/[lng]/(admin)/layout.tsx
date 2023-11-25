'use client';

import { PageProps } from '@assets/types/UI';
import { Sidebar } from '@resources/components/layout';
import { Divider } from 'primereact/divider';
import { ToastContainer } from 'react-toastify';

const AdminLayout = ({ children, params: { lng } }: PageProps) => {
    return (
        <body className='min-h-screen overflow-hidden m-0 pl-2' style={{ background: '#f6f6f3' }}>
            <div className='flex'>
                <Sidebar lng={lng} />

                <div className='py-6'>
                    <Divider layout='vertical' />
                </div>

                <div className='flex-1'>
                    <div className='py-3 overflow-auto h-screen pr-2'>{children}</div>
                </div>
            </div>

            <ToastContainer />
        </body>
    );
};

export default AdminLayout;
