import axios, { ResponseType } from "axios";
import { environment } from "../Environment";
import { Observable } from "rxjs";
import { Page } from "./types/common/Page";
import { Search } from "./types/common/Search";
import { CreateProject, ProjectDeadlineMoved, ProjectMoveDeadline, ProjectMoveStart, ProjectNewStatus, Project, ProjectStartMoved, ProjectStatus, UpdateProject } from "./types/project/Project";
import { CreateTeamMember, Role, TeamMember } from "./types/project/TeamMember";
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

export default class TpmClient {

  private constructor() { }

  private static instance: TpmClient;

  static getInstance(): TpmClient {
    if (!TpmClient.instance) {
      TpmClient.instance = new TpmClient();
    }

    return TpmClient.instance;
  }

  private readonly baseUrl = environment.apiUrl;

  private get<TResponse>(
    path: string,
    search?: Partial<Search>,
    config?: {
      responseType?: ResponseType,
      headers?: {}
    }
  ): Observable<TResponse> {
    const params = search ? {
      page: search.page,
      size: search.pageSize,
      sort: search.sort && search.sort.map((s) => `${s.field}:${s.direction}`).join("&"),
      search: search.filters && search.filters.map((f) => `${f.field}:${f.operator}:${f.value || ""}`).join("&")
    } : undefined;

    return new Observable((observer) => {
      axios
        .get(`${this.baseUrl}/${path}`, { params: params, responseType: config?.responseType, headers: config?.headers })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private post<TRequest, TResponse>(path: string, body: TRequest): Observable<TResponse> {
    return new Observable((observer) => {
      axios
        .post(`${this.baseUrl}/${path}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private put<TRequest, TResponse>(path: string, body: TRequest): Observable<TResponse> {
    return new Observable((observer) => {
      axios
        .put(`${this.baseUrl}/${path}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private patch<TRequest, TResponse>(path: string, body?: TRequest): Observable<TResponse> {
    return new Observable((observer) => {
      axios
        .patch(`${this.baseUrl}/${path}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private delete(path: string) {
    return new Observable((observer) => {
      axios
        .delete(`${this.baseUrl}/${path}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  projects() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Project>> => this.get("project", search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get("project/export", search, { responseType: "blob" }),
      create: (body: CreateProject): Observable<Project> => this.post("project", body),
      refdata: () => {
        return {
          statuses: (): Observable<ProjectStatus[]> => this.get(`project/refdata/status`),
          teamMembers: () => {
            return {
              roles: (): Observable<Role[]> => this.get(`project/refdata/team-member/role`),
            };
          }
        };
      },
      withId: (id: string) => {
        return {
          get: (): Observable<Project> => this.get(`project/${id}`),
          update: (body: UpdateProject): Observable<Project> => this.put(`project/${id}`, body),
          moveStart: (body: ProjectMoveStart): Observable<ProjectStartMoved> => this.patch(`project/${id}/move-start`, body),
          moveDeadline: (body: ProjectMoveDeadline): Observable<ProjectDeadlineMoved> => this.patch(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/finish-draft`),
          backToDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/back-to-draft`),
          startProgress: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/start-progress`),
          startReview: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/start-review`),
          approve: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/approve`),
          reject: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/reject`),
          deliver: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/deliver`),
          invoice: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/invoice`),
          pay: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/pay`),
          putOnHold: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/put-on-hold`),
          resume: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/resume`),
          cancel: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/cancel`),
          reopen: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<TeamMember>> => this.get(`project/${id}/team-member`, search),
              add: (body: CreateTeamMember): Observable<TeamMember> => this.post(`project/${id}/team-member`, body),
              remove: (id: string) => this.delete(`project/${id}/team-member/${id}`)
            };
          },
          tasks: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Task>> => this.get(`project/${id}/task`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/task/export`, search, { responseType: "blob" }),
              create: (body: CreateTask): Observable<Task> => this.post(`project/${id}/task`, body),
            };
          },
          expenses: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Expense>> => this.get(`project/${id}/expense`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/expense/export`, search, { responseType: "blob" }),
              create: (body: CreateExpense): Observable<Expense> => this.post(`project/${id}/expense`, body),
            };
          },
          threads: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Thread>> => this.get(`project/${id}/thread`, search),
              create: (body: CreateThread): Observable<Thread> => this.post(`project/${id}/thread`, body),
            };
          },
          files: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<File>> => this.get(`project/${id}/file`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/file/export`, search, { responseType: "blob" }),
              create: (body: any) => this.post(`project/${id}/file`, body),
            };
          },
        };
      },
    };
  }

  clients() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Client>> => this.get(`client`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`client/export`, search, { responseType: "blob" }),
      create: (body: CreateClient): Observable<Client> => this.post(`client`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Client> => this.get(`client/${id}`),
          update: (body: UpdateClient): Observable<Client> => this.put(`client/${id}`, body),
          activate: (): Observable<ClientStatus> => this.patch(`client/${id}/activate`),
          deactivate: (): Observable<ClientStatus> => this.patch(`client/${id}/deactivate`),
        };
      },
    };
  }

  clientTypes() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ClientType>> => this.get(`client-type`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`client-type/export`, search, { responseType: "blob" }),
      create: (body: CreateClientType): Observable<ClientType> => this.post(`client-type`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ClientType> => this.get(`client-type/${id}`),
          update: (body: UpdateClientType): Observable<ClientType> => this.put(`client-type/${id}`, body),
          activate: (): Observable<ClientTypeStatus> => this.patch(`client-type/${id}/activate`),
          deactivate: (): Observable<ClientTypeStatus> => this.patch(`client-type/${id}/deactivate`),
        };
      },
    };
  }

  accuracies() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Accuracy>> => this.get(`accuracy`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`accuracy/export`, search, { responseType: "blob" }),
      create: (body: CreateAccuracy): Observable<Accuracy> => this.post(`accuracy`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Accuracy> => this.get(`accuracy/${id}`),
          update: (body: UpdateAccuracy): Observable<Accuracy> => this.put(`accuracy/${id}`, body),
          activate: (): Observable<AccuracyStatus> => this.patch(`accuracy/${id}/activate`),
          deactivate: (): Observable<AccuracyStatus> => this.patch(`accuracy/${id}/deactivate`),
        };
      }
    };
  }

  countries() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Country>> => this.get(`country`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`country/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Country> => this.get(`country/${code}`),
      byNameLike: (name: string): Observable<Page<Country>> => this.get(`country/name/${name}`)
    };
  }

  currencies() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Currency>> => this.get(`currency`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`currency/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Currency> => this.get(`currency/${code}`),
      exchangeRates: (code: string, amount: number): Observable<CurrencyExchangeRates> => this.get(`currency/${code}/exchange/${amount}`),
    };
  }

  expenseCategories() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ExpenseCategory>> => this.get(`expense-category`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`expense-category/export`, search, { responseType: "blob" }),
      create: (body: CreateExpenseCategory): Observable<ExpenseCategory> => this.post(`expense-category`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ExpenseCategory> => this.get(`expense-category/${id}`),
          update: (body: UpdateExpenseCategory): Observable<ExpenseCategory> => this.put(`expense-category/${id}`, body),
          activate: (): Observable<ExpenseCategoryStatus> => this.patch(`expense-category/${id}/activate`),
          deactivate: (): Observable<ExpenseCategoryStatus> => this.patch(`expense-category/${id}/deactivate`),
        };
      },
    };
  }

  industries() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Industry>> => this.get(`industry`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`industry/export`, search, { responseType: "blob" }),
      create: (body: CreateIndustry): Observable<Industry> => this.post(`industry`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Industry> => this.get(`industry/${id}`),
          update: (body: UpdateIndustry): Observable<Industry> => this.put(`industry/${id}`, body),
          activate: (): Observable<IndustryStatus> => this.patch(`industry/${id}/activate`),
          deactivate: (): Observable<IndustryStatus> => this.patch(`industry/${id}/deactivate`),
        };
      },
    };
  }

  languages() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Language>> => this.get(`language`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`language/export`, search, { responseType: "blob" }),
      byCode: (code: string): Observable<Language> => this.get(`language/${code}`),
      byNameLike: (name: string): Observable<Page<Language>> => this.get(`language/name/${name}`),
      refdata: () => {
        return {
          scopes: (): Observable<LanguageScope[]> => this.get(`language/refdata/scope`),
          types: (): Observable<LanguageType[]> => this.get(`language/refdata/type`),
        };
      }
    };
  }

  priorities() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Priority>> => this.get(`priority`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`priority/export`, search, { responseType: "blob" }),
      create: (body: CreatePriority): Observable<Priority> => this.post(`priority`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Priority> => this.get(`priority/${id}`),
          update: (body: UpdatePriority): Observable<Priority> => this.put(`priority/${id}`, body),
          activate: (): Observable<PriorityStatus> => this.patch(`priority/${id}/activate`),
          deactivate: (): Observable<PriorityStatus> => this.patch(`priority/${id}/deactivate`),
        };
      },
    };
  }

  serviceTypes() {
    return {
      all: (search?: Partial<Search>): Observable<Page<ServiceType>> => this.get(`service-type`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`service-type/export`, search, { responseType: "blob" }),
      create: (body: CreateServiceType): Observable<ServiceType> => this.post(`service-type`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<ServiceType> => this.get(`service-type/${id}`),
          update: (body: UpdateServiceType): Observable<ServiceType> => this.put(`service-type/${id}`, body),
          activate: (): Observable<ServiceTypeStatus> => this.patch(`service-type/${id}/activate`),
          deactivate: (): Observable<ServiceTypeStatus> => this.patch(`service-type/${id}/deactivate`),
        };
      },
    };
  }

  units() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Unit>> => this.get(`unit`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`unit/export`, search, { responseType: "blob" }),
      create: (body: CreateUnit): Observable<Unit> => this.post(`unit`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Unit> => this.get(`unit/${id}`),
          update: (body: UpdateUnit): Observable<Unit> => this.put(`unit/${id}`, body),
          activate: (): Observable<UnitStatus> => this.patch(`unit/${id}/activate`),
          deactivate: (): Observable<UnitStatus> => this.patch(`unit/${id}/deactivate`),
        };
      },
      refdata: () => {
        return {
          measurements: (): Observable<Measurement[]> => this.get(`unit/refdata/measurement`),
        };
      }
    };
  }

  expenses() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Expense>> => this.get(`expense`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`expense/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<Expense> => this.get(`expense/${id}`),
          delete: () => this.delete(`expense/${id}`),
        };
      },
    };
  }

  files() {
    return {
      all: (search?: Partial<Search>): Observable<Page<File>> => this.get(`file`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`file/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<File> => this.get(`file/${id}`),
          // TODO handle file download
          download: () => this.get(`file/${id}/download`),
          delete: () => this.delete(`file/${id}`),
        };
      },
    };
  }

  threads() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Thread>> => this.get(`thread`, search),
      withId: (id: string) => {
        return {
          get: (): Observable<Thread> => this.get(`thread/${id}`),
          update: (body: UpdateThread): Observable<Thread> => this.put(`thread/${id}`, body),
          like: (): Observable<ThreadLike> => this.patch(`thread/${id}/like`),
          unlike: (): Observable<ThreadLikeRemoved> => this.patch(`thread/${id}/unlike`),
          dislike: (): Observable<ThreadDislike> => this.patch(`thread/${id}/dislike`),
          undislike: (): Observable<ThreadDislikeRemoved> => this.patch(`thread/${id}/undislike`),
          activate: (): Observable<ThreadNewStatus> => this.patch(`thread/${id}/activate`),
          freeze: (): Observable<ThreadNewStatus> => this.patch(`thread/${id}/freeze`),
          close: (): Observable<ThreadNewStatus> => this.patch(`thread/${id}/close`),
          archive: (): Observable<ThreadNewStatus> => this.patch(`thread/${id}/archive`),
          delete: (): Observable<ThreadNewStatus> => this.patch(`thread/${id}/delete`),
          replies: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Reply>> => this.get(`thread/${id}/reply`, search),
              create: (body: CreateReply): Observable<Reply> => this.post(`thread/${id}/reply`, body),
            };
          }
        };
      },
    };
  }

  replies() {
    return {
      withId: (id: string) => {
        return {
          get: (): Observable<Reply> => this.get(`reply/${id}`),
          update: (body: UpdateReply): Observable<Reply> => this.put(`reply/${id}`, body),
          like: (): Observable<ReplyLike> => this.patch(`reply/${id}/like`),
          unlike: (): Observable<ReplyLikeRemoved> => this.patch(`reply/${id}/unlike`),
          dislike: (): Observable<ReplyDislike> => this.patch(`reply/${id}/dislike`),
          undislike: (): Observable<ReplyDislikeRemoved> => this.patch(`reply/${id}/undislike`),
          delete: (): Observable<unknown> => this.delete(`reply/${id}`)
        };
      },
    };
  }

  tasks() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Task>> => this.get(`task`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`task/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<Task> => this.get(`task/${id}`),
          update: (body: UpdateTask): Observable<Task> => this.put(`task/${id}`, body),
          moveStart: (body: TaskMoveStart): Observable<TaskStartMoved> => this.patch(`task/${id}/move-start`, body),
          moveDeadline: (body: TaskMoveDeadline): Observable<TaskDeadlineMoved> => this.patch(`task/${id}/move-deadline`, body),
          start: (): Observable<TaskNewStatus> => this.patch(`task/${id}/start`),
          complete: (): Observable<TaskNewStatus> => this.patch(`task/${id}/complete`),
          requestRevisions: (): Observable<TaskNewStatus> => this.patch(`task/${id}/request-revisions`),
          completeRevisions: (): Observable<TaskNewStatus> => this.patch(`task/${id}/complete-revisions`),
          deliver: (): Observable<TaskNewStatus> => this.patch(`task/${id}/deliver`),
          cancel: (): Observable<TaskNewStatus> => this.patch(`task/${id}/cancel`),
          reopen: (): Observable<TaskNewStatus> => this.patch(`task/${id}/reopen`),
          changePriority: (body: ChangePriority): Observable<PriorityChanged> => this.patch(`task/${id}/change-priority`, body),
          assignTeamMember: (body: Assign): Observable<Assigned> => this.patch(`task/${id}/assign-team-member`, body),
          unassignTeamMember: () => this.patch(`task/${id}/unassign-team-member`),
        };
      },
      refdata: () => {
        return {
          statuses: (): Observable<TaskStatus[]> => this.get(`task/refdata/status`),
        };
      }
    };
  }

  users() {
    return {
      all: (search?: Partial<Search>): Observable<Page<User>> => this.get(`user`, search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get(`user/export`, search, { responseType: "blob" }),
      withId: (id: string) => {
        return {
          get: (): Observable<User> => this.get(`user/${id}`),
        };
      },
      current: (): Observable<User> => this.get(`user/current`),
    };
  }
}
