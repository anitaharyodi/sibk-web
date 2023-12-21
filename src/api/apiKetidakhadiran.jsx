// @ts-nocheck
import useAxios from ".";

export const GetKetidakhadiran = async () => {
  try {
    const response = await useAxios.get("/data-ketidakhadiran");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetKetidakhadiranById = async (id) => {
  try {
    const response = await useAxios.get(`/data-ketidakhadiran/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateKetidakhadiran = async (data) => {
  try {
    const response = await useAxios.post(`/data-ketidakhadiran`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      keterangan: data.keterangan,
      tanggal_ketidakhadiran: data.tanggal_ketidakhadiran,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateKetidakhadiran = async (id, data) => {
  console.log(data);
  try {
    const response = await useAxios.put(`/data-ketidakhadiran/${id}`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      keterangan: data.keterangan,
      tanggal_ketidakhadiran: data.tanggal_ketidakhadiran,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeleteKetidakhadiran = async (id) => {
  try {
    const response = await useAxios.delete(`/data-ketidakhadiran/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
