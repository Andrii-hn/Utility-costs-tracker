import { useLocation } from "react-router-dom";
import styles from "./Header.module.css"

function Header({ onLoginClick }) {
  const authPages = ["/login", "/register"];
  const path = useLocation();
  const pathname = path.pathname;
  const isAuthPage = authPages.includes(pathname);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Bills & Costs
        </div>

        {!isAuthPage && <button className={styles.loginButton} onClick={onLoginClick}>Увійти</button>}
      </div>
    </header>
  )
}

export default Header