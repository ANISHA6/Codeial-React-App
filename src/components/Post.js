import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { createComment, toggleLike } from "../api";
import { usePosts } from "../hooks";
import styles from "../styles/home.module.css";
import { Comment } from "./";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        addToast("Comment created successfully!", {
          appearance: "success",
        });
      } else {
        addToast(response.message, {
          appearance: "error",
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");

    if (response.success) {
      if (response.data.deleted) {
        addToast("Like removed successfully!", {
          appearance: "success",
        });
      } else {
        addToast("Like added successfully!", {
          appearance: "success",
        });
      }
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?compress=1&resize=400x300"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons.flaticon.com/png/512/3128/premium/3128313.png?token=exp=1652855593~hmac=270b701540d7a3072dba7553bee2981c"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons.flaticon.com/png/512/2593/premium/2593491.png?token=exp=1652855742~hmac=a63cc8df7382a07101ae465524ed05e0"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
