
export interface ILogin {
    Email: string,
    Password: string
}

export interface ILoginResponse {
 data : {
    UserId: string;
    Id: number;
    UserName: string;
    Email: string;
    Token: string;
 }
}