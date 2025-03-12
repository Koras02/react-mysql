require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000; // 포트 변경

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER, // 환경 변수에서 사용자 이름 가져오기
  password: process.env.DB_PASSWORD, // 환경 변수에서 비밀번호 가져오기
  database: "board", // 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected...");
});

// 게시물 가져오기
app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// 게시물 추가하기
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) {
        console.error("Error inserting post:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id: result.insertId, title, content });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
