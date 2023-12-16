import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/General/LoginPage";
import Home from "./pages/General/Home";
import Sidebar from "./components/Sidebar";
import KetidakhadiranPage from "./pages/GuruBK/KetidakhadiranPage";
import PelanggaranPage from "./pages/GuruBK/PelanggaranPage";
import DOPage from "./pages/GuruBK/DOPage";
import KeterlambatanPage from "./pages/GuruPiket/KeterlambatanPage";
import PerijinanPage from "./pages/GuruPiket/PerijinanPage";

const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/pages/*"
            element={
              <>
                <Sidebar />
                <div className="md:ml-64 px-16 mx-auto">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="ketidakhadiran" element={<KetidakhadiranPage />} />
                    <Route path="pelanggaran" element={<PelanggaranPage />} />
                    <Route path="dropout" element={<DOPage />} />
                    <Route path="keterlambatan" element={<KeterlambatanPage />} />
                    <Route path="perijinan" element={<PerijinanPage />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
