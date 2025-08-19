import * as domain from "@/@core/domain";

import { IHttpAdpter } from "@/@core/infra/adapters/interfaces";

export class RemoteTask
  implements
    domain.CreateTask,
    domain.LoadAllTasks,
    domain.DeleteTask,
    domain.EditTask
{
  constructor(private http: IHttpAdpter) {}

  async create(params: domain.CreateTask.Params) {
    return await this.http.request({
      url: "list",
      method: "post",
      body: params,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${params.token}`,
      },
    });
  }

  async loadAll(params: domain.LoadAllTasks.Params) {
    return await this.http.request({
      url: `list/user-id/${params.userID}`,
      method: "get",
      body: params,
      // cache: "force-cache",
      // next: {
      //   tags: ["load-tasks"],
      // },
    });
  }

  async edit(params: domain.EditTask.Params) {
    return await this.http.request({
      url: `list/task-id/${params?._id}`,
      method: "patch",
      body: params,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${params.token}`,
      },
    });
  }

  async delete(params: domain.DeleteTask.Params) {
    return await this.http.request({
      url: `list/task-id/${params?._id}`,
      method: "delete",
    });
  }
}
