import { createContext, useEffect, useState, useContext } from 'react';
import { Project } from '../../../../client/types/project/Project';
import { Country } from '../../../../client/types/dictionaries/Country';

interface ProjectContextValues {
  project: Project;
  setProject: (project: Project) => void;
}

const defaultProjectContextValues: ProjectContextValues = {
  project: {
    id: '',
    title: '',
    description: '',
    sourceLanguage: {
      code: '',
      name: ''
    },
    targetLanguages: [],
    accuracy: {
      id: '',
      name: '',
      description: ''
    },
    industry: {
      id: '',
      name: '',
      description: ''
    },
    unit: {
      id: '',
      name: '',
      description: ''
    },
    serviceTypes: [],
    amount: 0,
    expectedStart: new Date(),
    internalDeadline: new Date(),
    externalDeadline: new Date(),
    budget: 0,
    currency: {
      code: '',
      name: ''
    },
    status: {
      status: 'DRAFT',
      title: '',
      description: ''
    },
    client: {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: { } as Country,
      vat: '',
      notes: '',
      type: {
        id: '',
        name: '',
        description: '',
        corporate: false,
      },
      active: false
    }
  },
  setProject: () => {}
};

export const ProjectContext = createContext<ProjectContextValues>(
  defaultProjectContextValues
);

interface ProjectContextProviderProps {
  children: JSX.Element;
  project: Project;
}

const ProjectContextProvider = (
  props: ProjectContextProviderProps
) => {
  const [project, setProject] = useState<Project>(props.project);

  useEffect(() => {
    setProject(props.project);
  }, [props.project]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider');
  }

  return context;
}
