import { VariantProps, tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const listStyles = tv({
  base: "flex gap-5",

  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },

    wrap: {
      nowrap: " flex-nowrap",
      wrap: " flex-wrap",
    },
  },

  defaultVariants: {
    wrap: "wrap",
  },
});

type ListProps = React.ComponentProps<"ol"> & VariantProps<typeof listStyles>;

export const List = ({ children, direction, wrap, className }: ListProps) => {
  return (
    <ul className={twMerge(listStyles({ direction, wrap }), className)}>
      {children}
    </ul>
  );
};
