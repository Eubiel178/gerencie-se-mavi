"use client";

import { List, Wrapper, Feedback } from "@/components";
import { useUserContext } from "@/providers";
import { Card } from "./card";

export function ReminderList() {
  const { reminders, user } = useUserContext();

  return (
    <>
      {reminders && reminders?.length > 0 ? (
        <List
          direction="row"
          wrap="wrap"
          className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 sm:gap-5 gap-3 tasks-list"
        >
          {reminders?.map((reminder) => (
            <Card key={reminder?._id} reminder={reminder} />
          ))}
        </List>
      ) : (
        <Wrapper>
          <Feedback>
            Nenhum <strong>lembrete</strong> adicionado
          </Feedback>
        </Wrapper>
      )}
    </>
  );
}
