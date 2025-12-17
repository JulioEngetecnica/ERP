import React from "react";
import Sidebar from "../../components/sidebar";
import styles from "./Home.module.css";
import HorizontalShelf from "../../components/shelf"; 

export default function Home() {
  return (
    <div className={styles["home-container"]}>
      {/* <Sidebar /> */}
      <main className={styles["home-content"]}>
        <HorizontalShelf />
      </main>
    </div>
  );
};
