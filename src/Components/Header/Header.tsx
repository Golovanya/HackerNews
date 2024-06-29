import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type HeaderProps = {
  update: (newFilter: string) => void;
  filter: string;
  reboot: (newBoot: number) => void;
};

function Header({ update, filter, reboot }: HeaderProps) {
  const Filters = ["newstories", "topstories", "beststories"];
  

  const bigFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link to="/">
          <h2 className={styles.headerTitle}>News test-task</h2>
        </Link>

        <button className={styles.btn} onClick={() => reboot(Math.random())}>
          Обновить список
        </button>
        <div className={styles.btns}>
          {Filters.map((el) => {
            return (
              <button
                key={el}
                className={el === filter ? styles.activebtn : styles.btn}
                onClick={() => update(el)}
              >
                {bigFirstLetter(el)}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
