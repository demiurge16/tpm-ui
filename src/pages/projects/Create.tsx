import { useContext, useEffect, useState } from 'react';
import { CreateProject } from "../../client/types/project/Project";
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { useNavigate } from 'react-router-dom';
import TpmClient from '../../client/TpmClient';
import { forkJoin, map } from 'rxjs';
import { Language } from '../../client/types/dictionaries/Language';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Currency } from '../../client/types/dictionaries/Currency';
import { Client } from '../../client/types/client/Client';
import { Box, Button, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, array, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { ValidationErrors } from 'final-form';

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [clients, setClients] = useState<Array<Client>>([]);

  const navigate = useNavigate();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateProject = {
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguages: [],
    accuracyId: '',
    industryId: '',
    unitId: '',
    amount: 0,
    expectedStart: new Date(),
    internalDeadline: new Date(),
    externalDeadline: new Date(),
    budget: 0,
    currencyCode: '',
    clientId: ''
  };

  const validationSchema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    sourceLanguage: string().required('Source language is required'),
    targetLanguages: array().min(1, 'At least one target language is required'),
    accuracyId: string().required('Accuracy is required'),
    industryId: string().required('Industry is required'),
    unitId: string().required('Unit is required'),
    amount: number().required('Amount is required'),
    expectedStart: date().required('Expected start date is required'),
    internalDeadline: date().required('Internal deadline is required'),
    externalDeadline: date().required('External deadline is required'),
    budget: number().required('Budget is required'),
    currencyCode: string().required('Currency is required'),
    clientId: string().required('Client is required')
  });

  const validate = (values: CreateProject): ValidationErrors => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
    } catch (error: any) {
      return error.inner.reduce((errors: any, error: any) => {
        return {
          ...errors,
          [error.path]: error.message
        };
      }, {});
    }
  };

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Projects', path: '/projects' },
      { label: 'Create Project', path: '/projects/create' }
    ]);

    forkJoin({
      accuracies: TpmClient.getInstance().accuracies().all(),
      industries: TpmClient.getInstance().industries().all(),
      units: TpmClient.getInstance().units().all(),
      clients: TpmClient.getInstance().clients().all()
    }).subscribe({
      next: (response) => {
        const { accuracies, industries, units, clients } = response;

        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setClients(clients.items);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = async (values: CreateProject) =>
    TpmClient.getInstance()
      .projects()
      .create(values)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Project created');
          navigate(`/projects/${response.id}`);
        },
        error: (error) => {
          snackbarContext.showError('Error creating project', error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create Project</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="title" label="Title" required/>
            <TextField name="description" label="Description" multiline required/>
            <AsyncSelectField name="sourceLanguage" label="Source Language" required
              optionsLoader={(search) =>
                TpmClient.getInstance()
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
                        totalPages: response.totalPages,
                        totalElements: response.totalElements,
                        items: response.items.map((language) => ({ key: language.code, value: language.name }))
                      }
                    }
                  ))
              }
            />
            <AsyncSelectField name="targetLanguages" label="Target Languages" required multiple
              optionsLoader={(search) =>
                TpmClient.getInstance()
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
                        totalPages: response.totalPages,
                        totalElements: response.totalElements,
                        items: response.items.map((language) => ({ key: language.code, value: language.name }))
                      }
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
            <DateTimeField name="internalDeadline" label="Internal Deadline" required/>
            <DateTimeField name="externalDeadline" label="External Deadline" required/>
            <SelectField name="unitId" label="Unit" required
              options={units.map((unit) => ({ key: unit.id, value: unit.name }))}
            />
            <NumberField name="amount" label="Amount" required/>
            <NumberField name="budget" label="Budget" required/>
            <AsyncSelectField name="currencyCode" label="Currency" required
              optionsLoader={() =>
                TpmClient.getInstance()
                  .currencies()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [],
                    filters: []
                  })
                  .pipe(
                    map((response) => {
                      return {
                        totalPages: response.totalPages,
                        totalElements: response.totalElements,
                        items: response.items.map((currency) => ({ key: currency.code, value: currency.name }))
                      }
                    }
                  ))
              }
            />
            <SelectField name="clientId" label="Client" required
              options={clients.map((client) => ({ key: client.id, value: client.name }))}
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
