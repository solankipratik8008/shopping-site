import React, { createContext, useContext, useState, useEffect } from 'react';

const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem('comments');
    return stored ? JSON.parse(stored) : [];
  });

  const addComment = (comment) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const removeComment = (indexToRemove) => {
    const updated = comments.filter((_, index) => index !== indexToRemove);
    setComments(updated);
    localStorage.setItem('comments', JSON.stringify(updated));
  };

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentContext.Provider value={{ comments, addComment, removeComment }}>
      {children}
    </CommentContext.Provider>
  );
};
