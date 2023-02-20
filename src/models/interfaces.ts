export interface LocationInitialData {
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    main: {
      temp: number,
      feels_like: number,
      humidity: number,
    },
    visibility: number,
    wind: {
      speed: number,
    },
    id: number,
    name: string
}

export interface Location {
    id: number,
    name: string,
    description: string,
    icon: string,
    temp: number,
    feelsLike: number,
    humidity: number,
    visibility: number,
    windSpeed: number
}

export interface LocationsToSort {
    movedLocationIndex: number,
    targetLocationIndex: number
}
