import { Section, TasksList, TasksListHeader } from "./components";

export function Home() {
  return (
    <Section>
      <TasksListHeader />

      <TasksList />
    </Section>
  );
}
