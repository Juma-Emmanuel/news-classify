// src/components/NewsPDFManager.js
import React, { useState } from "react";
import { useArticles } from "../../data/repos/articles";

function NewsPDFManager() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [pdf, setPdf] = useState(null);
  const [filter, setFilter] = useState("All");
  const { articles, categories, uploadArticle, loading } = useArticles();

  const handleUpload = async () => {
    try {
      await uploadArticle({ title, category, file: pdf });
      setTitle("");
      setCategory("");
      setPdf(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h2> Upload News PDF</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <br />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
      />
      <br />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <hr />
      <h3> Filter by Category</h3>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <hr />
      <h3> Articles</h3>
      {filteredArticles.map((article) => (
        <div key={article.id} style={{ marginBottom: "2rem" }}>
          <strong>{article.title}</strong> ({article.category})<br />
          <iframe
            src={article.pdf_url}
            width="100%"
            height="400px"
            title={article.title}
          />
        </div>
      ))}
    </div>
  );
}

export default NewsPDFManager;
