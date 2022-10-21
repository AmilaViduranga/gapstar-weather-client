export interface GeneralReport {
    minimumTemp: number,
    maxTemp: number,
    averageTemp: number,
    humidity: number,
    pressure: number,
    image: {
        icon: string,
        description: string,
    },
    rain: number,
    snow: number,
}
