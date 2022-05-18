import { createContext } from "react";

import { useProvidePosts } from "../hooks";

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
  addComment: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
