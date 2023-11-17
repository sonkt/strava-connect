export interface Member {
    userId: string,
    userName: string,
    email: string,
    fullName: string,
    distance: number,
    time: number,
    numberOfDays: number,
    currentDays: number,
    targetDays: number,
    progress: number,
    targetProgress: number,
    stravaId: number,
    isPacer: boolean,
    isDnf: boolean
}