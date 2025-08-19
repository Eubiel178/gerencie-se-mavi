import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const buttonStyles = tv({
  base: "bg-stone-200 p-1.5 rounded-lg",
});

type InputButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>;

export const InputButton = ({
  children,
  className,
  ...rest
}: InputButtonProps) => {
  return (
    <button
      {...rest}
      type="button"
      className={twMerge(buttonStyles(), className)}
    >
      {children}
    </button>
  );
};
