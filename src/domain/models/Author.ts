export default class Author {

  id: number;
  name: string;
  state?: string;
  webUrl?: string;
  avatarUrl?: string | null;
  username?: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static apiResponseToInstance(response: any): Author {
    const author = new Author(response.id, response.name);
    author.state = response.state;
    author.webUrl = response.web_url;
    author.avatarUrl = response.avatar_url;
    author.username = response.username;
    return author;
  }
}
