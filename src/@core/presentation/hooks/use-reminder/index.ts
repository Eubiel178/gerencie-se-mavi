import { GerenciSe, GerenciseTypes } from "@/@core/container";

import { RemoteReminder } from "@/@core/data";

export function useReminder() {
  return {
    fetcher: GerenciSe.get<RemoteReminder>(GerenciseTypes.RemoteReminder),
  };
}
