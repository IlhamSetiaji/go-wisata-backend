export type RegisterUserRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: enum;
    city: string;
    parentId: number;
};