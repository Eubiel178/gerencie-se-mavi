import "reflect-metadata";

import { Container } from "inversify";

import { configsContainer } from "./configs";
import { eventContainer } from "./event";
import { taskContainer } from "./task";
import { userContainer } from "./user";
import { reminderContainer } from "./reminder";

export const GerenciSe = Container.merge(
  configsContainer,
  eventContainer,
  taskContainer,
  userContainer,
  reminderContainer
);
