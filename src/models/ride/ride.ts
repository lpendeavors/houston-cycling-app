export class RideModel {
    
    public avgSpeed: number = 0;
    public distance: number = 0;
    public duration: number = 0;
    public endTime: Date;
    public id: string;
    public points: any[] = [];
    public profile: string;
    public startTime: Date;
    public type: string;

    constructor() {}

    public addCoord(lat: number, lng: number): void {
        this.points.push({
            lat: lat,
            lng: lng
        });
    }
}