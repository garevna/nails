export default async path => {
  const response = await (
    await fetch(`${process.env.VUE_APP_API_URL}/${path}`, {
      method: 'GET',
    })
  ).json();

  return response;
};
