import Author from './Author';
import Milestone from './Milestone';
import User from './User';
import References from './References';
import TimeStats from './TimeStats';
import TaskCompletionStatus from './TaskCompletionStatus';
import { snakeCaseToCamelCase } from '../Text';
import MergeRequest from './MergeRequest';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

interface IssueLinks {
  self: string;
  notes: string;
  award_emoji: string;
  project: string;
}

export default class Issue {
  id: number;
  title: string;
  description?: string;
  state?: IssueState;
  author?: Author;
  milestone?: Milestone;
  projectId?: number;
  assignees?: Array<User>;
  assignee?: User;
  updatedAt?: string;
  closedAt?: string | null;
  closedBy?: string | null;
  createdAt?: string;
  movedToId?: null;
  iid?: number;
  labels?: Array<string>;
  upvotes?: number;
  downvotes?: number;
  mergeRequestsCount?: number;
  userNotesCount?: number;
  dueDate?: string;
  webUrl?: string;
  references?: References;
  timeStats?: TimeStats;
  hasTasks?: boolean;
  taskStatus?: string;
  confidential?: boolean;
  discussionLocked?: boolean;
  links?: IssueLinks;
  taskCompletionStatus?: TaskCompletionStatus;
  relatedMergeRequests?: Array<MergeRequest>;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  static apiResponseToInstance(response: any): Issue {
    const issue = new Issue(response.id, response.name);
    Object.keys(response).forEach(key => {
      // @ts-ignore
      issue[snakeCaseToCamelCase(key)] = response[key];
    });

    issue.author = Author.apiResponseToInstance(response.author);
    issue.milestone = Milestone.apiResponseToInstance(response.author);
    issue.assignees = response.assignees && response.assignees.map(User.apiResponseToInstance);
    issue.assignee = User.apiResponseToInstance(response.assignee);
    issue.references = References.apiResponseToInstance(response.references);
    issue.timeStats = TimeStats.apiResponseToInstance(response.time_stats);
    issue.taskCompletionStatus = TaskCompletionStatus
      .apiResponseToInstance(response.task_completion_status);
    issue.links = response._links;
    return issue;
  }
}
