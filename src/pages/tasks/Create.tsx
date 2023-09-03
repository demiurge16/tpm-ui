import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { forkJoin, map } from 'rxjs';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Box, Button, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { CreateTask } from '../../client/types/project/Task';
import { Priority } from '../../client/types/dictionaries/Priority';
import { validateWithSchema } from '../../utils/validate';
import { useTpmClient } from '../../contexts/TpmClientContext';

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [priorities, setPriorities] = useState<Array<Priority>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();
  const { projectId } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateTask = {
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguage: '',
    accuracyId: '',
    industryId: '',
    unitId: '',
    amount: 0,
    expectedStart: new Date(),
    deadline: new Date(),
    budget: 0,
    currencyCode: '',
    priorityId: ''
  };

  const validationSchema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    sourceLanguage: string().required('Source language is required'),
    targetLanguage: string().required('Target language is required'),
    accuracyId: string().required('Accuracy is required'),
    industryId: string().required('Industry is required'),
    unitId: string().required('Unit is required'),
    amount: number().required('Amount is required')
      .min(1, 'Amount must be greater than or equal to 1'),
    expectedStart: date().required('Expected start date is required'),
    deadline: date().required('Deadline is required'),
    budget: number().required('Budget is required')
      .min(0, 'Budget must be greater than or equal to 0'),
    currencyCode: string().required('Currency is required'),
    priorityId: string().required('Priority is required')
  });

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Projects', path: '/projects' },
      { label: 'Project', path: `/projects/${projectId}` },
      { label: 'Create Task', path: '/projects/tasks/create' }
    ]);

    forkJoin({
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      priorities: tpmClient.priorities().all()
    }).subscribe({
      next: (response) => {
        const { accuracies, industries, units, priorities } = response;

        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setPriorities(priorities.items);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = async (values: CreateTask) => {
    if (!projectId) {
      return;
    }

    tpmClient
      .projects()
      .withId(projectId)
      .tasks()
      .create(values)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Project created');
          navigate(`/projects/${projectId}`);
        },
        error: (error) => {
          snackbarContext.showError('Error creating project', error.message);
          setServerError(error.message);
        }
      });
  };

  return (
    <Box>
      <Typography variant="h4">Create new task</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="title" label="Title" required/>
            <TextField name="description" label="Description" multiline required/>
            <AsyncSelectField name="sourceLanguage" label="Source Language" required
              optionsLoader={(search) =>
                tpmClient
                  .languages()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [],
                    filters: [
                      {
                        field: 'name',
                        operator: 'contains',
                        value: search
                      }
                    ]
                  })
                  .pipe(
                    map((response) => {
                      return {
                        items: response.items.map((language) => ({ key: language.code, value: language.name })),
                        currentPage: response.currentPage,
                        totalPages: response.totalPages,
                        totalItems: response.totalItems,
                        hasNextPage: response.hasNextPage,
                        hasPreviousPage: response.hasPreviousPage
                      };
                    }
                  ))
              }
            />
            <AsyncSelectField name="targetLanguage" label="Target Language" required
              optionsLoader={(search) =>
                tpmClient
                  .languages()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [],
                    filters: [
                      {
                        field: 'name',
                        operator: 'contains',
                        value: search
                      }
                    ]
                  })
                  .pipe(
                    map((response) => {
                      return {
                        items: response.items.map((language) => ({ key: language.code, value: language.name })),
                        currentPage: response.currentPage,
                        totalPages: response.totalPages,
                        totalItems: response.totalItems,
                        hasNextPage: response.hasNextPage,
                        hasPreviousPage: response.hasPreviousPage
                      };
                    }
                  ))
              }
            />
            <SelectField name="accuracyId" label="Accuracy" required
              options={accuracies.map((accuracy) => ({ key: accuracy.id, value: accuracy.name }))}
            />
            <SelectField name="industryId" label="Industry" required
              options={industries.map((industry) => ({ key: industry.id, value: industry.name }))}
            />
            <DateTimeField name="expectedStart" label="Expected Start" required/>
            <DateTimeField name="deadline" label="Deadline" required/>
            <SelectField name="unitId" label="Unit" required
              options={units.map((unit) => ({ key: unit.id, value: unit.name }))}
            />
            <NumberField name="amount" label="Amount" required/>
            <NumberField name="budget" label="Budget" required/>
            <AsyncSelectField name="currencyCode" label="Currency" required
              optionsLoader={(search) =>
                tpmClient
                  .currencies()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [],
                    filters: [
                      {
                        field: 'name',
                        operator: 'contains',
                        value: search
                      }
                    ]
                  })
                  .pipe(
                    map((response) => {
                      return {
                        items: response.items.map((currency) => ({ key: currency.code, value: currency.name })),
                        currentPage: response.currentPage,
                        totalPages: response.totalPages,
                        totalItems: response.totalItems,
                        hasNextPage: response.hasNextPage,
                        hasPreviousPage: response.hasPreviousPage
                      }
                    }
                  ))
              }
            />
            <SelectField name="priorityId" label="Priority" required
              options={priorities.map((priority) => ({ key: priority.id, value: priority.name }))}
            />
            
            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />

            <Button type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
            <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
              Reset
            </Button>
          </form>
        )}
      />
    </Box>
  );
};
