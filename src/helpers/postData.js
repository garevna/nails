export default async (path, payload) => {
  const data = payload instanceof FormData ? {
    method: 'POST',
    body: payload
  }
    : {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    }
  const response = await (

    await fetch(`${process.env.VUE_APP_API_URL}/${path}`, data

      // method: 'POST',
      // // if (payload instanceof FormData) {
      // //   return body: payload
      // // }
      // // headers: {
      // //   'Content-Type': 'application/json;charset=utf-8',
      // //   Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
      // // // },
      // body: payload
    )
  ).json()

  return response
}
