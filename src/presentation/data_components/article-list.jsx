"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui_components/card";
import { Badge } from "../ui_components/badge";
import { Button } from "../ui_components/button";
import { Checkbox } from "../ui_components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui_components/select";
import {
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui_components/dropdown-menu";

// Sample data for demonstration
const articles = [
  {
    id: 1,
    title: "Global Tech Giants Announce New AI Collaboration",
    excerpt:
      "Major technology companies have joined forces to establish standards for artificial intelligence development and implementation.",
    date: "2023-05-15",
    readTime: "4 min",
    category: "Technology",
    classified: true,
    confidence: 0.92,
  },
  {
    id: 2,
    title: "Senate Passes Landmark Climate Legislation",
    excerpt:
      "The U.S. Senate approved a comprehensive climate bill aimed at reducing carbon emissions by 50% before 2030.",
    date: "2023-05-14",
    readTime: "6 min",
    category: "Politics",
    classified: true,
    confidence: 0.89,
  },
  {
    id: 3,
    title: "Championship Finals Set After Dramatic Semifinal",
    excerpt:
      "After an overtime thriller, the stage is set for what promises to be an unforgettable championship final next weekend.",
    date: "2023-05-13",
    readTime: "3 min",
    category: "Sports",
    classified: true,
    confidence: 0.95,
  },
  {
    id: 4,
    title: "New Study Reveals Benefits of Mediterranean Diet",
    excerpt:
      "Researchers have published findings showing significant health improvements for participants following a Mediterranean diet.",
    date: "2023-05-12",
    readTime: "5 min",
    category: null,
    classified: false,
    confidence: 0,
  },
  {
    id: 5,
    title: "Award-Winning Film Director Announces New Project",
    excerpt:
      "The acclaimed director revealed plans for an ambitious new film exploring themes of identity and belonging.",
    date: "2023-05-11",
    readTime: "4 min",
    category: "Entertainment",
    classified: true,
    confidence: 0.87,
  },
];

// Map categories to colors
const categoryColors = {
  Technology: "bg-amber-500 hover:bg-amber-600",
  Politics: "bg-rose-500 hover:bg-rose-600",
  Sports: "bg-emerald-500 hover:bg-emerald-600",
  Entertainment: "bg-sky-500 hover:bg-sky-600",
  Health: "bg-purple-500 hover:bg-purple-600",
  Business: "bg-orange-500 hover:bg-orange-600",
  Science: "bg-teal-500 hover:bg-teal-600",
};

export default function ArticleList({ filter = "all" }) {
  const [selectedArticles, setSelectedArticles] = useState([]);

  // Filter articles based on the filter prop
  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    if (filter === "classified") return article.classified;
    if (filter === "unclassified") return !article.classified;
    return true;
  });

  const toggleArticleSelection = (id) => {
    setSelectedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };

  const selectAllArticles = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map((article) => article.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={
              selectedArticles.length === filteredArticles.length &&
              filteredArticles.length > 0
            }
            onCheckedChange={selectAllArticles}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select all
          </label>
        </div>
        {selectedArticles.length > 0 && (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Classify Selected
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bulk Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classify">Classify</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {filteredArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="flex">
            <div className="p-4 flex items-start">
              <Checkbox
                checked={selectedArticles.includes(article.id)}
                onCheckedChange={() => toggleArticleSelection(article.id)}
              />
            </div>
            <div className="flex-1">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} read
                      </span>
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Classification
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Article
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p>{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  {article.category ? (
                    <Badge
                      className={
                        categoryColors[article.category] || "bg-gray-500"
                      }
                    >
                      {article.category}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Unclassified</Badge>
                  )}
                  {article.classified && (
                    <span className="text-xs text-muted-foreground">
                      Confidence: {(article.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  {article.classified ? "Reclassify" : "Classify"}
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
