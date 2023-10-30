
type UserData = {
    id: number | undefined;
    username: string;
    email: string;
}

type User = {
    data: Partial<UserData> | null
}

export type { User }