

export async function fetchUserData(email: any) {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register/${email}`); // Replace with your API endpoint URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }