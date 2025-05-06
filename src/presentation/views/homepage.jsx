import React from "react";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui_components/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui_components/card";

import { Badge } from "../ui_components/badge";
import { Input } from "../ui_components/input";
import { Button } from "../ui_components/button";
import {
  Search,
  BarChart3,
  PieChart,
  Newspaper,
  Tag,
  TrendingUp,
  Filter,
  Upload,
} from "lucide-react";
import TopicDistribution from "../data_components/topic-distribution";
import ArticleList from "../data_components/article-list";
import RecentArticles from "../data_components/recent-articles";
import ArticleUploadModal from "../ui_components/article_upload";
import Tabview from "../ui_components/tab_view";
import SearchView from "../ui_components/search_view";
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6" />
            <h1 className="text-xl font-bold">NewsClassify</h1>
          </div>
          <SearchView />

          <nav className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Article</span>
              </button>
              {showModal && (
                <div className="absolute top-full mt-2 left-0 w-full">
                  <ArticleUploadModal onClose={() => setShowModal(false)} />
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-[1fr_250px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button>
                    <Tag className="mr-2 h-4 w-4" />
                    Classify New
                  </Button>
                </div>
              </div>

              <Tabview />
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Topic Distribution
                  </CardTitle>
                  <CardDescription>
                    Classification breakdown by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TopicDistribution />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-rose-500 hover:bg-rose-600">
                      Politics
                    </Badge>
                    <span className="text-sm text-muted-foreground">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-500 hover:bg-amber-600">
                      Technology
                    </Badge>
                    <span className="text-sm text-muted-foreground">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      Sports
                    </Badge>
                    <span className="text-sm text-muted-foreground">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-sky-500 hover:bg-sky-600">
                      Entertainment
                    </Badge>
                    <span className="text-sm text-muted-foreground">16%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentArticles />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
