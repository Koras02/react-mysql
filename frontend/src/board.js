import React, { useEffect, useState } from "react";
import axios from "axios";

const Board = () => {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/posts", {
      title,
      content,
    });
    setPosts([...posts, res.data]);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>게시판</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          required
        />
        <button type="submit">게시글 작성</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
