"use client";

import { useRouter, usePathname } from "next/navigation";
import { useParamsUrl } from "@/@core/presentation/hooks/use-params-url";

import { Input, Wrapper } from "@/components";
import { AddTask } from "../modal";
import { taskTags } from "../../utils";
import Link from "next/link";
import { buttonStyles } from "@/components/form-components/button";

export function TasksListHeader() {
  const router = useRouter();
  const pathaname = usePathname();
  const paramsUrl = useParamsUrl();

  function handleTag(event: React.ChangeEvent<HTMLSelectElement>) {
    return router.push(
      pathaname + paramsUrl.createQueryString("tag", event.target.value)
    );
  }

  return (
    <Wrapper
      className="tasks-list-header"
      justify="between"
      align="stretch"
      direction="row"
    >
      <Input.Root>
        <Input.Wrapper>
          <Input.FieldSelect
            title="Listar tarefas por tag"
            optionsArray={[{ label: "Todas", value: "todos" }, ...taskTags]}
            onChange={handleTag}
            className="py-1 px-2"
          />
        </Input.Wrapper>
      </Input.Root>

      <div className="h-full items-stretch flex gap-2">
        <Link
          // type="button"
          // onClick={() => setIsOpen(true)}
          className={buttonStyles({
            className:
              "rounded-lg text-sm bg-blue-500 flex w-full justify-center items-center",
          })}
          href="/home/lembrete"
        >
          Adicionar lembrete
        </Link>
        <AddTask />
      </div>
    </Wrapper>
  );
}
