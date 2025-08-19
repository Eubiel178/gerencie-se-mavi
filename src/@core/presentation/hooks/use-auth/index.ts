import { GerenciSe, GerenciseTypes } from "@/@core/container";

import { RemoteUser } from "@/@core/data";

export function useUser() {
  return { fetcher: GerenciSe.get<RemoteUser>(GerenciseTypes.RemoteUser) };
}
