export enum MergeRequestStatus {
  merged = 'merged',
}

export default class MergeRequest {
  id: number;
  iid: number;
  mergeStatus: MergeRequestStatus;

  constructor(id: number, iid: number, mergeStatus: MergeRequestStatus) {
    this.id = id;
    this.iid = iid;
    this.mergeStatus = mergeStatus;
  }

  static apiResponseToInstance(response: any): MergeRequest {
    return new MergeRequest(response.id, response.iid, response.state);
  }
}
