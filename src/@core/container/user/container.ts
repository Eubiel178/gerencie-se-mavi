import { Container } from "inversify";
import { RemoteUser } from "@/@core/data";
import { UserTypes } from "./types";
import { configsContainer } from "../configs";
import { AxiosAdapter } from "@/@core/infra";

export const userContainer = new Container();

userContainer.parent = configsContainer;

userContainer.bind(UserTypes.RemoteUser).toDynamicValue(function () {
  return new RemoteUser(new AxiosAdapter());
});
