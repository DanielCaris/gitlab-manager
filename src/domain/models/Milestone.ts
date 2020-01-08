export default class Milestone {
  id: number;
  title: string;
  projectId?: number;
  description?: string;
  state?: string;
  dueDate?: string | null;
  iid?: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  static apiResponseToInstance(response: any): Milestone {
    const milestone = new Milestone(response.id, response.title);
    milestone.projectId = response.project_id;
    milestone.description = response.description;
    milestone.state = response.state;
    milestone.dueDate = response.due_date;
    milestone.iid = response.iid;
    milestone.createdAt = response.created_at;
    milestone.updatedAt = response.updated_at;
    return milestone;
  }
}
