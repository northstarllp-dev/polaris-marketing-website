import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { PrintOMSPage } from "./pages/PrintOMSPage";
import { FadeIn } from "./components/motion/FadeIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products/printoms" element={<PrintOMSPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
