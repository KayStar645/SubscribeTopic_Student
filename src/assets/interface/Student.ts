import { ParamType } from '@assets/types/request';
import { GeneralType } from './Default';

interface StudentType extends GeneralType {
    dateOfBirth?: Date | null;
    gender?: string;
    class?: string;
    phoneNumber?: string;
    email?: string;
    majorId?: string | number;
    studentJoinId?: number;
    status?: string;
}

interface StudentParamType extends ParamType {
    isGetMajor?: boolean;
    industryId?: boolean;
    majorId?: boolean;
}

export type { StudentType, StudentParamType };
