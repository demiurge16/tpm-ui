import axios from "axios";
import { environment } from "../Environment";
import { Observable } from "rxjs";
import { DeadlineMoved, NewStatus, Project, StartMoved } from "./types/Project";
import { Page } from "./types/Page";

export default class TpmClient {

  private static instance: TpmClient;

  static getInstance(): TpmClient {
    if (!TpmClient.instance) {
      TpmClient.instance = new TpmClient();
    }

    return TpmClient.instance;
  }

  private readonly baseUrl = environment.apiUrl;

  private get<TResponse>(path: string): Observable<TResponse> {
    return new Observable((observer) => {
      axios
        .get(`${this.baseUrl}/${path}`)
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
      all: (): Observable<Page<Project>> => this.get("project"),
      create: (body: any): Observable<Project> => this.post("project", body),
      refdata: () => {
        return {
          statuses: () => this.get(`project/refdata/statuses`),
        };
      },
      withId: (id: number) => {
        return {
          get: (): Observable<Project> => this.get(`project/${id}`),
          update: (body: any): Observable<Project> => this.put(`project/${id}`, body),
          moveStart: (body: any): Observable<StartMoved> => this.patch(`project/${id}/move-start`, body),
          moveDeadline: (body: any): Observable<DeadlineMoved> => this.patch(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<NewStatus> => this.patch(`project/${id}/finish-draft`),
          backToDraft: (): Observable<NewStatus> => this.patch(`project/${id}/back-to-draft`),
          startProgress: (): Observable<NewStatus> => this.patch(`project/${id}/start-progress`),
          finishProgress: (): Observable<NewStatus> => this.patch(`project/${id}/finish-progress`),
          backToProgress: (): Observable<NewStatus> => this.patch(`project/${id}/back-to-progress`),
          deliver: (): Observable<NewStatus> => this.patch(`project/${id}/deliver`),
          invoice: (): Observable<NewStatus> => this.patch(`project/${id}/invoice`),
          pay: (): Observable<NewStatus> => this.patch(`project/${id}/pay`),
          putOnHold: (): Observable<NewStatus> => this.patch(`project/${id}/put-on-hold`),
          resume: (): Observable<NewStatus> => this.patch(`project/${id}/resume`),
          cancel: (): Observable<NewStatus> => this.patch(`project/${id}/cancel`),
          reopen: (): Observable<NewStatus> => this.patch(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: () => this.get(`project/${id}/team-member`),
              add: (body: any) => this.post(`projects/${id}/team-member`, body),
              remove: (body: any) => this.delete(`projects/${id}/team-member`),
            };
          },
          tasks: () => {
            return {
              all: () => this.get(`project/${id}/task`),
              create: (body: any) => this.post(`projects/${id}/task`, body),
            };
          },
          chats: () => {
            return {
              all: () => this.get(`project/${id}/chat`),
              create: (body: any) => this.post(`projects/${id}/chat`, body),
            };
          },
          expenses: () => {
            return {
              all: () => this.get(`project/${id}/expense`),
              create: (body: any) => this.post(`projects/${id}/expense`, body),
            };
          },
          notes: () => {
            return {
              all: () => this.get(`project/${id}/note`),
              create: (body: any) => this.post(`projects/${id}/note`, body),
            };
          },
          files: () => {
            return {
              all: () => this.get(`project/${id}/file`),
              create: (body: any) => this.post(`projects/${id}/file`, body),
            };
          },
        };
      },
    };
  }

  chats() {
    return {
      all: () => this.get(`chat`),
      withId: (id: number) => {
        return {
          get: () => this.get(`chat/${id}`),
          update: (body: any) => this.put(`chat/${id}`, body),
          activate: () => this.patch(`chat/${id}/activate`),
          freeze: () => this.patch(`chat/${id}/freeze`),
          archive: () => this.patch(`chat/${id}/archive`),
          transferOwnership: (body: any) => this.patch(`chat/${id}/transfer-ownership`, body),
          addParticipant: (body: any) => this.patch(`chat/${id}/add-participant`, body),
          removeParticipant: (body: any) => this.patch(`chat/${id}/remove-participant`, body),
          messages: () => {
            return {
              all: () => this.get(`chat/${id}/message`),
              create: (body: any) => this.post(`chat/${id}/message`, body),
            };
          },
        };
      },
    };
  }

  clients() {
    return {
      all: () => this.get(`client`),
      create: (body: any) => this.post(`client`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`client/${id}`),
          update: (body: any) => this.put(`client/${id}`, body),
          activate: () => this.patch(`client/${id}/activate`),
          deactivate: () => this.patch(`client/${id}/deactivate`),
        };
      },
    };
  }

  clientTypes() {
    return {
      all: () => this.get(`client-type`),
      create: (body: any) => this.post(`client-type`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`client-type/${id}`),
          update: (body: any) => this.put(`client-type/${id}`, body),
          activate: () => this.patch(`client-type/${id}/activate`),
          deactivate: () => this.patch(`client-type/${id}/deactivate`),
        };
      },
    };
  }

  accuracies() {
    return {
      all: () => this.get(`accuracy`),
      create: (body: any) => this.post(`accuracy`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`accuracy/${id}`),
          update: (body: any) => this.put(`accuracy/${id}`, body),
          activate: () => this.patch(`accuracy/${id}/activate`),
          deactivate: () => this.patch(`accuracy/${id}/deactivate`),
        };
      }
    };
  }

  countries() {
    return {
      all: () => this.get(`country`),
      byCode: (code: string) => this.get(`country/${code}`),
      byNameLike: (name: string) => this.get(`country/name/${name}`)
    };
  }

  currencies() {
    return {
      all: () => this.get(`currency`),
      byCode: (code: string) => this.get(`currency/${code}`),
      exchangeRates: (code: string, amount: number) => this.get(`currency/${code}/exchange/${amount}`),
    };
  }

  expenseCategories() {
    return {
      all: () => this.get(`expense-category`),
      create: (body: any) => this.post(`expense-category`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`expense-category/${id}`),
          update: (body: any) => this.put(`expense-category/${id}`, body),
          activate: () => this.patch(`expense-category/${id}/activate`),
          deactivate: () => this.patch(`expense-category/${id}/deactivate`),
        };
      },
    };
  }

  industries() {
    return {
      all: () => this.get(`industry`),
      create: (body: any) => this.post(`industry`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`industry/${id}`),
          update: (body: any) => this.put(`industry/${id}`, body),
          activate: () => this.patch(`industry/${id}/activate`),
          deactivate: () => this.patch(`industry/${id}/deactivate`),
        };
      },
    };
  }

  languages() {
    return {
      all: () => this.get(`language`),
      byCode: (code: string) => this.get(`language/${code}`),
      byNameLike: (name: string) => this.get(`language/name/${name}`),
      refdata: () => {
        return {
          scopes: () => this.get(`language/refdata/scopes`),
          types: () => this.get(`language/refdata/types`),
        };
      }
    };
  }

  priorities() {
    return {
      all: () => this.get(`priority`),
      create: (body: any) => this.post(`priority`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`priority/${id}`),
          update: (body: any) => this.put(`priority/${id}`, body),
          activate: () => this.patch(`priority/${id}/activate`),
          deactivate: () => this.patch(`priority/${id}/deactivate`),
        };
      },
    };
  }

  units() {
    return {
      all: () => this.get(`unit`),
      create: (body: any) => this.post(`unit`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`unit/${id}`),
          update: (body: any) => this.put(`unit/${id}`, body),
          activate: () => this.patch(`unit/${id}/activate`),
          deactivate: () => this.patch(`unit/${id}/deactivate`),
        };
      },
    };
  }

  expenses() {
    return {
      all: () => this.get(`expense`),
      withId: (id: number) => {
        return {
          get: () => this.get(`expense/${id}`),
          delete: () => this.delete(`expense/${id}`),
        };
      },
    };
  }

  files() {
    return {
      all: () => this.get(`file`),
      withId: (id: number) => {
        return {
          get: () => this.get(`file/${id}`),
          download: () => this.get(`file/${id}/download`),
          delete: () => this.delete(`file/${id}`),
        };
      },
    };
  }

  notes() {
    return {
      all: () => this.get(`note`),
      create: (body: any) => this.post(`note`, body),
      withId: (id: number) => {
        return {
          get: () => this.get(`note/${id}`),
          delete: () => this.delete(`note/${id}`),
        };
      },
    };
  }

  tasks() {
    return {
      all: () => this.get(`task`),
      withId: (id: number) => {
        return {
          get: () => this.get(`task/${id}`),
          update: (body: any) => this.put(`task/${id}`, body),
          moveStart: (body: any) => this.patch(`task/${id}/move-start`, body),
          moveDeadline: (body: any) => this.patch(`task/${id}/move-deadline`, body),
          start: () => this.patch(`task/${id}/start`),
          complete: () => this.patch(`task/${id}/complete`),
          requestRevisions: () => this.patch(`task/${id}/request-revisions`),
          completeRevisions: () => this.patch(`task/${id}/complete-revisions`),
          deliver: () => this.patch(`task/${id}/deliver`),
          cancel: () => this.patch(`task/${id}/cancel`),
          reopen: () => this.patch(`task/${id}/reopen`),
          changePriority: (body: any) => this.patch(`task/${id}/change-priority`, body),
          assignTeamMember: (body: any) => this.patch(`task/${id}/assign-team-member`, body),
          unassignTeamMember: () => this.patch(`task/${id}/unassign-team-member`),
        };
      },
      refdata: () => {
        return {
          statuses: () => this.get(`task/refdata/status`),
        };
      }
    };
  }

  users() {
    return {
      all: () => this.get(`user`),
      withId: (id: number) => {
        return {
          get: () => this.get(`user/${id}`),
        };
      },
      current: () => this.get(`user/current`),
    };
  }
}
