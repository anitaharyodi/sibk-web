// @ts-nocheck
import useAxios from ".";

export const GetDO = async () => {
  try {
    const response = await useAxios.get("/data-do");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetDOById = async (id) => {
  try {
    const response = await useAxios.get(`/data-do/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateDO = async (data) => {
  try {
    const response = await useAxios.post(`/data-do`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      alasan: data.alasan,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateDO = async (id, data) => {
  try {
    const response = await useAxios.put(`/data-do/${id}`, {
      nama_siswa: data.nama_siswa,
      kelas: data.kelas,
      program_keahlian: data.program_keahlian,
      alasan: data.alasan,
    });
    
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
