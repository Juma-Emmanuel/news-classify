// src/hooks/useArticles.js
import { useEffect, useState } from "react";
import supabase from "./supabase-client";
import { data } from "autoprefixer";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("articles-table")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data);
    const cats = Array.from(new Set(data.map((a) => a.category)));
    setCategories(["All", ...cats]);
    setLoading(false);
  };

  const uploadArticle = async ({
    title,
    category,
    readtime,
    excerpt,
    file,
  }) => {
    if (!title || !category || !readtime || !excerpt || !file)
      throw new Error("Missing required fields");

    const fileName = `${Date.now()}_${file.name}`;
    const { data: fileData, error: uploadError } = await supabase.storage
      .from("pdfs")
      //   .upload(fileName, file);
      .upload(fileName, file, { upsert: true });
    if (uploadError) {
      console.error("Upload error:", uploadError);
    }

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("pdfs")
      .getPublicUrl(fileData.path);

    const { error: dbError } = await supabase.from("articles-table").insert([
      {
        title,
        category,
        readtime,
        excerpt,
        pdf_url: urlData.publicUrl,
      },
    ]);

    if (dbError) {
      console.error("Database error:", dbError);
      // throw new Error("Failed to upload article to database");
    }

    if (dbError) throw dbError;

    await fetchArticles(); // Refresh list
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    categories,
    loading,
    uploadArticle,
    fetchArticles,
  };
}
