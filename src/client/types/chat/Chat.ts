export interface UpdateChat {
  title: string;
  description: string;
}

export interface TransferOwnership {
  newOwnerId: string;
}

export interface AddParticipant {
  teamMemberId: string;
}

export interface RemoveParticipant {
  teamMemberId: string;
}

export interface Chat {
  id: string,
  title: string,
  description: string,
  status: Status,
  owner: Member,
  participants: Member[],
  projectId: string
}

export type StatusCode = "ACTIVE" | "FREEZE" | "ARCHIVE";

export interface Status {
  status: StatusCode;
  name: string;
  description: string;
}

export interface Member {
  teamMemberId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ChatStatus {
  id: string,
  status: ChatStatus,
}

export interface ChatMember {
  id: string,
  member: Member
}
