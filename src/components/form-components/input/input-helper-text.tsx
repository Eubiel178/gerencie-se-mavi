"use client";

import { useInputRootContext } from "@/providers/InputRootContext";
import { VariantProps, tv } from "tailwind-variants";

const textStyles = tv({
  base: "text-red-500 text-xs py-2 px-3",
});

type InputHelperTextProps = React.ComponentProps<"p"> &
  VariantProps<typeof textStyles>;

export const InputHelperText = ({}: InputHelperTextProps) => {
  const { sharedProps } = useInputRootContext();

  return <p className={textStyles()}>{sharedProps?.error}</p>;
};
