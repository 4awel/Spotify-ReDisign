import { useToken } from "~/ composables/useAuth"

// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const tokenState = useToken();
  
  if (process.server) {
    return;
  }
  
  // На клиенте проверяем токен в состоянии И в localStorage
  let token = tokenState.value;
  
  // Если в состоянии нет токена, но он есть в localStorage - восстанавливаем
  if (!token) {
    token = localStorage.getItem("token");
    if (token) {
      tokenState.value = token;
      console.log('Token restored in middleware:', token);
    }
  }
  
  console.log('Middleware token check:', { 
    path: to.path, 
    tokenInState: tokenState.value,
    tokenInLocalStorage: localStorage.getItem("token"),
    finalToken: token
  });
  
  const protectedRoutes = ['/', '/search', '/likes'];
  
  if (protectedRoutes.includes(to.path) && !token) {
    console.log('Redirecting to login - no token');
    return navigateTo('/login');
  }
  
  if (to.path === '/login' && token) {
    console.log('Redirecting to home - already authenticated');
    return navigateTo('/');
  }
});