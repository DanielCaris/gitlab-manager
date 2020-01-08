export default class TimeStats {
// {
//   "time_estimate": 0,
//   "total_time_spent": 0,
//   "human_time_estimate": null,
//   "human_total_time_spent": null
// }

  static apiResponseToInstance(response: any): TimeStats {
    return new TimeStats();
  }
}
