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
    blockAfterEight?: boolean;
    blockHourLimit?: number; // hora a partir da qual o dia atual será bloqueado (ex: 8)
  };

export const InputFieldDate = forwardRef<HTMLInputElement, InputFieldDateProps>(
  (
    {
      type = "text",
      name,
      placeholder,
      className,
      blockAfterEight = false,
      blockHourLimit = 0,
      ...rest
    },
    ref
  ) => {
    const { sharedProps } = useInputRootContext();
    const incorrect = sharedProps?.error ? true : false;

    const [minDate, setMinDate] = useState<string | undefined>(undefined);

    useEffect(() => {
      if (blockAfterEight) {
        const now = new Date();
        const currentHour = now.getHours();
        const todayStr = now.toISOString().slice(0, 10);

        if (currentHour >= blockHourLimit) {
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          const tomorrowStr = tomorrow.toISOString().slice(0, 10);
          setMinDate(tomorrowStr);
        } else {
          setMinDate(todayStr);
        }
      }
    }, [blockAfterEight, blockHourLimit]);

    return (
      <input
        {...rest}
        className={inputStyles({ className, incorrect })}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        ref={ref}
        min={blockAfterEight ? minDate : rest.min}
      />
    );
  }
);

InputFieldDate.displayName = "InputFieldDate";
