import { Container } from "inversify";
import { ReminderTypes } from "./types";
import { configsContainer } from "../configs";
import { AxiosAdapter } from "@/@core/infra";
import { RemoteReminder } from "@/@core/data";

export const reminderContainer = new Container();

reminderContainer.parent = configsContainer;

reminderContainer
  .bind(ReminderTypes.RemoteReminder)
  .toDynamicValue(function () {
    return new RemoteReminder(new AxiosAdapter());
  });
