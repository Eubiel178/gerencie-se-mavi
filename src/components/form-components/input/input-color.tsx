import { forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { useInputRootContext } from "@/providers/InputRootContext";

const inputStyles = tv({
  base: "w-full border border-solid p-0 rounded-lg",

  variants: {
    incorrect: {
      true: "border-red-500 placeholder-red-500",
      false: "border-stone-200",
    },
  },
});

type InputFieldProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputStyles>;

export const InputColor = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type = "color", name, placeholder, className, ...rest }, ref) => {
    const { sharedProps } = useInputRootContext();
    const incorrect = sharedProps?.error ? true : false;

    return (
      <input
        {...rest}
        className={inputStyles({ className, incorrect: incorrect })}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);

InputColor.displayName = "InputColor";
