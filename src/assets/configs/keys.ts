const list = (params: any) => ({
    notification: ['notifications', 'list', params],
    faculty: ['faculties', 'list', params],
    industry: ['industries', 'list', params],
    major: ['majors', 'list', params],
    department: ['departments', 'list', params],
    teacher: ['teachers', 'list', params],
    student: ['students', 'list', params],
    registration_period: ['registration_periods', 'list', params],
    group: ['groups', 'list', params],
    thesis: ['thesis', 'list', params],
    role: ['roles', 'list', params],
    student_join: ['student_joins', 'list', params],
    register_topic: ['register_topics', 'list', params],
    invitation: ['invitations', 'list', params],
    student_by_period: ['student_by_periods', 'list', params],
});

const detail = () => ({
    notification: ['notification_detail', 'detail'],
    faculty: ['faculty_detail', 'detail'],
    industry: ['industry_detail', 'detail'],
    major: ['major_detail', 'detail'],
    department: ['department_detail', 'detail'],
    teacher: ['teacher_detail', 'detail'],
    student: ['student_detail', 'detail'],
    registration_period: ['registration_period_detail', 'detail'],
    group: ['group_detail', 'detail'],
    thesis: ['thesis_detail', 'detail'],
    role: ['role_detail', 'detail'],
    student_join: ['student_join_detail', 'detail'],
});

export { list, detail };
