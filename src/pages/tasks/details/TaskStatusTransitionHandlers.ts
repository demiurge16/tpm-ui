import { Observable } from "rxjs";
import TpmClient from "../../../client/TpmClient";
import { StatusCode, TaskNewStatus } from "../../../client/types/task/Task";

export type StatusTransition = {
  [key in StatusCode]: {
    [key in StatusCode]?: {
      name: string;
      action: () => Observable<TaskNewStatus>;
    }
  }
};

export const createStatusTransitionHandler = (tpmClient: TpmClient, taskId: string): StatusTransition => {
  return {
    "DRAFT": {},
    "ASSIGNED": {
      "IN_PROGRESS": {
        name: "Start",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .start()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "IN_PROGRESS": {
      "IN_REVIEW": {
        name: "Send for review",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .startReview()
      },
      "ON_HOLD": {
        name: "Put on hold",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .putOnHold()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "IN_REVIEW": {
      "IN_PROGRESS": {
        name: "Request revision",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .reject()
      },
      "READY_TO_DELIVER": {
        name: "Approve",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .approve()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "ON_HOLD": {
      "IN_PROGRESS": {
        name: "Resume",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .resume()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "READY_TO_DELIVER": {
      "COMPLETED": {
        name: "Complete",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .complete()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "COMPLETED": {},
    "CANCELLED": {
      "DRAFT": {
        name: "Reopen",
        action: () => tpmClient.tasks()
          .withId(taskId)
          .reopen()
      }
    }
  };
};