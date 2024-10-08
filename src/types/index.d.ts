export  interface UserType {
    id: number;
    fullName: string;
    email: string;
    role: "SUPER_ADMIN" | "REVIEWER" | "USER";
    phoneNumber: string;
    userStatus: "Active"|"Blocked";
}
