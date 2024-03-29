import { MetaType, ParamType } from '@assets/types/request';
import moment from 'moment';

const AUTH_TOKEN = 'auth_token';
const AUTH_RAW_TOKEN = 'auth_raw_token';
const LANGUAGE_EXPIRE = moment().add({ days: 365 }).toDate().getDay();
const TOKEN_EXPIRE = moment().add({ minute: 600 }).toDate().getMinutes();
const ROWS_PER_PAGE = [10, 20, 30];

const DEFAULT_META: MetaType = {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    messages: [],
    pageSize: 10,
    totalCount: 1,
    totalPages: 1,
};

const DEFAULT_PARAMS: ParamType = {
    page: 1,
    pageSize: 10,
    sorts: '-DateCreated',
};

export { AUTH_TOKEN, LANGUAGE_EXPIRE, TOKEN_EXPIRE, ROWS_PER_PAGE, DEFAULT_META, AUTH_RAW_TOKEN, DEFAULT_PARAMS };
