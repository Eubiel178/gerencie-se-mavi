"use client";

import { forwardRef, useEffect, useState } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { useInputRootContext } from "@/providers/InputRootContext";

const inputStyles = tv({
  base: "w-full border border-solid py-2 px-3 rounded-lg",
  variants: {
    incorrect: {
      true: "border-red-500 placeholder-red-500",
      false: "border-stone-200",
    },
  },
});

type InputFieldDateProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputStyles> & {
    blockAfterHour?: number; // Bloqueia o dia atual após determinado horário
    enableMinDate?: boolean; // Habilita min date a partir de hoje
  };

export const InputFieldDate = forwardRef<HTMLInputElement, InputFieldDateProps>(
  (
    {
      name,
      placeholder,
      className,
      blockAfterHour,
      enableMinDate = true,
      ...rest
    },
    ref
  ) => {
    const { sharedProps } = useInputRootContext();
    const incorrect = sharedProps?.error ? true : false;

    const [minDate, setMinDate] = useState<string | undefined>(undefined);

    useEffect(() => {
      const now = new Date();
      let startDate: Date | undefined = undefined;

      // Se enableMinDate = true, mínimo é hoje
      if (enableMinDate) {
        startDate = now;
      }

      // Se blockAfterHour definido e hora atual >= blockAfterHour, bloqueia hoje
      if (blockAfterHour !== undefined && now.getHours() >= blockAfterHour) {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        startDate = tomorrow;
      }

      // Atualiza minDate só se startDate tiver sido definido
      setMinDate(startDate?.toISOString().slice(0, 10));
    }, [enableMinDate, blockAfterHour]);

    return (
      <input
        {...rest}
        className={
          inputStyles({ incorrect }) + (className ? ` ${className}` : "")
        }
        type="date"
        name={name}
        id={name}
        placeholder={placeholder}
        ref={ref}
        min={minDate} // somente hoje em diante se enableMinDate = true
      />
    );
  }
);

InputFieldDate.displayName = "InputFieldDate";
