import { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react";

import styles from "./UserMenu.module.css"

function UserMenu({ email, onLogout }) {
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <nav ref={menuRef} className={styles.root}>
      <button onClick={() => setOpen(prev => !prev) } className={styles.trigger}>
        <span>{email}</span>
        <ChevronDown size={16} />
      </button>
      {isOpen && 
        <div className={styles.dropdown}>
          <button className={styles.item}>Profile</button>
          <button className={styles.item}>Settings</button>
          <button onClick={onLogout} className={`${styles.item} ${styles.logout}`}>Logout</button>
        </div> }
    </nav>
  )
}

export default UserMenu