import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Homepage from "./presentation/views/homepage";
import NewsPDFManager from "./presentation/views/uploadArticle";
import ArticleUploadDialog from "./presentation/ui_components/article_upload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Homepage />
      {/* <NewsPDFManager /> */}
      {/* <ArticleUploadDialog /> */}
    </>
  );
}

export default App;
