export interface ArrayDb {
    id: number;
    userId: number;

    name: string;
    
    width: number;
    height: number;

    location: string;
    latitude: number;
    longitude: number;

    capacity: number;

    data: string;
}

export interface Array extends ArrayDb {
}