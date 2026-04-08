import { useState } from "react";
import styles from "../styles/CustomSelect.module.css";

export default function CustomSelect() {
  const options = ["Histórico de Entrada", "Histórico de Saída"];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className={styles.selectContainer}>
      <div
        className={styles.selectBox}
        onClick={() => setOpen(!open)}
      >
        {selected}
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}