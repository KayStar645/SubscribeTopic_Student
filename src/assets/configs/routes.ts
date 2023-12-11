const ROUTES = {
    base: 'https://localhost:7155/api',

    home: {
        index: '/home',
    },

    information: {
        notification: '/information/notification',
    },

    thesis: {
        group: '/thesis/group',
        student_join: '/thesis/student_join',
        register_topic: '/thesis/register_topic',
        invite: 'thesis/invite',
        job_detail: '/thesis/group/job',
    },

    external: {
        exercise: '/thesis/group/exercise',
    },

    auth: {
        sign_in: '/auth/sign-in',
    },
};

export { ROUTES };
