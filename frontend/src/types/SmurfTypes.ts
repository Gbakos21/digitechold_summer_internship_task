export type Job = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type Food = {
  id: number;
  name: string;
};

export type AllSmurfData = {
  smurfs: Smurf[];
  houses: MushroomHouse[];
  workplaces: WorkingPlace[];
  venues: LeisureVenue[];
  jobs: Job[];
  foods: Food[];
  brands: Brand[];
};

export function getNameById<T extends { id: number; name: string }>(
  arr: T[],
  id: number | undefined | null
): string {
  if (id === undefined || id === null) return "—";
  return arr.find((x) => x.id === id)?.name ?? String(id);
}

// Color object
export type SmurfColor = {
  r: number;
  g: number;
  b: number;
  a: number;
  name: string;
  isKnownColor: boolean;
  isEmpty: boolean;
  isNamedColor: boolean;
  isSystemColor: boolean;
};

// Smurf
export type Smurf = {
  id: number;
  name: string;
  age: number;
  job: number;
  favouriteFood: number;
  favouriteBrand: number;
  favouriteColor: SmurfColor;

  // Link
  house?: MushroomHouse;
  workplace?: WorkingPlace;
  leisureVenue?: LeisureVenue;
};

// Mushroom House
export type MushroomHouse = {
  id: number;
  capacity: number;
  color: SmurfColor;
  motto: string;
  residentIds: number[];
  acceptedFoods: number[];
  residents?: Smurf[];
};

// Working Place
export type WorkingPlace = {
  id: number;
  name: string;
  acceptedJobs: number[];
  employeeIds: number[];

  employees?: Smurf[];
};

// Leisure Venue
export type LeisureVenue = {
  id: number;
  name: string;
  capacity: number;
  acceptedBrand: number;
  memberIds: number[];

  members?: Smurf[];
};
