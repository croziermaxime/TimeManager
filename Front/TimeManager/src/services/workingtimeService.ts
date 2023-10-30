import type { WorkingTime } from '../types/workingTime'

const API_BASE = 'http://localhost:8080/api'

export default class WorkingTimeServices {
    async postWorkingTime(userId: number | undefined, newWT: WorkingTime) {
      try {
        const response = await fetch(`${API_BASE}/api/workingtimes/${userId}`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ user: userId, start: newWT.start, end: newWT.end})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }



    async getUsersWorkingTimesByRange(userId: number, start: string, end: string) {
      return new Promise<WorkingTime>((resolve, reject) => {
        fetch(`${API_BASE}/api/workingtimes/${userId}?start=${start}&end=${end}`)
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

    async getUserSingleWorkingTime(userId: number | undefined, workingTimeId: number | undefined) {
      return new Promise<WorkingTime[]>((resolve, reject) => {
        fetch(`${API_BASE}/api/workingtimes/${userId}/${workingTimeId}`)
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

    async getEveryWorkingTime() {
      return new Promise<WorkingTime[]>((resolve, reject) => {
        fetch(`${API_BASE}/api/workingtimes`)
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

    async getEveryWorkingTimeByUserId(userId: number) {
      return new Promise<WorkingTime[]>((resolve, reject) => {
        fetch(`${API_BASE}/api/workingtimes/all/user/${userId}`)
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

    async putWorkingTime(workingTime: WorkingTime) {
      try {
        const response = await fetch(`${API_BASE}/api/workingtimes/${workingTime.id}`, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({workingtime: { id: workingTime.id, start: workingTime.start, end: workingTime.end}})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }

    async deleteWorkingTime(workingTimeId: number) {
      try {
        const response = await fetch(`${API_BASE}/api/workingtimes/${workingTimeId}`, {
          method: 'DELETE',
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
      } catch (error) {
        console.error('Error during fetch operation:', error);
        throw error;
      }
    }
}