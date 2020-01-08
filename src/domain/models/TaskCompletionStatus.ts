export default class TaskCompletionStatus {
// {
//   "count":0,
//   "completed_count":0
// }

  static apiResponseToInstance(response: any): TaskCompletionStatus {
    return new TaskCompletionStatus();
  }
}
