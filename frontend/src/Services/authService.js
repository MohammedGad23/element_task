import API from './api';

class AuthService {
  // Login method
  async login(credentials) {
    try {
      const response = await API.post('/login', credentials);

      this.setSession(response.data.token);
      this.setUserInfo(response.data.user);
      console.log(response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Signup method
  async signup(userData) {
    try {
      const response = await API.post('/createuser', userData);
      
      // Store token and user info
      // this.setSession(response.data.token);
      // this.setUserInfo(response.data.user);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Logout method
  logout() {
    this.removeSession();
  }

  // Set authentication session
  setSession(token) {
    if (token) {
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
    }
  }

  // Set user information
  setUserInfo(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Handle authentication errors
  handleError(error) {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid credentials';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          // this.logout();
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission.';
          break;
        case 422:
          errorMessage = error.response.data.errors[0];
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.response.data.message || 'An error occurred';
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Something happened in setting up the request
      errorMessage = error.message;
    }

    // You might want to use a toast or notification library here
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export default new AuthService();