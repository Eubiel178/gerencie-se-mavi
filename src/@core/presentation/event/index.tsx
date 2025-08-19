import { Wrapper } from "@/components";

import { Calendar, EventList, EventListHeader } from "./components";

import { useEvent } from "../hooks";

export function Event() {
  const { fetcher } = useEvent();

  const eventsList = [{}] as any;

  return (
    <>
      <Calendar eventsList={eventsList} />

      <Wrapper
        direction="column"
        gap="xlarge"
        background="light"
        shadow="small"
        padding="small"
      >
        <EventListHeader />

        <EventList eventsList={eventsList} />
      </Wrapper>
    </>
  );
}
