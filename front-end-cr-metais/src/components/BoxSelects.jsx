import { useState } from "react";
import styles from "../styles/CustomSelect.module.css";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Selecione...",
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectBox} onClick={() => setOpen(!open)}>
        <span style={{ color: value ? "inherit" : "#aaa" }}>
          {value || placeholder}
        </span>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.length === 0 ? (
            <div className={styles.option} style={{ color: "#aaa", cursor: "default" }}>
              Nenhuma opção disponível
            </div>
          ) : (
            options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${value === option ? styles.selected : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}