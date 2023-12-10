import { useGetList, useGetListMulti } from '@assets/hooks/useGet';
import { Card } from 'primereact/card';
import { useContext } from 'react';
import { NotificationPageContext } from '../page';
import { GroupParamType, GroupType, InviteType } from '@assets/interface';

const InviteTab = () => {
    const { lng, tab } = useContext(NotificationPageContext);
    const groupQuery = useGetList<GroupType, GroupParamType>({
        module: 'group',
        params: {
            isGetGroupMe: true,
        },
    });

    return <Card></Card>;
};

export default InviteTab;
