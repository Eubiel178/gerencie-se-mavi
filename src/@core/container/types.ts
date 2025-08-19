import { ConfigsTypes } from "./configs";

import { EventTypes } from "./event";
import { ReminderTypes } from "./reminder";
import { TaskTypes } from "./task";
import { UserTypes } from "./user";

export const GerenciseTypes = {
  ...ConfigsTypes,
  ...EventTypes,
  ...TaskTypes,
  ...UserTypes,
  ...ReminderTypes,
};
