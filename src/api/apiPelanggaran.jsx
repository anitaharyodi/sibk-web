// @ts-nocheck
import useAxios from ".";

export const GetPelanggaran = async () => {
  try {
    const response = await useAxios.get("/pelanggaran");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetPelanggaranById = async (id) => {
  try {
    const response = await useAxios.get(`/pelanggaran/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetListPelanggaran = async () => {
  try {
    const response = await useAxios.get("/pelanggaran-list");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetSanksi = async (sanksi, kategori) => {
  try {
    const response = await useAxios.get(`/pelanggaran/${sanksi}/${kategori}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreatePelanggaran = async (data) => {
  try {
    const response = await useAxios.post(`/pelanggaran`, {
      id_list_pelanggaran: data.id_list_pelanggaran,
      nama_guru_bk: data.nama_guru_bk,
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      tanggal_pelanggaran: data.tanggal_pelanggaran,
      sanksi: data.sanksi,
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdatePelanggaran = async (id, data) => {
  try {
    const response = await useAxios.put(`/pelanggaran/${id}`, {
      id_list_pelanggaran: data.id_list_pelanggaran,
      nama_guru_bk: data.nama_guru_bk,
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      tanggal_pelanggaran: data.tanggal_pelanggaran,
      sanksi: data.sanksi,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeletePelanggaran = async (id) => {
  try {
    const response = await useAxios.delete(`/pelanggaran/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
