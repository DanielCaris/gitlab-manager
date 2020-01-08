export default class References {
// {
//   "short": "#6",
//   "relative": "my-group/my-project#6",
//   "full": "my-group/my-project#6"
// }

  static apiResponseToInstance(response: any): References {
    return new References();
  }
}
