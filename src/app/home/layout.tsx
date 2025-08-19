import { Header } from "@/components";
import { tv } from "tailwind-variants";

const styles = tv(
  {
    slots: {
      pageContainer: "",
      mainContainer: "relative gap-8 p-4",
    },

    variants: {
      responsive: {
        desktop: {
          pageContainer: "",
        },
      },
    },

    compoundSlots: [
      {
        slots: ["pageContainer", "mainContainer"],
        className: "flex-1 flex flex-col",
      },
    ],
  },

  {
    responsiveVariants: ["md"],
  }
);

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const tv = styles({
    responsive: {
      md: "desktop",
    },
  });

  return (
    <div className={tv.pageContainer()}>
      <Header />

      <main className={tv.mainContainer()}>{children}</main>
    </div>
  );
};

export default HomeLayout;
