"use client";
import Link from "next/link";

import { Wrapper } from "@/components";
import { AddReminder } from "../modal";
import { buttonStyles } from "@/components/form-components/button";

export function TasksListHeader() {
  return (
    <Wrapper
      className="tasks-list-header"
      justify="end"
      align="stretch"
      direction="row"
    >
      <div className="h-full items-stretch flex gap-2">
        <Link
          // type="button"
          // onClick={() => setIsOpen(true)}
          className={buttonStyles({
            className: "rounded-lg text-sm bg-blue-500",
          })}
          href="/home/"
        >
          Pagina Inicial
        </Link>

        <AddReminder />
      </div>
    </Wrapper>
  );
}
