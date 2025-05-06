import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { useArticles } from "../../data/repos/articles";
import ArticleCard from "./article_card";

function SearchView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { articles } = useArticles();
  const wrapperRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const results = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
    setShowDropdown(true);
    document.addEventListener("mousedown", handleClickOutside);
  }, [searchTerm, articles]);

  function handleClickOutside(event) {
    if (
      showDropdown &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  }

  return (
    <div className="relative w-full max-w-sm px-4">
      <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="w-full pl-10 md:w-[300px] lg:w-[400px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showDropdown && searchTerm && (
        <div
          ref={wrapperRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-[80vw] max-w-md bg-white border rounded shadow-lg z-10 max-h-100 overflow-y-auto mt-1"
        >
          {filtered.length === 0 ? (
            <p className="p-4 text-gray-500">No results found.</p>
          ) : (
            filtered.map((article) => (
              <div className="mb-4">
                <ArticleCard key={article.id} article={article} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchView;
