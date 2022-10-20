export interface Coord {
    lon: number,
    lat: number,
}

export interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string,
}

export interface Main {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number,
}

export interface Wind {
    speed: number,
    deg: number,
    gust: number,
}

export interface Cloud {
    all: number,
}

export interface Rain {
    oneHour: number,
    threeHour: number,
}

export interface Snow extends Rain{}

export interface Sys {
    id: number,
    type: number,
    country: string,
    sunrise: number,
    sunset: number
}

export interface WeatherReport {
    coord: Coord,
    weather: Weather,
    base: string,
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Cloud,
    rain: Rain,
    snow: Snow,
    dt: number,
    sys: Sys,
    timezone: number,
    id: number,
    name: string,
    cod: number,
}