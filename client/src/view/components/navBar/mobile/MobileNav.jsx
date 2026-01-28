// MobileNav.jsx
import React from "react";
import styles from "./MobileNav.module.css";

export default function MobileNav({
  open,
  setOpen,
  openSubmenu,
  setOpenSubmenu,
  toggleSubmenu,
  menu,
  image,
  name,
}) {
  // pega o item "Perfil" por label (fallback: segundo item)
  const profileItem =
    menu.find((x) => String(x.label || "").toLowerCase() === "perfil") || menu[1] || menu[0];

  return (
    <>
      {/* Bottom bar fixa */}
      <nav className={styles.bar} aria-label="Navegação">
        <button
          className={styles.iconBtn}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <button
          className={styles.iconBtn}
          aria-label="Perfil"
          onClick={(e) => {
            e.stopPropagation();
            if (profileItem?.submenu) {
              setOpen(true);
              toggleSubmenu(menu.indexOf(profileItem));
            } else {
              profileItem?.onClick?.();
            }
          }}
        >
          <span className={styles.svgWrap}>
            {profileItem?.icon && React.createElement(profileItem.icon, { size: 24 })}
          </span>
        </button>

        <button
          className={styles.avatarBtn}
          aria-label="Conta"
          onClick={() => setOpen(true)}
        >
          <img className={styles.avatar} src={image} alt={name} />
        </button>
      </nav>

      {/* Drawer fullscreen */}
      <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Fechar">
            ✕
          </button>

          <img className={styles.drawerAvatar} src={image} alt={name} />
          <div className={styles.drawerName}>{name}</div>
        </div>

        <div className={styles.drawerList}>
          {menu.map((item, index) => (
            <div key={index} className={styles.itemWrap}>
              <button
                className={styles.itemBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.submenu) {
                    toggleSubmenu(index);
                  } else {
                    item.onClick?.();
                    setOpen(false);
                  }
                }}
              >
                <span className={styles.itemIcon}>
                  {item.icon && React.createElement(item.icon, { size: 22 })}
                </span>
                <span className={styles.itemLabel}>{item.label}</span>
              </button>

              {item.submenu && (
                <div
                  className={`${styles.submenu} ${
                    openSubmenu === index ? styles.submenuOpen : ""
                  }`}
                >
                  {item.submenu.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      className={styles.subBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        sub.onClick?.();
                        setOpen(false);
                      }}
                    >
                      <span className={styles.subIcon}>
                        {sub.icon && React.createElement(sub.icon, { size: 18 })}
                      </span>
                      <span className={styles.subLabel}>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </>
  );
}
