"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";

import { FaHome } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import { ListItem } from "./list-item";
import NotificationButton from "./notification-button";
import { LogoutButton } from "./logout";

const headerStyles = tv(
  {
    slots: {
      base: "relative bg-gray-600 text-slate-50 shadow-sm flex items-center gap-2 py-3 px-4",
      burguerButton: "text-2xl",
      navBar: "",
      navList: "flex flex-col gap-3",
      buttonCloseNav: "hidden text-2xl",
    },

    variants: {
      responsive: {
        mobile: {
          base: "w-full justify-between ",
          burguerButton: "block",
          navBar: "hidden absolute right-2 top-3 w-40 bg-gray-600",
          navList: "relative",
          buttonCloseNav: "absolute right-3 top-3",
        },

        smal: {
          base: "flex-col w-48 justify-start",
          burguerButton: "hidden",
          navBar: "block static bg-transparent",
        },
      },

      navMobileOpen: {
        true: {
          burguerButton: "hidden",
          navBar: "block",
          buttonCloseNav: "block",
        },
      },
    },
  },

  {
    responsiveVariants: ["sm", "md"],
  }
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tv = headerStyles({
    responsive: {
      initial: "mobile",
      md: "mobile",
    },
  });

  const handleNavModal = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={tv.base()}>
      <h1
        style={{
          lineHeight: 1,
        }}
        className="text-base font-bold"
      >
        Gerencie-se
      </h1>

      <div className="flex items-center gap-2">
        <NotificationButton />
        <LogoutButton />
      </div>
      {/* <button
        type="button"
        className={tv.burguerButton({ navMobileOpen: isOpen })}
        onClick={handleNavModal}
      >   <button onClick={handleNavModal}>
              <IoClose />
            </button>
        <GiHamburgerMenu />
      </button> */}

      {/* 
      <nav className={tv.navBar({ navMobileOpen: isOpen })}>
        <ul className={tv.navList()}>
          <li className={tv.buttonCloseNav({ navMobileOpen: isOpen })}>
            <button onClick={handleNavModal}>
              <IoClose />
            </button>
          </li>

          {/* <ListItem href="/home" icon={FaHome}>
            Home
          </ListItem> */}

      {/* <ListItem href="/home/event" icon={MdEvent}>
            Evento
          </ListItem> 
        </ul>
      </nav> 
      */}
    </header>
  );
};
