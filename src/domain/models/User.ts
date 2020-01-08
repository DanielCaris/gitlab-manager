export default class User {
// {
//   "state" : "active",
//   "id" : 1,
//   "name" : "Administrator",
//   "web_url" : "https://gitlab.example.com/root",
//   "avatar_url" : null,
//   "username" : "root"
// }

  static apiResponseToInstance(response: any): User {
    return new User();
  }
}
