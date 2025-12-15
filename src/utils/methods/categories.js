import publicAxios from "../axios/publicAxios";

export const getAllCategories = async () => {
  const res = await publicAxios.get("/categories");
  return res.data;
};

export const getSubCategories = async (id) => {
  const res = await publicAxios.get(`/categories/${id}/subcategories`);
  return res.data;
};

export const getAllBrands = async () => {
  const res = await publicAxios.get("/brands");
  return res.data;
};
