import { useParams } from "react-router-dom";
import { fetchStoryDetails, fetchCommentDetails } from "../Utils/Api/api";
import { useEffect, useState } from "react";
import { Comment } from "../Utils/Types/types";
import { Story } from "../Utils/Types/types";
function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string }>();
  const [strory, setStory] = useState<Story>();
  useEffect(() => {
    /**
     * Загружает детали истории и комментарии.
     */
    const loadDetails = async () => {
      const story = await fetchStoryDetails(Number(id));
      setStory(story);
      if (story.kids) {
        const commentPromises = story.kids.map((kidId: number) =>
          fetchCommentDetails(kidId)
        );
        const comments = await Promise.all(commentPromises);
        setComments(comments);
      }
    };
    loadDetails();
  }, [id]);

  /**
   * Отображает список комментариев.
   * @param {number[]} commentIds - Массив ID комментариев.
   * @returns  Список комментариев.
   */

  const renderComments = (commentIds: number[]) => {
    if (commentIds.length == 0) {
     return (<h1>Комментариев нет!</h1>)

    } 
    return (
      
      <ul>
        {commentIds.map((commentId) => (
          <CommentItem key={commentId} commentId={commentId} />
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <a href={strory && strory.url} target="_blank" rel="noopener noreferrer"><h1>{strory && strory.title}</h1></a>
      {renderComments(comments.map((comment) => comment.id))}
    </div>
  );
}

type CommentItemProps = {
  commentId: number;
};

const CommentItem: React.FC<CommentItemProps> = ({ commentId }) => {
  const [comment, setComment] = useState<Comment | null>(null);

  useEffect(() => {
    const loadComment = async () => {
      const fetchedComment = await fetchCommentDetails(commentId);
      if (fetchedComment) {
        setComment(fetchedComment);
      }
    };
    loadComment();
  }, [commentId]);

  if (!comment) {
    return <li>Loading comment...</li>;
  }


   
  return (


    <li>
      <p>
        <strong>{comment.by} </strong>  |{" "}
        {new Date(comment.time * 1000).toLocaleString()}
      </p>
      {comment.text ? (
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      ) : (
        <p>No content</p>
      )}
      {comment.kids && comment.kids.length > 0 && (
        <ul >
          {comment.kids.map((kidId) => (
            <CommentItem key={kidId} commentId={kidId} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentsPage;
