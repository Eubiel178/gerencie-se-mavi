import { VariantProps, tv } from "tailwind-variants";

const labelStyles = tv({
  base: "font-semibold",

  variants: {
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-lg",
      xlarge: "text-xl",
    },
  },
});

type InputLabelProps = React.ComponentProps<"label"> &
  VariantProps<typeof labelStyles>;

export const InputLabel = ({
  children,
  htmlFor,
  size = "medium",
}: InputLabelProps) => {
  return (
    <label className={labelStyles({ size })} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
