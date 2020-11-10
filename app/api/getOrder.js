import client from "./client";

const getOrder = (token, id, nofiy_id) => {
  let url = `/getOrder.php?token=${token}&orderid=${id}`;
  if (nofiy_id) url += `&notification_id=${nofiy_id}`;
  return client.get(url);
};
const config = {
  onUploadProgress: (progressEvent) => console.log(progressEvent),
};
const arrive = (token, id, price, note) => {
  let url = `/recived.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  return client.post(url, config);
};
const returned = (token, id, note) => {
  let url = `/returned.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  return client.post(url, config);
};
const postponed = (token, id, note) => {
  let url = `/postponded.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  return client.post(url, config);
};
const partReturn = (token, id, price, note, no) => {
  let url = `/partialyReturned.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  if (no) url += `&items_no=${no}`;
  return client.post(url, config);
};
const exchange = (token, id, price, note, no) => {
  let url = `/replace.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  if (no) url += `&items_no=${no}`;
  return client.post(url, config);
};
export default {
  getOrder,
  arrive,
  returned,
  partReturn,
  exchange,
  postponed,
};
