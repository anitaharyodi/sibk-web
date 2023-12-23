// @ts-nocheck
import useAxios from ".";

export const getLaporanPelanggaran = async (month) => {
  try {
    const response = await useAxios.get(`/pelanggaran/print/${month}`, {
      responseType: "arraybuffer",
    });

    // Create a blob from the PDF content
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Laporan_Pelanggaran_${month}.pdf`; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return response.data.data;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error.response.data;
  }
};


export const getLaporanDataDO = async (month) => {
  try {
    const response = await useAxios.get(`/data-do/print/${month}`, {
      responseType: "arraybuffer",
    });

    // Create a blob from the PDF content
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Laporan_Data_DO_${month}.pdf`; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return response.data.data;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error.response.data;
  }
};


export const getLaporanDataKetidakhadiran = async (month) => {
  try {
    const response = await useAxios.get(`/data-ketidakhadiran/print/${month}`, {
      responseType: "arraybuffer",
    });

    // Create a blob from the PDF content
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Laporan_Data_Ketidakhadiran_${month}.pdf`; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return response.data.data;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error.response.data;
  }
};


export const getLaporanIzinKeluar = async (month) => {
  try {
    const response = await useAxios.get(`/izin-keluar/print/${month}`, {
      responseType: "arraybuffer",
    });

    // Create a blob from the PDF content
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Laporan_Izin_Keluar_${month}.pdf`; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return response.data.data;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error.response.data;
  }
};

export const getLaporanDataTerlambat = async (month) => {
  try {
    const response = await useAxios.get(`/data-terlambat/print/${month}`, {
      responseType: "arraybuffer",
    });

    // Create a blob from the PDF content
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Laporan_Data_Terlambat_${month}.pdf`; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return response.data.data;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error.response.data;
  }
};
