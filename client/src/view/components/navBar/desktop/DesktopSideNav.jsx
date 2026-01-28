// desktop/DesktopSideNav.jsx
import React from "react";
import styles from "./DesktopSideNav.module.css";

export default function DesktopSideNav({
  open,
  setOpen,
  openSubmenu,
  toggleSubmenu,
  menu,
  image,
  name,
}) {
  return (
    <>
      <aside
        className={`${styles.sb} ${open ? styles.open : ""}`}
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <div className={styles["sb-inner"]} onClick={(e) => e.stopPropagation()}>
          <img className={styles["sb-avatar"]} src={image} alt={name} />

          <button className={styles["sb-toggle"]} onClick={() => setOpen((v) => !v)}>
            ☰
          </button>

          {menu.map((item, index) => (
            <div key={index} className={styles["sb-item-wrapper"]}>
              <button
                className={`${styles["sb-btn"]} ${item.submenu ? styles["has-submenu"] : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);

                  if (item.submenu) toggleSubmenu(index);
                  else item.onClick?.();
                }}
              >
                <div className={styles["sb-icon"]}>
                  {item.icon && React.createElement(item.icon, { size: 26 })}
                </div>
                {open && <span>{item.label}</span>}
              </button>

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

      {open && <div className={styles["sb-backdrop"]} onClick={() => setOpen(false)} />}
    </>
  );
}
