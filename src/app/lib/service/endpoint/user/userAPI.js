import instance from "../../instance/instance";

export async function usersAPI({ limit = 6, skip = 0, search = '' }) {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit);
      params.append('skip', skip);
  
      let url = '';
      if (search) {
        url = `/users/search?q=${search}&limit=${limit}&skip=${skip}`;
      } else {
        url = `/users?${params.toString()}`;
      }
  
      const res = await instance.get(url);
      const users = res.data.users || res.data;
      const total = res.data.total || users.length;
  
      return { users, total };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  