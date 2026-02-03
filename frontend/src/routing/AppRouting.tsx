import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage, ChatPage, NotFoundPage } from "../pages";

const AppRouting = () => {
  return (
    <>
      <BrowserRouter>
        <div className="fill-viewport">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
            {/* <Route path="/chat/:id" element={<ChatDetailPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppRouting;
