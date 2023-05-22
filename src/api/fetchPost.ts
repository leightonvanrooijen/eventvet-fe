import axios from "axios";

export type ResponseError = { message: string };

export const fetchPost = async <T extends Record<string, any>>(
  url: string,
  body: any
): Promise<T> => {
  try {
    const res = await axios.post(url, body);
    return res.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.response.data.error);
  }
};
