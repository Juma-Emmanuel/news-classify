import React, { useState } from "react";
import { useArticles } from "../../data/repos/articles";
import ArticleCard from "./article_card";
import { Button } from "./button";

function Tabview() {
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const { articles, categories } = useArticles();
  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);
  return (
    <div className="div">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {categories.length === 0 ? (
          <h1>Upload articles to view</h1>
        ) : (
          categories.map((cat) => (
            <button
              key={cat}
              className={`${
                activeTab === cat
                  ? " text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              } rounded-md mx-2 px-4  font-bold border border-input hover:bg-accent hover:text-accent-foreground`}
              onClick={() => {
                setFilter(cat);
                setActiveTab(cat);
              }}
            >
              {" "}
              {...cat}
            </button>
          ))
        )}
      </div>
      <h3> Articles</h3>
      {filteredArticles.length === 0 ? (
        <h1>No articles found, Kindy upload to view</h1>
      ) : (
        filteredArticles.map((article) => (
          // </div>
          <div className="mb-4">
            <ArticleCard key={article.id} article={article} />
          </div>
        ))
      )}
    </div>
  );
}

export default Tabview;
