import axios from "axios";
const API_URL = 'http://localhost:8000';

export default {
    async login(email: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: email,
                password: password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            
            return response.data;
        } catch (err) {
            localStorage.clear()  
        }
    },
    logout() {
        return localStorage.removeItem('token')
    },
    getToken() {
        return localStorage.getItem('token')
    }
}