'use client';

import { useGetDetail, useGetList } from '@assets/hooks/useGet';
import { GroupType, JobParamType, JobType, TopicType } from '@assets/interface';
import { PageProps } from '@assets/types/UI';
import { OptionType } from '@assets/types/common';
import { Loader } from '@resources/components/UI';
import { useTranslation } from '@resources/i18n';
import { TFunction, t as defaultT } from 'i18next';
import { classNames } from 'primereact/utils';
import { createContext, useMemo, useState } from 'react';
import ExerciseTab from '../tab/ExerciseTab';
import MemberTab from '../tab/MemberTab';
import NewsTab from '../tab/NewsTab';

type GroupPageContextType = {
    id: number;
    t: TFunction;
    lng: string;
    topic?: TopicType | null;
    jobs?: JobType[];
};

const GroupPageContext = createContext<GroupPageContextType>({
    id: 0,
    t: defaultT,
    lng: 'vi',
    topic: null,
    jobs: [],
});

const GroupPage = ({ params }: PageProps) => {
    const { lng, id } = params;
    const { t } = useTranslation(lng);
    const [activeTab, setActiveTab] = useState<string>('news');

    const groupDetail = useGetDetail<GroupType>({
        module: 'group',
        params: {
            id,
            isAllDetail: true,
        },
        enabled: id != '0',
    });

    const topicDetail = useGetDetail<TopicType>({
        module: 'topic',
        params: {
            id: groupDetail.response?.data?.thesisDto?.id,
            isAllDetail: true,
        },
        enabled: !!groupDetail.response?.data?.thesisDto?.id,
    });

    const jobDetail = useGetList<JobType, JobParamType>({
        module: 'job',
        params: {
            thesisId: groupDetail.response?.data?.thesisDto?.id,
            isAllDetail: true,
        },
        enabled: !!groupDetail.response?.data?.thesisDto?.id,
    });

    const TABS: OptionType[] = useMemo(
        () => [
            {
                value: 'news',
                label: 'Bảng tin',
            },
            {
                value: 'exercise',
                label: 'Công việc',
            },
            {
                value: 'member',
                label: 'Thành viên',
            },
        ],
        [],
    );

    const value: GroupPageContextType = {
        id,
        t,
        lng,
        topic: topicDetail.response?.data,
        jobs: jobDetail.response?.data || [],
    };

    return (
        <GroupPageContext.Provider value={value}>
            <Loader show={topicDetail.isFetching || jobDetail.isFetching} />

            <div className='flex align-items-center border-bottom-2 border-200 bg-white border-round overflow-hidden'>
                {TABS.map((tab) => (
                    <div
                        key={tab.value}
                        className={classNames(
                            'px-5 py-3 cursor-pointer hover:text-primary border-bottom-3 border-transparent font-semibold',
                            {
                                'text-900': tab.value != activeTab,
                                'text-primary border-primary': tab.value === activeTab,
                            },
                        )}
                        onClick={() => setActiveTab(tab.value?.toString()!)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            <div
                className='mt-3'
                style={{
                    maxWidth: 1000,
                    margin: '0 auto',
                }}
            >
                {activeTab === 'news' && <NewsTab />}
                {activeTab === 'exercise' && <ExerciseTab />}
                {activeTab === 'member' && <MemberTab />}
            </div>
        </GroupPageContext.Provider>
    );
};

export default GroupPage;
export { GroupPageContext };
