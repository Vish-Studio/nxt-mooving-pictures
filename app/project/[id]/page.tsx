import { ProjectDetail } from '../../../src/views/project-detail/project-detail';
import { PROJECTS } from '../../../src/constants';

export const dynamicParams = false;

export const generateStaticParams = () => PROJECTS.map(({ id }) => ({ id }));

const ProjectPage = () => {
  return <ProjectDetail />;
};

export default ProjectPage;
