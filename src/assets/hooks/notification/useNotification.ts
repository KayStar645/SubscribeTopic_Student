import { API } from '@assets/configs';
import { request } from '@assets/helpers';
import { NotificationType } from '@assets/interface';
import { useQuery } from '@tanstack/react-query';

const useGetNotifications = () => {
    return useQuery({
        refetchOnWindowFocus: false,
        queryKey: ['notifications', 'list'],
        select: (response) => response.data.data,
        queryFn: () => {
            return request.get<NotificationType[]>(API.admin.notification);
        },
    });
};

export { useGetNotifications };
