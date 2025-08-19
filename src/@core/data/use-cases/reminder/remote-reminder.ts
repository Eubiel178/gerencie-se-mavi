import * as domain from "@/@core/domain";
import { IHttpAdpter } from "@/@core/infra/adapters/interfaces";

export class RemoteReminder
  implements
    domain.CreateReminder,
    domain.LoadAllReminders,
    domain.DeleteReminder
{
  constructor(private http: IHttpAdpter) {}

  async create(params: domain.CreateReminder.Params) {
    return await this.http.request({
      url: "reminders",
      method: "post",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async loadAll(params: domain.LoadAllReminders.Params) {
    return await this.http.request({
      url: `reminders/user-id/${params.userID}`,
      method: "get",
    });
  }

  async delete(params: domain.DeleteReminder.Params) {
    return await this.http.request({
      url: `reminders/reminder-id/${params._id}`,
      method: "delete",
    });
  }
}
