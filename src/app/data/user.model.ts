export class UserLogin {
    userId!: string;
    userName!: string;
    email!: string;
    fullName!: string;
    expiresIn!: number;
    expiresAt!: number;
    distance!: number;
    accessToken!: string;
    refreshToken!: string;
    status!: number;
    userStatus!: number;
    eventIds!: string[];

    constructor() { }

    parseLoginData(data: any) {
        this.userId = data.user.userId;
        this.userName = data.user.userName;
        this.email = data.user.email;
        this.fullName = data.user.fullName;
        this.expiresIn = data.user.expiresIn;
        this.expiresAt = data.user.expiresAt;
        this.distance = data.user.distance;
        this.accessToken = data.token;
        this.status = data.status;
        this.userStatus = data.user.userStatus;
        this.eventIds = data.user.eventIds;
        return this;
    }
}

export class UserProfile {
    userId!: string;
    userName!: string;
    email!: string;
    fullName!: string;
    expiresIn!: number;
    expiresAt!: number;
    distance!: number;
    accessToken!: string;
    refreshToken!: string;
    status!: number;
    userStatus!: number;
    events!: string[];

    constructor() { }

    parseLoginData(data: any) {
        this.userId = data.user.userId;
        this.userName = data.user.userName;
        this.email = data.user.email;
        this.fullName = data.user.fullName;
        this.expiresIn = data.user.expiresIn;
        this.expiresAt = data.user.expiresAt;
        this.distance = data.user.distance;
        this.accessToken = data.token;
        this.status = data.status;
        this.userStatus = data.user.userStatus;
        this.events = data.user.eventIds;
        return this;
    }
}