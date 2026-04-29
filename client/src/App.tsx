import MusicTable from "./components/musicSampler/MusicTable.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage.tsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/home" element={<MusicTable/>} />
      </Routes>
    </BrowserRouter>
  );
}