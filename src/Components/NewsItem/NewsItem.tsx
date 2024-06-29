import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Storytype } from "../../Utils/Types/types";

function NewsItem({ story }: Storytype) {
  const normalizeDate = new Date(story.time * 1000);
    
  return (
    <div className={styles.card}>
      <h1 className="card">
        <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
      </h1>
      <div className="descriotion">
        <p>
          Автор: <strong>{story.by}</strong>
        </p>
        <p>
          Дата: <strong>{normalizeDate.toLocaleString()}</strong>{" "}
        </p>
        <p>
          Рейтинг <strong>{story.score}</strong>
        </p>
        <Link to = {`/${story.id}`}>На страницу с комментариями</Link>
      </div>
    </div>
  );
}

export default NewsItem;
