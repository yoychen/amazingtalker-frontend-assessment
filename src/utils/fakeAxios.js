export default function fakeAxios(resource, config) {
  if (process.env.NODE_ENV === 'development') {
    return fetch(`/schedule?started_at=${config.params.started_at}`)
      .then((response) => response.json());
  }

  return fetch(
    `https://cors-anywhere.herokuapp.com/https://api.amazingtalker.com/v1/guest/teachers/amy-estrada/schedule?started_at=${config.params.started_at}`,
  ).then((response) => response.json());
}
