cat > client/src/components/BoardColumn/BoardColumn.tsx << 'EOF'
import type { Card } from "../../types/card";
import { BoardCard } from "../BoardCard/BoardCard";
import styles from "./BoardColumn.module.css";

type Props = {
  title: string;
  cards: Card[];
  onDelete: (id: string) => void;
}

export function BoardColumn({ title, cards, onDelete }: Props) {
  return (
    <section className={styles.column}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {cards.map(card => 
          <BoardCard 
            key={card.id}
            id={card.id}
            title={card.title} 
            isDone={card.isDone}
            onDelete={onDelete}
          />
        )}
      </div>
    </section>
  );
}
EOF
