// Sidebar.jsx
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import "@/styles/index.css";
import {itensMenu} from "./itensMenu";

export default function Sidebar({
  image = "https://ui-avatars.com/api/?name=Usuário+Teste",
  name = "Nome do Usuário",
  menu = itensMenu,
}) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <aside
        className={`${styles.sb} ${open ? styles.open : ""}`}
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <div className={styles["sb-inner"]} onClick={(e) => e.stopPropagation()}>
          {/* Botão interno para abrir/fechar */}
          <button className={styles["sb-toggle"]} onClick={() => setOpen((v) => !v)}>
            ☰
          </button>

          {/* Avatar + Nome somente quando aberto */}
          {/* {open && (
            <>
              <img className={styles["sb-avatar"]} src={image} alt={name} />
              <div className={styles["sb-name"]}>{name}</div>
            </>
          )} */}

          {/* Itens do menu */}
          {menu.map((item, index) => (
            <div key={index} className={styles["sb-item-wrapper"]}>
              <button
                className={`${styles["sb-btn"]} ${item.submenu ? styles["has-submenu"] : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);

                  if (item.submenu) {
                    toggleSubmenu(index);
                  } else {
                    item.onClick?.();
                  }
                }}
              >
                {/* Ícone / Avatar do item */}
                <div className={styles["sb-icon"]}>
                  {item.icon && React.createElement(item.icon, { size: 26 })}
                </div>

                {/* Texto somente quando expandido */}
                {open && <span>{item.label}</span>}
              </button>

              {/* Submenu */}
              {item.submenu && (
                <div
                  className={`${styles["sb-submenu"]} ${
                    openSubmenu === index && open ? styles.open : ""
                  }`}
                >
                  {item.submenu.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      className={styles["sb-submenu-btn"]}
                      onClick={(e) => {
                        e.stopPropagation();
                        sub.onClick?.();
                      }}
                    >
                      {sub.icon && React.createElement(sub.icon, { size: 20 })}
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Backdrop para fechar o menu */}
      {open && <div className={styles["sb-backdrop"]} onClick={() => setOpen(false)} />}
    </>
  );
}
