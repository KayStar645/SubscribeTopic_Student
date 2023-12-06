import { PageProps } from '@assets/types/UI';

const ExercisePage = ({ params }: PageProps) => {
    const { id } = params;
    console.log('🚀 ~ file: page.tsx:5 ~ ExercisePage ~ id:', id);

    return <div>hi</div>;
};

export default ExercisePage;
