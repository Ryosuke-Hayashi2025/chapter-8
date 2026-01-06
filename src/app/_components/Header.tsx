// app/_component/Header.tsx

import React from "react";
import styles from "../../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.Link}>
        Blog
      </Link>
      <Link href="/contact" className={styles.Link}>
        お問い合わせ
      </Link>
    </div>
  );
};

export default Header;
