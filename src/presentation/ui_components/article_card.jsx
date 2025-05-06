import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
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
} from "./dropdown-menu";
const ArticleCard = ({
  article,
  // isSelected, onToggleSelect
}) => {
  const categoryColors = {
    Technology: "bg-amber-500 hover:bg-amber-600",
    Politics: "bg-rose-500 hover:bg-rose-600",
    Sports: "bg-emerald-500 hover:bg-emerald-600",
    Entertainment: "bg-sky-500 hover:bg-sky-600",
    Health: "bg-purple-500 hover:bg-purple-600",
    Business: "bg-orange-500 hover:bg-orange-600",
    Science: "bg-teal-500 hover:bg-teal-600",
  };
  return (
    <Card key={article.id} className="overflow-hidden">
      <div className="flex">
        <div className="p-4 flex items-start">
          {/* <Checkbox
            checked={selectedArticles.includes(article.id)}
            onCheckedChange={() => toggleArticleSelection(article.id)}
          /> */}
        </div>
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.created_at)
                      .toLocaleDateString("en-GB", {
                        year: "numeric",
                        day: "numeric",
                        month: "numeric",
                      })
                      .replace(/\//g, "-")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readtime} read
                  </span>
                </CardDescription>
              </div>
              {/* <DropdownMenu>
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
              </DropdownMenu> */}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p>{article.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              {article.category ? (
                <Badge
                  className={categoryColors[article.category] || "bg-blue-500"}
                >
                  {article.category}
                </Badge>
              ) : (
                <Badge variant="outline">Unclassified</Badge>
              )}
            </div>

            <a
              href={article.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Read More
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
