"use client";

import { useInputRootContext } from "@/providers/InputRootContext";
import { VariantProps, tv } from "tailwind-variants";

const textStyles = tv({
  base: "text-red-500 text-xs ",
});

type InputHelperTextProps = React.ComponentProps<"p"> &
  VariantProps<typeof textStyles>;

export const InputHelperText = ({}: InputHelperTextProps) => {
  const { sharedProps } = useInputRootContext();

  if (!sharedProps?.error) {
    return null;
  }

  return <p className={textStyles()}>{sharedProps?.error}</p>;
};
