import { Observable } from "rxjs";
import { ApplicationClient } from "../../../client/ApplicationClient";
import { StatusCode, TaskNewStatus } from "../../../client/types/task/Task";

export type StatusTransition = {
  [key in StatusCode]: {
    [key in StatusCode]?: {
      name: string;
      action: () => Observable<TaskNewStatus>;
    }
  }
};

export const createStatusTransitionHandler = (applicationClient: ApplicationClient, taskId: string): StatusTransition => {
  return {
    "DRAFT": {},
    "ASSIGNED": {
      "IN_PROGRESS": {
        name: "Start",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .start()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "IN_PROGRESS": {
      "IN_REVIEW": {
        name: "Send for review",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .startReview()
      },
      "ON_HOLD": {
        name: "Put on hold",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .putOnHold()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "IN_REVIEW": {
      "IN_PROGRESS": {
        name: "Request revision",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .reject()
      },
      "READY_TO_DELIVER": {
        name: "Approve",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .approve()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "ON_HOLD": {
      "IN_PROGRESS": {
        name: "Resume",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .resume()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "READY_TO_DELIVER": {
      "COMPLETED": {
        name: "Complete",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .complete()
      },
      "CANCELLED": {
        name: "Cancel",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .cancel()
      }
    },
    "COMPLETED": {},
    "CANCELLED": {
      "DRAFT": {
        name: "Reopen",
        action: () => applicationClient.tasks()
          .withId(taskId)
          .reopen()
      }
    }
  };
};