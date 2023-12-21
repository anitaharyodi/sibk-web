// @ts-nocheck
import useAxios from ".";

export const GetKeterlambatan = async () => {
  try {
    const response = await useAxios.get("/data-terlambat");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetKeterlambatanById = async (id) => {
  try {
    const response = await useAxios.get(`/data-terlambat/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateKeterlambatan = async (data) => {
  try {
    const response = await useAxios.post(`/data-terlambat`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      nama_guru_piket: data.nama_guru_piket,
      nama_guru_pelajaran: data.nama_guru_pelajaran,
      keterangan: data.keterangan,
      jam_terlambat: data.jam_terlambat,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateKeterlambatan = async (id, data) => {
  console.log(data);
  try {
    const response = await useAxios.put(`/data-terlambat/${id}`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      nama_guru_piket: data.nama_guru_piket,
      nama_guru_pelajaran: data.nama_guru_pelajaran,
      keterangan: data.keterangan,
      jam_terlambat: data.jam_terlambat,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeleteKeterlambatan = async (id) => {
  try {
    const response = await useAxios.delete(`/data-terlambat/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
