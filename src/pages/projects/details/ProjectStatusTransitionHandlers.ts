import { Observable } from "rxjs";
import { ProjectNewStatus, StatusCode } from "../../../client/types/project/Project";
import TpmClient from "../../../client/TpmClient";

export type StatusTransition = {
  [key in StatusCode]: {
    [key in StatusCode]?: {
      name: string;
      action: () => Observable<ProjectNewStatus>;
    }
  }
};

export const createStatusTransitionHandler = (tpmClient: TpmClient, projectId: string): StatusTransition => {
  return {
    "DRAFT": {
      "READY_TO_START": {
        name: 'Finish draft',
        action: () => tpmClient.projects()
          .withId(projectId)
          .finishDraft()
      }
    },
    "READY_TO_START": {
      "DRAFT": {
        name: 'Back to draft',
        action: () => tpmClient.projects()
          .withId(projectId)
          .backToDraft()
      },
      "ACTIVE": {
        name: 'Start project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .startProgress()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "ACTIVE": {
      "REVIEW": {
        name: 'Start review',
        action: () => tpmClient.projects()
          .withId(projectId)
          .startReview()
      },
      "ON_HOLD": {
        name: 'Put on hold',
        action: () => tpmClient.projects()
          .withId(projectId)
          .putOnHold()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "ON_HOLD": {
      "ACTIVE": {
        name: 'Resume project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .resume()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "CANCELLED": {
      "DRAFT": {
        name: 'Reopen project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .reopen()
      }
    },
    "REVIEW": {
      "READY_TO_DELIVER": {
        name: 'Approve project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .approve()
      },
      "ACTIVE": {
        name: 'Reject project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .reject()
      },
      "ON_HOLD": {
        name: 'Put on hold',
        action: () => tpmClient.projects()
          .withId(projectId)
          .putOnHold()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "READY_TO_DELIVER": {
      "ACTIVE": {
        name: 'Reject project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .reject()
      },
      "DELIVERED": {
        name: 'Deliver project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .deliver()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "DELIVERED": {
      "INVOICED": {
        name: 'Create invoice',
        action: () => tpmClient.projects()
          .withId(projectId)
          .invoice()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "INVOICED": {
      "PAID": {
        name: 'Mark as paid',
        action: () => tpmClient.projects()
          .withId(projectId)
          .pay()
      },
      "CANCELLED": {
        name: 'Cancel project',
        action: () => tpmClient.projects()
          .withId(projectId)
          .cancel()
      }
    },
    "PAID": {}
  };
}
