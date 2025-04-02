import API from './api';

class BookService {
  // Login method
  async getAllUsers() {
    try {
      const response = await API.get('/users');
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async returnBook(lendData) {
    try {
      const response = await API.post('/return_book', lendData);
      console.log(response);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async lendingBook(lendData){
    try {
      const response = await API.post('/lending_book', lendData);
      console.log(response);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getLendingInfo(){
    try {
      const response = await API.get('/get_lended_book');
      console.log(response.data)
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
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
          errorMessage = 'the book not returned.';
          break;
        case 422:
          errorMessage = error.response.data.errors[0];
          break;
        case 500:
          console.log(error)
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

export default new BookService();