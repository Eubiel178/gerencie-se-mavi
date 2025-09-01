import * as domain from "@/@core/domain";

import { IHttpAdpter } from "@/@core/infra/adapters/interfaces";

export class RemoteUser
  implements
    domain.AuthUser,
    domain.CreateUser,
    domain.LoadAllUsers,
    // domain.DeleteUser,
    domain.LoadOneUser,
    domain.NotificationUser
{
  constructor(private http: IHttpAdpter) {}

  async notification(params: domain.NotificationUser.Params) {
    return await this.http.request({
      url: "save-subscription",
      method: "post",
      body: { ...params, userID: params?._id },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async auth(params: domain.AuthUser.Params) {
    const response = await this.http.request({
      url: "authenticate",
      method: "post",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = response?.data?._doc;

    if (user?._id && typeof window !== "undefined") {
      localStorage.setItem("token", user._id);
    }

    return { ...response, user } as {
      user: domain.IUser;
    };
  }

  async create(params: domain.CreateUser.Params) {
    return await this.http.request({
      url: "users",
      method: "post",
      body: params,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${params.token}`,
      },
    });
  }

  async loadAll() {
    return await this.http.request({
      url: "users",
      method: "get",
      cache: "force-cache",
      next: {
        tags: ["load-tasks"],
      },
    });
  }

  async loadOne(params: domain.LoadOneUser.Params) {
    const response = await this.http.request({
      url: `users/${params._id}`,
      method: "get",
    });

    const user = response?.data?.user;

    return { ...response, user } as {
      user: domain.IUser;
    };
  }

  // async delete(params: domain.DeleteTask.Params) {
  //   // return (await this.http.delete(`/event/${params.id}`)).data;
  // }
}
