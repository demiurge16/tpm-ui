import axios, { AxiosResponse, ResponseType } from "axios";
import { environment } from "../Environment";
import { Observable } from "rxjs";
import { Page } from "./types/common/Page";
import { Search } from "./types/common/Search";
import { CreateProject, ProjectDeadlineMoved, ProjectMoveDeadline, ProjectMoveStart, ProjectNewStatus, Project, ProjectStartMoved, ProjectStatus, UpdateProject } from "./types/project/Project";
import { CreateTeamMember, ProjectRole, TeamMember } from "./types/project/TeamMember";
import { CreateTask } from "./types/project/Task";
import { Assign, Assigned, ChangePriority, PriorityChanged, Task, TaskDeadlineMoved, TaskMoveDeadline, TaskMoveStart, TaskNewStatus, TaskStartMoved, TaskStatus, UpdateTask } from "./types/task/Task";
import { Expense } from "./types/expense/Expense";
import { CreateExpense } from "./types/project/Expense";
import { CreateReply, Reply, ReplyDislike, ReplyDislikeRemoved, ReplyLike, ReplyLikeRemoved, Thread, ThreadDislike, ThreadDislikeRemoved, ThreadLike, ThreadLikeRemoved, ThreadNewStatus, UpdateReply, UpdateThread } from "./types/thread/Thread";
import { CreateThread } from "./types/project/Thread";
import { Client, ClientStatus, CreateClient, UpdateClient } from "./types/client/Client";
import { ClientType, ClientTypeStatus, CreateClientType, UpdateClientType } from "./types/client/ClientType";
import { Accuracy, AccuracyStatus, CreateAccuracy, UpdateAccuracy } from "./types/dictionaries/Accuracy";
import { Country } from "./types/dictionaries/Country";
import { Currency, CurrencyExchangeRates } from "./types/dictionaries/Currency";
import { CreateExpenseCategory, ExpenseCategory, ExpenseCategoryStatus, UpdateExpenseCategory } from "./types/dictionaries/ExpenseCategory";
import { CreateIndustry, Industry, IndustryStatus, UpdateIndustry } from "./types/dictionaries/Industry";
import { Language, LanguageScope, LanguageType } from "./types/dictionaries/Language";
import { CreatePriority, Priority, PriorityStatus, UpdatePriority } from "./types/dictionaries/Priority";
import { CreateUnit, Measurement, Unit, UnitStatus, UpdateUnit } from "./types/dictionaries/Unit";
import { User } from "./types/user/User";
import { File } from "./types/file/File";
import { CreateServiceType, ServiceType, ServiceTypeStatus, UpdateServiceType } from "./types/dictionaries/ServiceType";

function toObservable<T>(promise: Promise<AxiosResponse<T>>): Observable<T> {
  return new Observable((observer) => {
    promise
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}

function getResource<TResponse>(
  path: string,
  search?: Partial<Search>,
  config?: {
    responseType?: ResponseType;
    headers?: object;
  }
): Observable<TResponse> {
  const params = search
    ? {
        page: search.page,
        size: search.pageSize,
        sort:
          search.sort &&
          search.sort.map((s) => `${s.field}:${s.direction}`).join("&"),
        search:
          search.filters &&
          search.filters
            .map((f) => `${f.field}:${f.operator}:${f.value || ""}`)
            .join("&"),
      }
    : undefined;

  return toObservable(
    axios.get(`${environment.apiUrl}/${path}`, {
      params: params,
      responseType: config?.responseType,
      headers: config?.headers,
    })
  );
}

function postResource<TRequest, TResponse>(
  path: string,
  body: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.post(`${environment.apiUrl}/${path}`, body)
  );
}

function postMultipartResource<TResponse>(
  path: string,
  body: FormData
): Observable<TResponse> {
  return toObservable(
    axios.post(`${environment.apiUrl}/${path}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
}

function putResource<TRequest, TResponse>(
  path: string,
  body: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.put(`${environment.apiUrl}/${path}`, body)
  );
}

function patchResource<TRequest, TResponse>(
  path: string,
  body?: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.patch(`${environment.apiUrl}/${path}`, body)
  );
}

function deleteResource(path: string) {
  return toObservable(
    axios.delete(`${environment.apiUrl}/${path}`)
  );
}

export const applicationClient = {
  projects() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Project>> => getResource("project", search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource("project/export", search, { responseType: "blob" }),
      create: (body: CreateProject): Observable<Project> => postResource("project", body),
      refdata: () => {
        return {
          statuses: (): Observable<ProjectStatus[]> => getResource(`project/refdata/status`),
          teamMembers: () => {
            return {
              roles: (): Observable<ProjectRole[]> => getResource(`project/refdata/team-member/role`),
            };
          }
        };
      },
      withId: (id: string) => {
        return {
          get: (): Observable<Project> => getResource(`project/${id}`),
          update: (body: UpdateProject): Observable<Project> => putResource(`project/${id}`, body),
          moveStart: (body: ProjectMoveStart): Observable<ProjectStartMoved> => patchResource(`project/${id}/move-start`, body),
          moveDeadline: (body: ProjectMoveDeadline): Observable<ProjectDeadlineMoved> => patchResource(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/finish-draft`),
          backToDraft: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/back-to-draft`),
          startProgress: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/start-progress`),
          startReview: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/start-review`),
          approve: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/approve`),
          reject: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/reject`),
          deliver: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/deliver`),
          invoice: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/invoice`),
          pay: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/pay`),
          putOnHold: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/put-on-hold`),
          resume: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/resume`),
          cancel: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/cancel`),
          reopen: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<TeamMember>> => getResource(`project/${id}/team-member`, search),
              add: (body: CreateTeamMember): Observable<TeamMember> => postResource(`project/${id}/team-member`, body),
              remove: (id: string) => deleteResource(`project/${id}/team-member/${id}`)
            };
          },
          tasks: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Task>> => getResource(`project/${id}/task`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/task/export`, search, { responseType: "blob" }),
              create: (body: CreateTask): Observable<Task> => postResource(`project/${id}/task`, body),
            };
          },
          expenses: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Expense>> => getResource(`project/${id}/expense`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/expense/export`, search, { responseType: "blob" }),
              create: (body: CreateExpense): Observable<Expense> => postResource(`project/${id}/expense`, body),
            };
          },
          threads: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Thread>> => getResource(`project/${id}/thread`, search),
              create: (body: CreateThread): Observable<Thread> => postResource(`project/${id}/thread`, body),
            };
          },
          files: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<File>> => getResource(`project/${id}/file`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/file/export`, search, { responseType: "blob" }),
              create: (body: FormData) => postMultipartResource(`project/${id}/file`, body),
            };
          },
        };
      },
    };
  },
  clients() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Client>> => getResource(`client`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`client/export`, search, { responseType: "blob" }),
      create: (body: CreateClient): Observable<Client> => postResource(`client`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Client> => getResource(`client/${id}`),
          update: (body: UpdateClient): Observable<Client> => putResource(`client/${id}`, body),
          activate: (): Observable<ClientStatus> => patchResource(`client/${id}/activate`),
          deactivate: (): Observable<ClientStatus> => patchResource(`client/${id}/deactivate`),
        };
      },
    };
  },
  clientTypes() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ClientType>> => getResource(`client-type`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`client-type/export`, search, { responseType: "blob" }),
      create: (body: CreateClientType): Observable<ClientType> => postResource(`client-type`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ClientType> => getResource(`client-type/${id}`),
          update: (body: UpdateClientType): Observable<ClientType> => putResource(`client-type/${id}`, body),
          activate: (): Observable<ClientTypeStatus> => patchResource(`client-type/${id}/activate`),
          deactivate: (): Observable<ClientTypeStatus> => patchResource(`client-type/${id}/deactivate`),
        };
      },
    };
  },
  accuracies() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Accuracy>> => getResource(`accuracy`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`accuracy/export`, search, { responseType: "blob" }),
      create: (body: CreateAccuracy): Observable<Accuracy> => postResource(`accuracy`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Accuracy> => getResource(`accuracy/${id}`),
          update: (body: UpdateAccuracy): Observable<Accuracy> => putResource(`accuracy/${id}`, body),
          activate: (): Observable<AccuracyStatus> => patchResource(`accuracy/${id}/activate`),
          deactivate: (): Observable<AccuracyStatus> => patchResource(`accuracy/${id}/deactivate`),
        };
      }
    };
  },
  countries() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Country>> => getResource(`country`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`country/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Country> => getResource(`country/${code}`),
      byNameLike: (name: string): Observable<Page<Country>> => getResource(`country/name/${name}`)
    };
  },
  currencies() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Currency>> => getResource(`currency`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`currency/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Currency> => getResource(`currency/${code}`),
      exchangeRates: (code: string, amount: number): Observable<CurrencyExchangeRates> => getResource(`currency/${code}/exchange/${amount}`),
    };
  },
  expenseCategories() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ExpenseCategory>> => getResource(`expense-category`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`expense-category/export`, search, { responseType: "blob" }),
      create: (body: CreateExpenseCategory): Observable<ExpenseCategory> => postResource(`expense-category`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ExpenseCategory> => getResource(`expense-category/${id}`),
          update: (body: UpdateExpenseCategory): Observable<ExpenseCategory> => putResource(`expense-category/${id}`, body),
          activate: (): Observable<ExpenseCategoryStatus> => patchResource(`expense-category/${id}/activate`),
          deactivate: (): Observable<ExpenseCategoryStatus> => patchResource(`expense-category/${id}/deactivate`),
        };
      },
    };
  },
  industries() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Industry>> => getResource(`industry`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`industry/export`, search, { responseType: "blob" }),
      create: (body: CreateIndustry): Observable<Industry> => postResource(`industry`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Industry> => getResource(`industry/${id}`),
          update: (body: UpdateIndustry): Observable<Industry> => putResource(`industry/${id}`, body),
          activate: (): Observable<IndustryStatus> => patchResource(`industry/${id}/activate`),
          deactivate: (): Observable<IndustryStatus> => patchResource(`industry/${id}/deactivate`),
        };
      },
    };
  },
  languages() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Language>> => getResource(`language`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`language/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Language> => getResource(`language/${code}`),
      byNameLike: (name: string): Observable<Page<Language>> => getResource(`language/name/${name}`),
      refdata: () => {
        return {
          scopes: (): Observable<LanguageScope[]> => getResource(`language/refdata/scope`),
          types: (): Observable<LanguageType[]> => getResource(`language/refdata/type`),
        };
      }
    };
  },
  priorities() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Priority>> => getResource(`priority`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`priority/export`, search, { responseType: "blob" }),
      create: (body: CreatePriority): Observable<Priority> => postResource(`priority`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Priority> => getResource(`priority/${id}`),
          update: (body: UpdatePriority): Observable<Priority> => putResource(`priority/${id}`, body),
          activate: (): Observable<PriorityStatus> => patchResource(`priority/${id}/activate`),
          deactivate: (): Observable<PriorityStatus> => patchResource(`priority/${id}/deactivate`),
        };
      },
    };
  },
  serviceTypes() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ServiceType>> => getResource(`service-type`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`service-type/export`, search, { responseType: "blob" }),
      create: (body: CreateServiceType): Observable<ServiceType> => postResource(`service-type`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ServiceType> => getResource(`service-type/${id}`),
          update: (body: UpdateServiceType): Observable<ServiceType> => putResource(`service-type/${id}`, body),
          activate: (): Observable<ServiceTypeStatus> => patchResource(`service-type/${id}/activate`),
          deactivate: (): Observable<ServiceTypeStatus> => patchResource(`service-type/${id}/deactivate`),
        };
      },
    };
  },
  units() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Unit>> => getResource(`unit`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`unit/export`, search, { responseType: "blob" }),
      create: (body: CreateUnit): Observable<Unit> => postResource(`unit`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Unit> => getResource(`unit/${id}`),
          update: (body: UpdateUnit): Observable<Unit> => putResource(`unit/${id}`, body),
          activate: (): Observable<UnitStatus> => patchResource(`unit/${id}/activate`),
          deactivate: (): Observable<UnitStatus> => patchResource(`unit/${id}/deactivate`),
        };
      },
      refdata: () => {
        return {
          measurements: (): Observable<Measurement[]> => getResource(`unit/refdata/measurement`),
        };
      }
    };
  },
  expenses() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Expense>> => getResource(`expense`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`expense/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<Expense> => getResource(`expense/${id}`),
          delete: () => deleteResource(`expense/${id}`),
        };
      },
    };
  },
  files() {
    return {
      all: (search?: Partial<Search>): Observable<Page<File>> => getResource(`file`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`file/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<File> => getResource(`file/${id}`),
          download: () => getResource(`file/${id}/download`, {}, { responseType: "blob" }),
          delete: () => deleteResource(`file/${id}`),
        };
      },
    };
  },
  threads() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Thread>> => getResource(`thread`, search),
      withId: (id: string) => {
        return {
          get: (): Observable<Thread> => getResource(`thread/${id}`),
          update: (body: UpdateThread): Observable<Thread> => putResource(`thread/${id}`, body),
          like: (): Observable<ThreadLike> => patchResource(`thread/${id}/like`),
          unlike: (): Observable<ThreadLikeRemoved> => patchResource(`thread/${id}/unlike`),
          dislike: (): Observable<ThreadDislike> => patchResource(`thread/${id}/dislike`),
          undislike: (): Observable<ThreadDislikeRemoved> => patchResource(`thread/${id}/undislike`),
          activate: (): Observable<ThreadNewStatus> => patchResource(`thread/${id}/activate`),
          freeze: (): Observable<ThreadNewStatus> => patchResource(`thread/${id}/freeze`),
          close: (): Observable<ThreadNewStatus> => patchResource(`thread/${id}/close`),
          archive: (): Observable<ThreadNewStatus> => patchResource(`thread/${id}/archive`),
          delete: (): Observable<ThreadNewStatus> => patchResource(`thread/${id}/delete`),
          replies: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Reply>> => getResource(`thread/${id}/reply`, search),
              create: (body: CreateReply): Observable<Reply> => postResource(`thread/${id}/reply`, body),
            };
          }
        };
      },
    };
  },
  replies() {
    return {
      withId: (id: string) => {
        return {
          get: (): Observable<Reply> => getResource(`reply/${id}`),
          update: (body: UpdateReply): Observable<Reply> => putResource(`reply/${id}`, body),
          like: (): Observable<ReplyLike> => patchResource(`reply/${id}/like`),
          unlike: (): Observable<ReplyLikeRemoved> => patchResource(`reply/${id}/unlike`),
          dislike: (): Observable<ReplyDislike> => patchResource(`reply/${id}/dislike`),
          undislike: (): Observable<ReplyDislikeRemoved> => patchResource(`reply/${id}/undislike`),
          delete: (): Observable<unknown> => deleteResource(`reply/${id}`)
        };
      },
    };
  },
  tasks() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Task>> => getResource(`task`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`task/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<Task> => getResource(`task/${id}`),
          update: (body: UpdateTask): Observable<Task> => putResource(`task/${id}`, body),
          moveStart: (body: TaskMoveStart): Observable<TaskStartMoved> => patchResource(`task/${id}/move-start`, body),
          moveDeadline: (body: TaskMoveDeadline): Observable<TaskDeadlineMoved> => patchResource(`task/${id}/move-deadline`, body),
          start: (): Observable<TaskNewStatus> => patchResource(`task/${id}/start`),
          startReview: (): Observable<TaskNewStatus> => patchResource(`task/${id}/start-review`),
          reject: (): Observable<TaskNewStatus> => patchResource(`task/${id}/reject`),
          approve: (): Observable<TaskNewStatus> => patchResource(`task/${id}/approve`),
          putOnHold: (): Observable<TaskNewStatus> => patchResource(`task/${id}/put-on-hold`),
          resume: (): Observable<TaskNewStatus> => patchResource(`task/${id}/resume`),
          complete: (): Observable<TaskNewStatus> => patchResource(`task/${id}/complete`),
          cancel: (): Observable<TaskNewStatus> => patchResource(`task/${id}/cancel`),
          reopen: (): Observable<TaskNewStatus> => patchResource(`task/${id}/reopen`),
          changePriority: (body: ChangePriority): Observable<PriorityChanged> => patchResource(`task/${id}/change-priority`, body),
          assignTeamMember: (body: Assign): Observable<Assigned> => patchResource(`task/${id}/assign-team-member`, body),
          unassignTeamMember: () => patchResource(`task/${id}/unassign-team-member`),
        };
      },
      refdata: () => {
        return {
          statuses: (): Observable<TaskStatus[]> => getResource(`task/refdata/status`),
        };
      }
    };
  },
  users() {
    return {
      all: (search?: Partial<Search>): Observable<Page<User>> => getResource(`user`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`user/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<User> => getResource(`user/${id}`),
        };
      },
      current: (): Observable<User> => getResource(`user/current`),
    };
  }
};

export type ApplicationClient = typeof applicationClient;
