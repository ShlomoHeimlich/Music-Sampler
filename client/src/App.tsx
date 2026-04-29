import MusicTable from "./components/MusicSampler/MusicTable.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/Auth/AuthPage.tsx";


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