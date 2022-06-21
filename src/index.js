import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Loader from "./components/common/Loader";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </BrowserRouter>
);
