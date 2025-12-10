import type { LoginResponseType } from "~/types/auth";
import type { UserState } from "~/types/user";
export const useAuth = () => {
  const API_URL = `http://localhost:4000`;

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<LoginResponseType>(`${API_URL}/login`, {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (response.token) {
        const token = useToken();
        token.value = response.token;
        
        // Сохраняем токен в localStorage
        if (process.client) {
          localStorage.setItem("token", response.token);
          console.log('Token saved to localStorage:', response.token);
        }
      }

      return response;
    } catch (err) {
      const token = useToken();
      token.value = null;
      
      // Очищаем localStorage при ошибке
      if (process.client) {
        localStorage.removeItem("token");
      }
      throw err;
    }
  };

  const getUserData = async (): Promise<UserState> => {
    const token = useToken();

    if (!token.value) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await $fetch<UserState>(`${API_URL}/user/data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      return response;
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        logout();
      }
      throw error;
    }
  };

  const logout = () => {
    const token = useToken();
    token.value = null;
    
    // Очищаем localStorage при выходе
    if (process.client) {
      localStorage.removeItem("token");
      console.log('Token removed from localStorage');
    }
  };

  const getToken = () => {
    const token = useToken();
    return token.value;
  };

  //  Функция для инициализации токена при загрузке приложения
  const initializeAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        const token = useToken();
        token.value = savedToken;
        console.log('Token initialized from localStorage:', savedToken);
      }
    }
  };

  return {
    login,
    logout,
    getToken,
    getUserData,
    initializeAuth 
  };
};

export const useToken = () => {
  return useState<string | null>("token", () => {
    if (process.client) {
      const token = localStorage.getItem("token");
      console.log('useToken initialized with:', token);
      return token;
    }
    return null;
  });
};