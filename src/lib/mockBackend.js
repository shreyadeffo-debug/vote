// Mock backend for development with dummy user data
const DUMMY_USER = {
  email: 'admin@gmail.com',
  password: 'test@123',
  id: '1',
  name: 'Admin User',
  role: 'admin'
};

export const mockBackend = {
  auth: {
    login: async (username, password) => {
      // Check against dummy credentials
      if (username === DUMMY_USER.email && password === DUMMY_USER.password) {
        const token = btoa(JSON.stringify({
          id: DUMMY_USER.id,
          username: DUMMY_USER.email,
          exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        }));
        return {
          success: true,
          token: token,
          user: {
            id: DUMMY_USER.id,
            username: DUMMY_USER.email,
            email: DUMMY_USER.email,
            name: DUMMY_USER.name,
            role: DUMMY_USER.role
          }
        };
      } else {
        throw new Error('Invalid email or password. Try: admin@gmail.com / test@123');
      }
    },
    
    register: async (username, password) => {
      // For demo purposes, just return success
      const token = btoa(JSON.stringify({
        id: '2',
        username: username,
        exp: Date.now() + 24 * 60 * 60 * 1000
      }));
      return {
        success: true,
        token: token,
        user: {
          id: '2',
          username: username,
          email: username,
          name: username.split('@')[0],
          role: 'user'
        }
      };
    }
  },

  authenticate: async (email, password) => {
    // Mock authentication
    return {
      user: {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: 'user'
      },
      token: 'mock-token-' + Date.now()
    };
  },

  logout: async () => {
    return { success: true };
  },

  getCurrentUser: async () => {
    // Return null for unauthenticated state
    return null;
  },

  getVoterData: async () => {
    return [];
  },

  saveVoterData: async (data) => {
    return { success: true, data };
  }
};

// Export as 'api' for compatibility
export const api = mockBackend;
