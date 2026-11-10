
export interface ILogin {
    Email: string,
    Password: string,
    UserName: string
}

export interface ILoginResponse {
 data : {
    userId: string;
    id: number;
    userName: string;
    email: string;
    token: string;
 }
}