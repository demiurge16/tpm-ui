import axios from "axios";
import { environment } from "../Environment";
import { Observable } from "rxjs";
import { Page } from "./types/common/Page";
import { Search } from "./types/common/Search";
import { CreateProject, ProjectDeadlineMoved, ProjectMoveDeadline, ProjectMoveStart, ProjectNewStatus, Project, ProjectStartMoved, ProjectStatus, UpdateProject } from "./types/project/Project";
import { CreateTeamMember, TeamMember } from "./types/project/TeamMember";
import { CreateTask } from "./types/project/Task";
import { Assign, Assigned, ChangePriority, Priority, PriorityChanged, Task, TaskDeadlineMoved, TaskMoveDeadline, TaskMoveStart, TaskNewStatus, TaskStartMoved, TaskStatus, UpdateTask } from "./types/task/Task";
import { CreateChat } from "./types/project/Chat";
import { AddParticipant, Chat, ChatMember, ChatStatus, RemoveParticipant, TransferOwnership, UpdateChat } from "./types/chat/Chat";
import { Expense } from "./types/expense/Expense";
import { CreateExpense } from "./types/project/Expense";
import { Note } from "./types/note/Note";
import { CreateNote } from "./types/project/Note";
import { CreateMessage, Message } from "./types/chat/Message";
import { Client, ClientStatus, CreateClient, UpdateClient } from "./types/client/Client";
import { ClientType, ClientTypeStatus, CreateClientType, UpdateClientType } from "./types/client/ClientType";
import { Accuracy, AccuracyStatus, CreateAccuracy, UpdateAccuracy } from "./types/dictionaries/Accuracy";
import { Country } from "./types/dictionaries/Country";
import { Currency, CurrencyExchangeRates } from "./types/dictionaries/Currency";
import { CreateExpenseCategory, ExpenseCategory, ExpenseCategoryStatus, UpdateExpenseCategory } from "./types/dictionaries/ExpenseCategory";
import { CreateIndustry, Industry, IndustryStatus, UpdateIndustry } from "./types/dictionaries/Industry";
import { Language, LanguageScope, LanguageType } from "./types/dictionaries/Language";
import { CreatePriority, PriorityStatus, UpdatePriority } from "./types/dictionaries/Priority";
import { CreateUnit, Measurement, Unit, UnitStatus, UpdateUnit } from "./types/dictionaries/Unit";
import { User } from "./types/user/User";

export default class TpmClient {

  private static instance: TpmClient;

  static getInstance(): TpmClient {
    if (!TpmClient.instance) {
      TpmClient.instance = new TpmClient();
    }

    return TpmClient.instance;
  }

  private readonly baseUrl = environment.apiUrl;

  private get<TResponse>(path: string, search?: Search): Observable<TResponse> {
    const params = search ? {
      page: search.page,
      size: search.pageSize,
      sort: search.sort.map((s) => `${s.field}:${s.direction}`).join("&"),
      search: search.filters.map((f) => `${f.field}:${f.operator}:${f.value || ""}`).join("&"),
    } : undefined;

    return new Observable((observer) => {
      axios
        .get(`${this.baseUrl}/${path}`, { params: params })
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
      all: (search?: Search): Observable<Page<Project>> => this.get("project", search),
      create: (body: CreateProject): Observable<Project> => this.post("project", body),
      refdata: () => {
        return {
          statuses: (): Observable<ProjectStatus[]> => this.get(`project/refdata/status`),
        };
      },
      withId: (id: number) => {
        return {
          get: (): Observable<Project> => this.get(`project/${id}`),
          update: (body: UpdateProject): Observable<Project> => this.put(`project/${id}`, body),
          moveStart: (body: ProjectMoveStart): Observable<ProjectStartMoved> => this.patch(`project/${id}/move-start`, body),
          moveDeadline: (body: ProjectMoveDeadline): Observable<ProjectDeadlineMoved> => this.patch(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/finish-draft`),
          backToDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/back-to-draft`),
          startProgress: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/start-progress`),
          finishProgress: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/finish-progress`),
          backToProgress: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/back-to-progress`),
          deliver: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/deliver`),
          invoice: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/invoice`),
          pay: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/pay`),
          putOnHold: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/put-on-hold`),
          resume: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/resume`),
          cancel: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/cancel`),
          reopen: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: (search?: Search): Observable<Page<TeamMember>> => this.get(`project/${id}/team-member`, search),
              add: (body: CreateTeamMember): Observable<TeamMember> => this.post(`projects/${id}/team-member`, body),
              remove: (id: string) => this.delete(`projects/${id}/team-member/${id}`),
            };
          },
          tasks: () => {
            return {
              all: (search?: Search): Observable<Page<Task>> => this.get(`project/${id}/task`, search),
              create: (body: CreateTask): Observable<Task> => this.post(`projects/${id}/task`, body),
            };
          },
          chats: () => {
            return {
              all: (search?: Search): Observable<Page<Chat>> => this.get(`project/${id}/chat`, search),
              create: (body: CreateChat): Observable<Chat> => this.post(`projects/${id}/chat`, body),
            };
          },
          expenses: () => {
            return {
              all: (search?: Search): Observable<Page<Expense>> => this.get(`project/${id}/expense`, search),
              create: (body: CreateExpense): Observable<Expense> => this.post(`projects/${id}/expense`, body),
            };
          },
          notes: () => {
            return {
              all: (search?: Search): Observable<Page<Note>> => this.get(`project/${id}/note`, search),
              create: (body: CreateNote): Observable<Note> => this.post(`projects/${id}/note`, body),
            };
          },
          files: () => {
            return {
              all: (search?: Search): Observable<Page<File>> => this.get(`project/${id}/file`, search),
              // TODO: add types for body and response
              create: (body: any) => this.post(`projects/${id}/file`, body),
            };
          },
        };
      },
    };
  }

  chats() {
    return {
      all: (search?: Search): Observable<Page<Chat>> => this.get(`chat`, search),
      withId: (id: number) => {
        return {
          get: (): Observable<Chat> => this.get(`chat/${id}`),
          update: (body: UpdateChat): Observable<Chat> => this.put(`chat/${id}`, body),
          activate: (): Observable<ChatStatus> => this.patch(`chat/${id}/activate`),
          freeze: (): Observable<ChatStatus> => this.patch(`chat/${id}/freeze`),
          archive: (): Observable<ChatStatus> => this.patch(`chat/${id}/archive`),
          transferOwnership: (body: TransferOwnership): Observable<ChatMember> => this.patch(`chat/${id}/transfer-ownership`, body),
          addParticipant: (body: AddParticipant): Observable<ChatMember> => this.patch(`chat/${id}/add-participant`, body),
          removeParticipant: (body: RemoveParticipant) => this.patch(`chat/${id}/remove-participant`, body),
          messages: () => {
            return {
              all: (search: Search): Observable<Page<Message>> => this.get(`chat/${id}/message`, search),
              create: (body: CreateMessage): Observable<Message> => this.post(`chat/${id}/message`, body),
            };
          },
        };
      },
    };
  }

  clients() {
    return {
      all: (search?: Search): Observable<Page<Client>> => this.get(`client`, search),
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
      all: (search?: Search): Observable<Page<ClientType>> => this.get(`client-type`, search),
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
      all: (search?: Search): Observable<Page<Accuracy>> => this.get(`accuracy`, search),
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
      all: (search?: Search): Observable<Page<Country>> => this.get(`country`, search),
      byCode: (code: string): Observable<Country> => this.get(`country/${code}`),
      byNameLike: (name: string): Observable<Page<Country>> => this.get(`country/name/${name}`)
    };
  }

  currencies() {
    return {
      all: (search?: Search): Observable<Page<Currency>> => this.get(`currency`, search),
      byCode: (code: string): Observable<Currency> => this.get(`currency/${code}`),
      exchangeRates: (code: string, amount: number): Observable<CurrencyExchangeRates> => this.get(`currency/${code}/exchange/${amount}`),
    };
  }

  expenseCategories() {
    return {
      all: (search?: Search): Observable<Page<ExpenseCategory>> => this.get(`expense-category`, search),
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
      all: (search?: Search): Observable<Page<Industry>> => this.get(`industry`, search),
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
      all: (search?: Search): Observable<Page<Language>> => this.get(`language`, search),
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
      all: (search?: Search): Observable<Page<Priority>> => this.get(`priority`, search),
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

  units() {
    return {
      all: (search?: Search): Observable<Page<Unit>> => this.get(`unit`, search),
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
      all: (search?: Search): Observable<Page<Expense>> => this.get(`expense`, search),
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
      all: (search?: Search): Observable<Page<File>> => this.get(`file`, search),
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

  notes() {
    return {
      all: (search?: Search): Observable<Page<Note>> => this.get(`note`, search),
      withId: (id: string) => {
        return {
          get: (): Observable<Note> => this.get(`note/${id}`),
          delete: () => this.delete(`note/${id}`),
        };
      },
    };
  }

  tasks() {
    return {
      all: (search?: Search): Observable<Page<Task>> => this.get(`task`, search),
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
      all: (): Observable<Page<User>> => this.get(`user`),
      withId: (id: string) => {
        return {
          get: (): Observable<User> => this.get(`user/${id}`),
        };
      },
      current: (): Observable<User> => this.get(`user/current`),
    };
  }
}
