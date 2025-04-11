//src/services/api.js

// API service functions for making requests to the backend

export async function sendChatMessage(message) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CHAT_BOT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat: message }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

export async function fetchProjectUpdates() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PROJECT_UPDATE);
    
    if (!response.ok) {
      throw new Error('Failed to fetch project updates');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching project updates:', error);
    throw error;
  }
}

// For authentication (to be implemented later if needed)
export async function signIn(credentials) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_AUTH_SIGNIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
}

export async function signUp(userData) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_AUTH_SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Sign up failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
}



/// user DB access

export async function fetchOrCreateUserProfile(userId, userName, sessionToken) {
  try {
    console.log(`Fetching profile for user: ${userName} (${userId})`);
    
    const response = await fetch(process.env.NEXT_PUBLIC_DB_PRIVATE_USER_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: userId, 
        user_name: userName,
        session_token: sessionToken
      }),
    });
    // console.log(response)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to fetch profile (Status: ${response.status})`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.profile) {
      throw new Error('Invalid profile data received from server');
    }
    
    console.log('success : profile fetch');
    return data.profile;
  } catch (error) {
    console.error('Error in fetchOrCreateUserProfile:', error);
    throw error;
  }
}

export async function updateUserProject(userId, projectData, sessionToken) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_DB_PRIVATE_USER_PROJECT_UPDATE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: userId, 
        project_data: projectData,
        session_token: sessionToken
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to update project (Status: ${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating user project:', error);
    throw error;
  }
}

// Alternative approach using headers for authentication
export async function fetchUserProfileSecure(sessionToken, userId) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_DB_PRIVATE_USER_PROFILE_SECURE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_id': userId,
        'session_token': sessionToken
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to fetch secure profile (Status: ${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching secure user profile:', error);
    throw error;
  }
}