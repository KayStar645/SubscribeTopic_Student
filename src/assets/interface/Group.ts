import { ParamType } from '@assets/types/request';
import { GeneralType, StudentType } from '.';

interface GroupType extends GeneralType {
    countMember?: string | number;
    leaderId?: string | number;
    leader?: any;
    members?: {
        student?: StudentType;
    }[];
}

interface GroupParamType extends ParamType {
    isGetLeader?: boolean;
    isGetGroupMe?: boolean;
}

export type { GroupParamType, GroupType };
