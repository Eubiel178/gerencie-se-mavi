"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { tv } from "tailwind-variants";
import { Wrapper } from "..";
import { twMerge } from "tailwind-merge";

const styles = tv({
  base: "w-[90vw] max-w-[30rem]  bg-gray-100 border-solid border-2 border-gray-300 z-40 relative rounded-lg overflow-hidden",
});

type ModalProps = React.ComponentProps<typeof Wrapper> & {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  className,
  ...rest
}: ModalProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.setAttribute("id", "modal-portal");
    document.body.appendChild(el);
    setPortalElement(el);

    return () => {
      if (el.parentNode === document.body) {
        document.body.removeChild(el);
      }
    };
  }, []);

  // Bloqueia scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !portalElement) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center w-full h-full"
      onClick={onClose} // fecha ao clicar no fundo
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Wrapper
          className={twMerge(styles(), className)}
          direction="column"
          gap="large"
          padding="large"
          shadow="large"
          {...rest}
        >
          {children}
        </Wrapper>
      </div>
    </div>,
    portalElement
  );
};

// import { tv } from "tailwind-variants";
// import { Wrapper } from "..";

// const styles = tv({
//   base: "w-[23rem] fixed transform z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 border-solid border-2 border-gray-300",
// });

// type ModalProps = React.ComponentProps<typeof Wrapper>;

// // export const Modal = ({ children, ...rest }: ModalProps) => {
// //   return (
// //     <Wrapper
// //       className={styles()}
// //       direction="column"
// //       gap="large"
// //       padding="large"
// //       shadow="large"
// //       {...rest}
// //     >
// //       {children}
// //     </Wrapper>
// //   );
// // };
// export const Modal = ({ children, ...rest }: ModalProps) => {
//   return (
//     <Wrapper
//       className={styles()}
//       direction="column"
//       gap="large"
//       padding="large"
//       shadow="large"
//       {...rest}
//     >
//       {children}
//     </Wrapper>
//   );
// };
