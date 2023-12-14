import FullCalendar from '@resources/components/UI/FullCalendar';
import { Card } from 'primereact/card';

const SchedulePage = () => {
    return (
        <div>
            <Card title='Phản biện' subTitle='Lịch phản biện diễn ra trong 1 tuần'>
                <FullCalendar />
            </Card>
        </div>
    );
};

export default SchedulePage;
