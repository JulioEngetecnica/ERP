// navbar/index.jsx
import React, { useState } from "react";
import "@/view/styles/index.css";
import styles from "./NavbarOrchestrator.module.css";

import DesktopSideNav from "./desktop/DesktopSideNav";
import MobileNav from "./mobile/MobileNav";
import { useItensMenu } from "./itens/itensMenu";

import { Outlet } from "react-router-dom";

export default function Navbar({
  image = "https://ui-avatars.com/api/?name=Usuário+Teste",
  name = "Nome do Usuário",
}) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const menu = useItensMenu(() => setOpen(false));

  return (
    <>
      {/* DESKTOP */}
      <div className={styles.desktopOnly}>
        <DesktopSideNav
          open={open}
          setOpen={setOpen}
          openSubmenu={openSubmenu}
          toggleSubmenu={toggleSubmenu}
          menu={menu}
          image={image}
          name={name}
        />
      </div>

      {/* MOBILE */}
      <div className={styles.mobileOnly}>
        <MobileNav
          open={open}
          setOpen={setOpen}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          toggleSubmenu={toggleSubmenu}
          menu={menu}
          image={image}
          name={name}
        />
      </div>

      {/* Conteúdo */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}
