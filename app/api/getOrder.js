import client from "./client";

const getOrder = (token, id, nofiy_id) => {
  let url = `/getOrder.php?token=${token}&orderid=${id}`;
  if (nofiy_id) url += `&notification_id=${nofiy_id}`;
  return client.get(url);
};

const arrive = (token, id, price, note) => {
  let url = `/recived.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  return client.get(url);
};
const returned = (token, id, note) => {
  let url = `/returned.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  return client.get(url);
};
const postponed = (token, id, note) => {
  let url = `/postponded.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  return client.get(url);
};
const partReturn = (token, id, price, note, no) => {
  let url = `/partialyReturned.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  if (no) url += `&items_no=${no}`;
  return client.get(url);
};
const exchange = (token, id, price, note, no) => {
  let url = `/replace.php?token=${token}&orderid=${id}`;
  if (note) url += `&note=${note}`;
  if (price) url += `&price=${price}`;
  if (no) url += `&items_no=${no}`;
  return client.get(url);
};
export default {
  getOrder,
  arrive,
  returned,
  partReturn,
  exchange,
  postponed,
};
