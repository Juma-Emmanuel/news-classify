import { useState } from "react";
import { Upload, X, FileText, User, Mail, Type } from "lucide-react";
import { useArticles } from "../../data/repos/articles";
const ArticleUploadModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setexcerpt] = useState("");
  const [readtime, setreadTime] = useState("");
  const [pdf, setPdf] = useState(null);
  const [filter, setFilter] = useState("All");
  const { articles, categories, uploadArticle, loading } = useArticles();
  const [formData, setFormData] = useState({
    category: "",
    excerpt: "",
    title: "",
    file: null,
    fileName: "",
  });

  const handleUpload = async () => {
    try {
      await uploadArticle({
        title,
        category,
        readtime,
        excerpt,
        file: pdf,
      });
      setTitle("");
      setCategory("");
      setexcerpt("");
      setreadTime("");
      setPdf(null);
    } catch (err) {
      alert(err.message);
    }
  };
  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        fileName: file.name,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="absolute top-full mt-2 right-0 w-[400px] md:w-[600px] bg-white rounded-lg shadow-xl z-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center">
        <h2 className="text-white text-xl font-semibold">
          Submit Your Article
        </h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={24} />
        </button>
      </div>

      {/* <form onSubmit={handleSubmit} className="p-6 space-y-6"> */}
      <div className="space-y-4 p-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Article's Title"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Excerpt
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setexcerpt(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Article's excerpt"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Article's Category"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Read Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={readtime}
              onChange={(e) => setreadTime(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Article's Read Time"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Document
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                {" "}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {loading ? "Uploading..." : "Upload article"}
        </button>
      </div>
    </div>
  );
};

export default ArticleUploadModal;
