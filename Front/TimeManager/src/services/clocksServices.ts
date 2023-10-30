import type { Clock } from "@/types/Clock";

export default class ClocksServices {
    // Get Clocks Data
    getClocks(userId: number) {
        return new Promise<Clock[]>((resolve, reject) => {
            fetch(`http://localhost:4000/api/clocks/${userId}`)
            .then(res => res.json())
            .then(json => resolve(json.data))
            .catch(err => reject(err));
        });
    }

    // Post a clock log
    postClock(userId:number, clockData: Partial<Clock>) {
        return new Promise<Clock>((resolve,reject) => {
            fetch(`http://localhost:4000/api/clocks/${userId}`,{
                method: "POST",
                headers:  {
                    "accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(clockData)
            })
            .then((res) => res.json())
            .then(json => resolve(json.data))
            .catch(err => reject(err));
        });
    }
};
