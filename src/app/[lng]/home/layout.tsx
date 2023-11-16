'use client';

import { PageProps } from '@assets/types/UI';
import { Header, Sidebar } from '@resources/components/layout';
import { Divider } from 'primereact/divider';
import { ToastContainer } from 'react-toastify';

const HomeLayout = ({ children, params: { lng } }: PageProps) => {
    // const selectFacultyRef = useRef<SelectFacultyModalRefType>(null);

    // useEffect(() => {
    //     if (!getCookie(FACULTY_TOKEN)) {
    //         selectFacultyRef.current?.show();
    //     }
    // }, []);

    return (
        <body className='min-h-screen overflow-hidden m-0 pl-2' style={{ background: '#f6f6f3' }}>
            <div className='flex'>
                <Sidebar lng={lng} />

                <div className='py-6'>
                    <Divider layout='vertical' />
                </div>

                <div className='flex-1'>
                    {/* <Header lng={lng} /> */}
                    <div className='pt-3 overflow-auto h-screen pr-2'>{children}</div>
                </div>
            </div>

            <ToastContainer />

            {/* <SelectFacultyModal
                ref={selectFacultyRef}
                lng={lng}
                onConfirm={(item) => {
                    setCookie(FACULTY_TOKEN, item);
                }}
            /> */}
        </body>
    );
};

export default HomeLayout;
