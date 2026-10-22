import styles from "./NewCardForm.module.css";

export function NewCardForm() {
  return (
    <div className={styles.form}>
      <input className={styles.input} placeholder="Название карточки" />
      <button className={styles.button} type="button">
        Добавить
      </button>
    </div>
  );
}
