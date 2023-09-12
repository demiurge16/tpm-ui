import { createContext, useEffect, useState, useContext } from 'react';
import { Task } from '../../../client/types/task/Task';

interface TaskContextValues {
  task: Task;
  setTask: (task: Task) => void;
}

const defaultTaskContextValues: TaskContextValues = {
  task: {
    id: '',
    title: '',
    description: '',
    sourceLanguage: {
      code: '',
      name: ''
    },
    targetLanguage: {
      code: '',
      name: ''
    },
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
    serviceType: {
      id: '',
      name: '',
      description: ''
    },
    amount: 0,
    expectedStart: new Date(),
    deadline: new Date(),
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
    priority: {
      id: '',
      name: '',
      description: '',
      emoji: '',
      value: 0
    },
    assignee: null,
    project: {
      id: '',
      title: '',
      status: {
        status: 'DRAFT',
        name: '',
        description: ''
      },
    }
  },
  setTask: () => {}
};

export const TaskContext = createContext<TaskContextValues>(
  defaultTaskContextValues
);

interface TaskContextProviderProps {
  children: JSX.Element;
  task: Task;
}

const TaskContextProvider = (props: TaskContextProviderProps) => {
  const [task, setTask] = useState<Task>(props.task);

  useEffect(() => setTask(props.task), [props.task]);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskContextProvider');
  }

  return context;
}