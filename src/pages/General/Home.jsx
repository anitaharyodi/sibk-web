import React from "react";
import assets from "../../assets";
import CardCustom from "../../components/Card";

const Home = () => {
  const role = sessionStorage.getItem("role");

  const cardData = [
    {
      title: "Pelanggaran",
      navigateTo: "/pages/pelanggaran",
      linkText: "Klik disini",
      description: "Melihat dan mengelola data pelanggaran siswa di sekolah.",
    },
    {
      title: "Ketidakhadiran",
      navigateTo: "/pages/ketidakhadiran",
      linkText: "Klik disini",
      description:
        "Melihat dan mengelola data ketidakhadiran siswa di sekolah.",
    },
    {
      title: "Keluar/Pindah",
      navigateTo: "/pages/dropout",
      linkText: "Klik disini",
      description:
        "Melihat dan mengelola data siswa yang keluar atau pindah dari sekolah.",
    },
    {
      title: "Keterlambatan",
      navigateTo: "/pages/keterlambatan",
      linkText: "Klik disini",
      description: "Melihat dan mengelola data keterlambatan siswa di sekolah.",
    },
    {
      title: "Perijinan",
      navigateTo: "/pages/perijinan",
      linkText: "Klik disini",
      description: "Melihat dan mengelola data perijinan siswa di sekolah.",
    },
  ];

  const filteredCardData = cardData.filter((data) => {
    if (role === "Guru BK") {
      return true;
    } else if (role === "Guru Piket") {
      return data.title === "Keterlambatan" || data.title === "Perijinan";
    } else {
      return false;
    }
  });

  return (
    <div>
      <img
        src={assets.LOGO_BAWAH}
        className="justify-center items-center mx-auto w-28 h-28"
      />
      <h2 className="text-3xl font-bold mt-4 text-center">
        Selamat Datang di Sistem Informasi BK Sekolah!
      </h2>
      <p className="text-center mb-6 mt-4 font-medium text-gray-500">
        Silakan pilih menu yang ingin diakses :
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto">
        {filteredCardData.map((data, index) => (
          <CardCustom
            key={index}
            title={data.title}
            description={data.description}
            navigateTo={data.navigateTo}
            linkText={data.linkText}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
