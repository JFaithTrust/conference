export interface IUser {
    id: number;
    email: string;
    role: "SUPER_ADMIN" | "REVIEWER" | "USER";
    userStatus: "ACTIVE" | "INACTIVE";
    fullName: string;
    phoneNumber: string;
}

export interface IAttachmentResponse {
    id: number;
    originalFileName: string;
    size: number;
    contentType: string;
}

export interface IConference {
    id: number;
    nameUz: string;
    nameRu: string;
    nameEng: string;
    startsAt: Date;
    endsAt: Date;
    registrationStartsAt: Date;
    registrationEndsAt: Date;
    paymentStartsAt: Date;
    paymentEndsAt: Date;
    publishDate: Date;
    description: string;
    goal: string;
    cost: number;
    address: string;
    organization: string;
    requirements: string;
    doiRequired: boolean;
    antiPlagiarismRequired: boolean;
    newApplicationsCount?: number;
    letter: IAttachmentResponse;
    exampleThesis: IAttachmentResponse;
    directions: number[];
    owner: IUser
}

interface IPostConference extends Pick
    <IConference,
        "nameUz" |
        "nameRu" |
        "nameEng" |
        "startsAt" |
        "endsAt" |
        "registrationStartsAt" |
        "registrationEndsAt" |
        "paymentStartsAt" |
        "paymentEndsAt" |
        "publishDate" |
        "goal" |
        "cost" |
        "address" |
        "organization" |
        "requirements" |
        "description" |
        "doiRequired" |
        "antiPlagiarismRequired"
    > {
    letterId: number;
    exampleThesisId: number;
    directions: string[];
}

export interface IDirection {
    id: number;
    name: string;
    newApplicationsCount: number;
    reviewers: IUser[];
}

export interface IApplication {
    id: number;
    name: string;
    description: string;
    authors: string;
    status: "NEW" | "ACCEPTED" | "FEEDBACK" | "REJECTED" | "PENDING";
    paymentStatus: "PAID" | "UNPAID";
    thesisFile?: File;
    owner: IUser;
    reviewer: IUser;
    conference: IConference;
    direction?: IDirection;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}