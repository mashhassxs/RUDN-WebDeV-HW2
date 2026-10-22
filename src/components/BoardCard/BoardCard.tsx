import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onDelete: (id: string) => void;
};

export function BoardCard({ id, title, isDone, onDelete }: BoardCardProps) {
  return (
    <div className={isDone ? styles.isDone : styles.card}>
      <span>{title}</span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(id)}
      >
        Удалить
      </button>
    </div>
  );
}
