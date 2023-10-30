import type { Clock } from '../types/Clock'

const API_BASE = 'http://localhost:8080/api'

export default class ClockServices {
    async postClockByUserId(userId: number | undefined, newClock: Clock) {
      try {
        const response = await fetch(`${API_BASE}/api/clocks/${userId}`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ user: userId, status: newClock.status, })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }

    async getEveryClock() {
      return new Promise<Clock>((resolve, reject) => {
        fetch(`${API_BASE}/api/clocks/`)
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

    async getEveryClockByUserId(userId: number) {
        return new Promise<Clock>((resolve, reject) => {
          fetch(`${API_BASE}/api/clocks/${userId}`)
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

    async putClock(userId: number, clock: Clock) {
      try {
        const response = await fetch(`${API_BASE}/api/clocks/${clock.id}`, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({clock: { id: clock.id, status: clock.status, time: clock.time, user: userId}})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    }

    async deleteClock(clockId: number) {
      try {
        const response = await fetch(`${API_BASE}/api/clocks/${clockId}`, {
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