// @ts-nocheck
import useAxios from ".";

export const GetPerijinan = async () => {
  try {
    const response = await useAxios.get("/izin-keluar");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreatePerijinan = async (data) => {
  try {
    const response = await useAxios.post(`/izin-keluar`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      nama_guru_piket: data.nama_guru_piket,
      nama_guru_pelajaran: data.nama_guru_pelajaran,
      keterangan: data.keterangan,
      jam_keluar: data.jam_keluar,
      jam_kembali: data.jam_kembali,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateStatus = async (id, data) => {
  try {
    const response = await useAxios.patch(`/izin-keluar/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeletePerijinan = async (id) => {
  try {
    const response = await useAxios.delete(`/izin-keluar/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
