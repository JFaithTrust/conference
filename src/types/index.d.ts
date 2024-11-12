export interface UserType {
    id: number;
    fullName: string;
    email: string;
    role: "SUPER_ADMIN" | "REVIEWER" | "USER";
    phoneNumber: string;
    userStatus: "ACTIVE" | "INACTIVE";
}

export interface ConferenceType {
    id: number;
    name: string;
    startsAt: string | Date;
    endsAt: string | Date;
    deadlineForThesis: string;
    cost?: string;
    description?: string;
    address?: string;
    requirements?: string;
    newApplicationsCount?: number;
    images: string;
    owner?: {
        id: number;
        fullName: string;
        email: string;
        username: string;
        role: string;
        phoneNumber: string;
    };
}