import type { User } from '../types/user'

const API_BASE = 'http://localhost:8080/api'

export default class UserServices {
    async createUser(newUser: User) {
      try {
        const response = await fetch(`${API_BASE}/api/users`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ email: newUser.data?.email, username: newUser.data?.username})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }

    async getUser(username: string | undefined, email: string | undefined) {
      return new Promise<User>((resolve, reject) => {
        fetch(`${API_BASE}/api/users?username=${username}&email=${email}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    async getEveryUser() {
      return new Promise<User[]>((resolve, reject) => {
        fetch(`${API_BASE}/api/users/all`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    async updateUser(userId: string, newuser: User) {
      try {
        const response = await fetch(`${API_BASE}/api/users/${userId}`, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({user: { id: newuser.data?.id, email: newuser.data?.email, username: newuser.data?.username}})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }

    async deleteUser(userId: number | null | undefined) {
      try {
        const response = await fetch(`${API_BASE}/api/users/${userId}`, {
          method: 'DELETE', // Use DELETE method
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
        throw error;
      }
    }
}