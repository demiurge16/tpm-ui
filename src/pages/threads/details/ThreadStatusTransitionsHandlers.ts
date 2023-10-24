import { Observable } from "rxjs";
import { ThreadNewStatus, ThreadStatusCode } from "../../../client/types/thread/Thread";
import { ApplicationClient } from "../../../client/ApplicationClient";

export type ThreadStatusTransition = {
  [key in ThreadStatusCode]: {
    [key in ThreadStatusCode]?: {
      name: string,
      action: () => Observable<ThreadNewStatus>
    }
  }
};

export const createStatusTransitionHandler = (applicationClient: ApplicationClient, threadId: string): ThreadStatusTransition => {
  return {
    "DRAFT": {
      "ACTIVE": {
        name: "Activate",
        action: () => applicationClient.threads()
          .withId(threadId)
          .activate(),
      },
      "DELETED": {
        name: "Delete",
        action: () => applicationClient.threads()
          .withId(threadId)
          .delete(),
      }
    },
    "ACTIVE": {
      "FREEZE": {
        name: "Freeze",
        action: () => applicationClient.threads()
          .withId(threadId)
          .freeze(),
      },
      "CLOSED": {
        name: "Close",
        action: () => applicationClient.threads()
          .withId(threadId)
          .close(),
      },
      "DELETED": {
        name: "Delete",
        action: () => applicationClient.threads()
          .withId(threadId)
          .delete(),
      }
    },
    "FREEZE": {
      "ACTIVE": {
        name: "Activate",
        action: () => applicationClient.threads()
          .withId(threadId)
          .activate(),
      },
      "CLOSED": {
        name: "Close",
        action: () => applicationClient.threads()
          .withId(threadId)
          .close(),
      },
      "DELETED": {
        name: "Delete",
        action: () => applicationClient.threads()
          .withId(threadId)
          .delete(),
      }
    },
    "CLOSED": {
      "ACTIVE": {
        name: "Activate",
        action: () => applicationClient.threads()
          .withId(threadId)
          .activate(),
      },
      "ARCHIVED": {
        name: "Archive",
        action: () => applicationClient.threads()
          .withId(threadId)
          .archive(),
      },
      "DELETED": {
        name: "Delete",
        action: () => applicationClient.threads()
          .withId(threadId)
          .delete(),
      }
    },
    "ARCHIVED": {
      "DELETED": {
        name: "Delete",
        action: () => applicationClient.threads()
          .withId(threadId)
          .delete(),
      }
    },
    "DELETED": {},
  };
}
