"use client";

import { forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { useInputRootContext } from "@/providers/InputRootContext";
import { twMerge } from "tailwind-merge";

const selectStyles = tv({
  base: "appearance-none w-full border border-solid border-stone-200 p-2 rounded-lg",

  variants: {
    incorrect: {
      true: "border-red-500 placeholder-red-500",
      false: "border-stone-200",
    },
  },
});

type OptionSelectProps = {
  label: string;
  value: string;
};

interface InputFieldSelectProps
  extends React.ComponentProps<"select">,
    VariantProps<typeof selectStyles> {
  optionsArray: OptionSelectProps[];
  placeholder?: string;
}

export const InputFieldSelect = forwardRef<
  HTMLSelectElement,
  InputFieldSelectProps
>(
  (
    { className, name, optionsArray, placeholder = "Selecione", ...rest },
    ref
  ) => {
    const { sharedProps } = useInputRootContext();
    const incorrect = sharedProps?.error ? true : false;

    return (
      <select
        {...rest}
        className={twMerge(
          selectStyles({ className, incorrect: incorrect }),
          className
        )}
        id={name}
        name={name}
        ref={ref}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {optionsArray.map((element, index) => (
          <option key={index} value={element.value}>
            {element.label}
          </option>
        ))}
      </select>
    );
  }
);

InputFieldSelect.displayName = "InputFieldSelect";
