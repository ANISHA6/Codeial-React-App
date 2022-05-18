import { useState } from "react";
import { useToasts } from "react-toast-notifications";

import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { usePosts } from "../hooks";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    // do some checks
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      posts.addPostToState(response.data.post);
      addToast("Post created successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding post..." : "Add post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
