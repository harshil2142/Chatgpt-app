import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const API = "/api/v1";
export const baseUrl = `${HOST}${API}`;

async function getHeaders(extraHeaders = {}) {
  let token = null;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    accept: "application/json",
    ...extraHeaders,
  };
  try {
    const session = await Auth.currentSession();
    token = session.getAccessToken().getJwtToken();
  } catch (e) {
    console.log(e);
  }
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;

  //Temporary Code for local setup::
}

export async function getRequest({
  extraHeaders = {},
  url,
  cache = "default",
}: {
  extraHeaders?: object;
  url: string;
  // eslint-disable-next-line no-undef
  cache?: RequestCache | undefined;
}) {
  const headers = await getHeaders(extraHeaders);

  const response = await fetch(`${baseUrl}${url}`, {
    headers,
    cache: cache,
  });
  return response;
}

export async function postRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.post(`${baseUrl}${url}`, data || {}, {
      headers,
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function putRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.patch(`${baseUrl}${url}`, data || {}, {
      headers,
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data?: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      headers,
      data: data || {},
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
