'use client';

import { date } from '@assets/helpers';
import { differenceInMinutes, format, getDay, isWithinInterval, max, min, set } from 'date-fns';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Loader } from '.';

interface DataType {
    label: string;
    address: string;
    start: Date;
    end: Date;
}

const test_data: DataType[] = [
    {
        label: 'daily meeting',
        address: 'A120',
        start: new Date(2023, 11, 11, 6, 15),
        end: new Date(2023, 11, 11, 8, 30),
    },
    {
        label: 'daily meeting',
        address: 'A120',
        start: new Date(2023, 11, 12, 8, 30),
        end: new Date(2023, 11, 12, 8, 45),
    },
    {
        label: 'daily meeting',
        address: 'A120',
        start: new Date(2023, 11, 13, 6),
        end: new Date(2023, 11, 13, 8, 30),
    },
    {
        label: 'daily meeting',
        address: 'A120',
        start: new Date(2023, 11, 14, 13),
        end: new Date(2023, 11, 14, 15, 30),
    },
    {
        label: 'daily meeting',
        address: 'A120',
        start: new Date(2023, 11, 10, 6),
        end: new Date(2023, 11, 10, 8, 30),
    },
];

const FullCalendar = () => {
    const dateRefs = useRef<HTMLDivElement[] | null[]>([]);
    const [show, setShow] = useState(false);

    const validData = test_data.filter((t) =>
        isWithinInterval(t.start, {
            start: date.START_OF_WEEK,
            end: date.END_OF_WEEK,
        }),
    );

    const minStart = min(validData.map((t) => t.start));
    const maxEnd = max(validData.map((t) => t.end));

    const timeLines: (string | undefined)[] = useMemo(() => {
        let result: (string | undefined)[] = [];

        const date1 = set(date.CURR_DATE, {
            hours: maxEnd.getHours(),
            minutes: maxEnd.getMinutes(),
        });

        const date2 = set(date.CURR_DATE, {
            hours: minStart.getHours(),
            minutes: minStart.getMinutes(),
        });

        for (let hour = date2.getHours(); hour <= date1.getHours(); hour++) {
            const stringHour = hour.toString().padStart(2, '0');

            result.push(`${stringHour}:00`);

            for (let j = 15; j < 60; j += 15) {
                result.push(undefined);
            }
        }

        return result;
    }, [maxEnd, minStart]);

    const CalendarItem = ({ item }: { item: DataType }) => {
        const index = getDay(item.start) - 1;
        const parent = dateRefs.current[index]!;

        const diffHours = item.start.getHours() - minStart.getHours();
        const diffMinutes = item.start.getMinutes() - minStart.getMinutes();

        const target = `calendar-item-${Math.floor(Math.random() * 1000)}`;

        // bonus size
        const bonusHeight = item.start.getMinutes();
        const bonusTop = diffHours * 45 + diffHours * 22.4 + diffMinutes + 22.4;

        // size
        const height = differenceInMinutes(item.end, item.start) + bonusHeight;
        const left = parent?.offsetLeft + 4;
        const top = parent?.offsetHeight + bonusTop + 20;
        const width = parent?.offsetWidth - 10;

        return (
            <>
                <div
                    style={{ height, left, top, width }}
                    className={classNames('bg-red-400 absolute border-round px-3 py-2 overflow-hidden', target)}
                >
                    <p>{item.label}</p>
                    <p>{item.address}</p>
                    <p>{format(item.start, 'HH:mm')}</p>
                    <p>{format(item.end, 'HH:mm')}</p>

                    <Tooltip target={`.${target}`} mouseTrack={true} mouseTrackLeft={20}>
                        <p>{item.label}</p>
                        <p>{item.address}</p>
                        <p>{format(item.start, 'HH:mm')}</p>
                        <p>{format(item.end, 'HH:mm')}</p>
                    </Tooltip>
                </div>
            </>
        );
    };

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div className='border-round overflow-hidden shadow-3'>
            <div className='flex align-items-center justify-content-between relative'>
                <div className='bg-primary text-center border-right-1 border-400 h-3rem w-4rem'></div>
                {date.DATES_IN_WEEK.map((_date, index) => (
                    <div
                        key={_date.toString()}
                        ref={(ref) => (dateRefs.current[index] = ref)}
                        className={classNames(
                            'bg-primary flex-1 text-center border-400 h-3rem flex align-items-center justify-content-center',
                            {
                                'border-right-1': index < 6,
                            },
                        )}
                    >
                        {format(_date, 'dd/MM/yyyy')}
                    </div>
                ))}

                {show && validData.map((item) => <CalendarItem item={item} key={item.start.toString()} />)}
            </div>

            <div className='bg-white'>
                {timeLines.map((timeLine, index) => (
                    <div key={Math.random().toString()} className='flex align-items-center justify-content-between'>
                        <div
                            className={classNames('bg-primary w-4rem border-400 text-center', {
                                'border-top-1 ': !!timeLine,
                                'border-right-1': index < 6,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-right-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                        <div
                            className={classNames('flex-1 border-400', {
                                'text-white': timeLine,
                            })}
                            style={{
                                height: timeLine ? 22.4 : 15,
                            }}
                        >
                            {timeLine ? '.' : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullCalendar;
