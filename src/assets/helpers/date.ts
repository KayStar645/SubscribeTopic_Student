import { eachDayOfInterval, endOfWeek, setDefaultOptions, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

setDefaultOptions({
    locale: vi,
    weekStartsOn: 1,
});

const CURR_DATE = new Date();
const START_OF_WEEK = startOfWeek(CURR_DATE);
const END_OF_WEEK = endOfWeek(CURR_DATE);

const DATES_IN_WEEK: Date[] = eachDayOfInterval({
    start: START_OF_WEEK,
    end: END_OF_WEEK,
});

export { CURR_DATE, DATES_IN_WEEK, START_OF_WEEK, END_OF_WEEK };
