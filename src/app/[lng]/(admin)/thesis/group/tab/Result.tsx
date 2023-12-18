import { useGetList } from '@assets/hooks/useGet';
import { PointParamType, PointType, TeacherType } from '@assets/interface';
import { Loader } from '@resources/components/UI';
import { useContext, useEffect, useState } from 'react';
import { GroupPageContext } from '../[id]/page';

interface TeacherResult {
    teacher: TeacherType;
    score: number;
    studentId: number;
}

const ResultTab = () => {
    const [teacherResult, setTeacherResult] = useState<any[]>([]);
    const { topic, active } = useContext(GroupPageContext);
    const [teacher, setTeacher] = useState<string[]>([]);

    const pointQuery = useGetList<PointType, PointParamType>({
        module: 'point_by_thesis',
        enabled: active === 'point',
        params: {
            thesisId: topic?.id,
        },
    });

    useEffect(() => {
        if (pointQuery.response?.data) {
            let result: any[] = [];
            let _teacher: string[] = [];

            pointQuery.response?.data.forEach((t) => {
                _teacher = [];

                result.push({
                    internalCode: t.studentJoin?.student.internalCode,
                    name: t.studentJoin?.student.name,
                    avg: t.averageScore,
                    scores: t.scores?.map((t) => ({
                        teacherId: t.teacher.id,
                        score: t.score,
                    })),
                });

                t.scores?.forEach((score) => {
                    _teacher.push(score.teacher.name!);
                });
            });

            setTeacherResult(result);
            setTeacher(_teacher);
        }
    }, [pointQuery.response?.data]);

    return (
        <div className='flex flex-column gap-3 bg-white border-round shadow-1 p-3'>
            <Loader show={pointQuery.isFetching} />

            <div className='border-round overflow-hidden shadow-3'>
                <table className='w-full' style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th className='border-1 border-300 p-3 bg-primary'>Mã sinh viên</th>
                            <th className='border-1 border-300 p-3 bg-primary'>Tên sinh viên</th>
                            {teacher.map((name) => (
                                <th className='border-1 border-300 p-3 bg-primary' key={name}>
                                    {name}
                                </th>
                            ))}
                            <th className='border-1 border-300 p-3 bg-primary'>Điểm trung bình</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teacherResult.map((result) => (
                            <tr key={result.internalCode}>
                                <td className='border-1 border-300 p-3'>{result.internalCode}</td>
                                <td className='border-1 border-300 p-3'>{result.name}</td>

                                {result.scores.map((field: any) => (
                                    <td className='border-1 border-300 p-3' key={field.teacherId}>
                                        <p className='text-center'>{field.score > 0 ? field.score : '-'}</p>
                                    </td>
                                ))}

                                <td className='border-1 border-300 p-3'>
                                    <p className='text-center'>{result.avg > 0 ? result.avg : '-'}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultTab;
