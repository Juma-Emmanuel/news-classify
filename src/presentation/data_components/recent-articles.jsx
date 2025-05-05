import { Badge } from "../ui_components/badge";

// Sample data for recent articles
const recentArticles = [
  {
    id: 1,
    title: "Global Tech Giants Announce New AI Collaboration",
    category: "Technology",
  },
  {
    id: 2,
    title: "Senate Passes Landmark Climate Legislation",
    category: "Politics",
  },
  {
    id: 3,
    title: "Championship Finals Set After Dramatic Semifinal",
    category: "Sports",
  },
  {
    id: 4,
    title: "New Study Reveals Benefits of Mediterranean Diet",
    category: null,
  },
];

// Map categories to colors
const categoryColors = {
  Technology: "bg-amber-500 hover:bg-amber-600",
  Politics: "bg-rose-500 hover:bg-rose-600",
  Sports: "bg-emerald-500 hover:bg-emerald-600",
  Entertainment: "bg-sky-500 hover:bg-sky-600",
};

export default function RecentArticles() {
  return (
    <div className="space-y-4">
      {recentArticles.map((article) => (
        <div
          key={article.id}
          className="flex items-start justify-between gap-2"
        >
          <p className="text-sm line-clamp-1">{article.title}</p>
          {article.category ? (
            <Badge
              className={`shrink-0 ${
                categoryColors[article.category] || "bg-gray-500"
              }`}
            >
              {article.category}
            </Badge>
          ) : (
            <Badge variant="outline" className="shrink-0">
              Unclassified
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
