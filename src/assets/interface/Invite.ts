import { GroupType } from '.';

interface InviteType {
    message: string;
    studentJoinId: number;
    timeSent?: Date;
    groupId?: GroupType;
}

export type { InviteType };
