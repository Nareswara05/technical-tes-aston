import instance from "../../instance/instance";

export default async function LoginAPI({username, password}) {
  try {
    // Memanggil API untuk login dengan username dan password
    const response = await instance.post('/auth/login', {username, password})
    if (response.status !== 200) {
        throw new Error(`API call failed with status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
        return { status: error.response.status, message: error.response.data.message };
    }
    throw error;
}
}

