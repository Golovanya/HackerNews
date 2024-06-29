import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import NewsList from "./Pages/NewsList";
import { useState } from "react";
import CommentsPage from "./Pages/CommentsPage";

function App() {
  const [filter, setFilter] = useState<string>("topstories");
  const [reboot, setReboot] = useState<number>(0);

  return (
    <>
      <BrowserRouter>
        <Header update={setFilter} filter={filter} reboot={setReboot} />
        <Routes>
          <Route
            element={<NewsList filter={filter} reboot={reboot} />}
            path="/"
            index
          />
          <Route element={<CommentsPage />} path="/:id" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
