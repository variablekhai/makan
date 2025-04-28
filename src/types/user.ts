export interface RegisterPayload {
    name: string
    email: string
    password: string
    role: 'admin' | 'author'
    bio?: string
}

export interface LoginPayload {
    email: string
    password: string
}