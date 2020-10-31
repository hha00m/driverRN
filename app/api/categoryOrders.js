import client from "./client";

const get = (token, status, search, page = 1, limit = 20) => {
  let url = `/getOrders.php?token=${token}`;
  if (status) url += `&status=${status}`;
  if (search) url += `&search=${search}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  return client.get(url);
};
export default {
  get,
};
