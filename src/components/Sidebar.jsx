import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaHome, FaRunning, FaUserTimes } from "react-icons/fa";
import { BiSolidLogOut } from "react-icons/bi";
import assets from "../assets";
import { AiOutlineStop } from "react-icons/ai";
import { MdEditNote, MdMoveDown } from "react-icons/md";
import { User, Link as Link2 } from "@nextui-org/react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const navigate = useNavigate();
  const namaKaryawan = sessionStorage.getItem("namaKaryawan")

  return (
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-primary w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col min-h-full px-0 relative">
          <img
            src={assets.LOGO_SAMPINGOUT}
            className="w-44 h-14 justify-center items-center mx-auto hover:cursor-pointer"
            onClick={() => navigate("/pages/home")}
          />
          <div className="w-full mt-4 bg-gray-500 p-2 rounded-xl">
            <User
              className="text-white"
              name={namaKaryawan}
              description={<span className="text-gray-300">Guru BK</span>}
              avatarProps={{
                src: assets.AVATAR,
              }}
            />
          </div>
          <div className="flex flex-col">
            <ul className=" my-6 flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-2">
                <Link
                  to="/pages/home"
                  className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                >
                  <FaHome className="text-xl" />
                  Beranda
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/pages/pelanggaran"
                  className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                >
                  <AiOutlineStop className="text-xl" />
                  Pelanggaran
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/pages/ketidakhadiran"
                  className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                >
                  <FaUserTimes className="text-xl" />
                  Ketidakhadiran
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/pages/dropout"
                  className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                >
                  <MdMoveDown className="text-xl" />
                  Keluar/Pindah
                </Link>
                <li className="rounded-lg mb-2">
                  <Link
                    to="/pages/keterlambatan"
                    className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                  >
                    <FaRunning className="text-xl" />
                    Keterlambatan
                  </Link>
                </li>
                <li className="rounded-lg mb-2">
                  <Link
                    to="/pages/perijinan"
                    className="flex items-center gap-4 text-md px-4 rounded-lg py-2 text-white hover:bg-secondary"
                  >
                    <MdEditNote className="text-xl" />
                    Perijinan
                  </Link>
                </li>
              </li>
            </ul>

            <button
              className="flex items-center min-w-full absolute bottom-0 rounded-lg p-3 text-white hover:bg-red-500"
              onClick={() => navigate("/")}
            >
              <BiSolidLogOut className="text-xl mr-4" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
