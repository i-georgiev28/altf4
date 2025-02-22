export interface ArrayDb {
    id: number;
    userId: number;

    name: string;
    location: string;
    output: number;
    capacity: number;
    data: string;
}

export interface Array extends Omit<ArrayDb, 'data'> {
    data: SolarPanel[][];
}

export interface SolarPanel {
    direction: SolarPanelDirection;
    output: number;
    outputMultiplier: number;

}

export enum SolarPanelDirection {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
}