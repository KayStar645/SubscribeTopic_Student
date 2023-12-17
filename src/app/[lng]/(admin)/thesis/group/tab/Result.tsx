import { useGetList } from '@assets/hooks/useGet';
import { PointParamType, PointType, TeacherType } from '@assets/interface';
import { Loader } from '@resources/components/UI';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useContext, useEffect, useState } from 'react';
import { GroupPageContext } from '../[id]/page';

interface TeacherResult {
    teacher: TeacherType;
    score: number;
    studentId: number;
}

const ResultTab = () => {
    const [teacherResult, setTeacherResult] = useState<TeacherResult[]>([]);
    const { topic, active } = useContext(GroupPageContext);

    const pointQuery = useGetList<PointType, PointParamType>({
        module: 'point_by_thesis',
        enabled: active === 'point',
        params: {
            thesisId: topic?.id,
        },
    });

    useEffect(() => {
        if (pointQuery.response?.data) {
            let result: TeacherResult[] = [];

            pointQuery.response?.data.forEach((t) => {
                result = [];

                t.scores?.map((score) => {
                    result.push({
                        teacher: score.teacher,
                        score: score.score,
                        studentId: t.studentJoinId!,
                    });
                });
            });

            setTeacherResult(result);
        }
    }, [pointQuery.response?.data]);

    return (
        <div className='flex flex-column gap-3 bg-white border-round shadow-1 p-3'>
            <Loader show={pointQuery.isFetching} />

            <DataTable
                value={pointQuery.response?.data || []}
                tableStyle={{ minWidth: '50rem' }}
                className='border-round overflow-hidden'
            >
                <Column
                    alignHeader='center'
                    headerStyle={{
                        background: 'var(--primary-color)',
                        color: 'var(--surface-a)',
                        whiteSpace: 'nowrap',
                    }}
                    header='Mã sinh viên'
                    field='studentJoin.student.internalCode'
                />
                <Column
                    alignHeader='center'
                    headerStyle={{
                        background: 'var(--primary-color)',
                        color: 'var(--surface-a)',
                        whiteSpace: 'nowrap',
                    }}
                    header='Tên sinh viên'
                    field='studentJoin.student.name'
                />

                {teacherResult.map((field) => (
                    <Column
                        key={field.teacher.id}
                        alignHeader='center'
                        headerStyle={{
                            background: 'var(--primary-color)',
                            color: 'var(--surface-a)',
                            whiteSpace: 'nowrap',
                        }}
                        header={field.teacher.name}
                        body={() => <p className='text-center'>{field.score > 0 ? field.score : ''}</p>}
                    />
                ))}

                <Column
                    alignHeader='center'
                    headerStyle={{
                        background: 'var(--primary-color)',
                        color: 'var(--surface-a)',
                        whiteSpace: 'nowrap',
                    }}
                    header='Điểm trung bình'
                    body={(data) => <p className='text-center'>{data.averageScore}</p>}
                />
            </DataTable>
        </div>
    );
};

export default ResultTab;
