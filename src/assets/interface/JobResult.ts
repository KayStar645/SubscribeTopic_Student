import { ParamType } from '@assets/types/request';
import { GeneralType } from './Default';
import { FileType } from '@assets/types/form';

interface JobResultType extends GeneralType {
    files?: FileType[];
    jobId?: number;
}

interface JobResultParamType extends ParamType {
    jobId: number;
    studentId: number;
}

export type { JobResultParamType, JobResultType };
