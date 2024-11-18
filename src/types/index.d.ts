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
    description: string;
    address: string;
    requirements?: string;
    newApplicationsCount?: number;
    images: string;
    owner: {
        id: number;
        fullName: string;
        email: string;
        username: string;
        role: string;
        phoneNumber: string;
    };
}

export interface IDirection {
    id: number;
    name: string;
    newApplicationsCount: number;
}

export interface IApplication {
    id: number;
    name: string;
    description: string;
    authors: string;
    status: "NEW" | "ACCEPTED" | "FEEDBACK" | "REJECTED" | "PENDING";
    paymentStatus: "PAID" | "UNPAID";
    thesisFile?: File;
    owner: UserType;
    reviewer: UserType;
    conference: ConferenceType;
    direction?: IDirection;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}