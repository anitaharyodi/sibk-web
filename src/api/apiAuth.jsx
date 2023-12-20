// @ts-nocheck

import { useAxiosPublic } from ".";

export const Login = async (data) => {
  try {
    const response = await useAxiosPublic.post(`/login`, {
      email: data.email,
      password: data.password,
    });
    console.log(JSON.stringify(response.data,null,2));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

