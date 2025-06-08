import type {
  Smurf,
  MushroomHouse,
  WorkingPlace,
  LeisureVenue,
  Job,
  Brand,
  Food,
} from "../types/SmurfTypes";

const API_URL = import.meta.env.VITE_API_URL;

// Smurfs
export const fetchSmurfs = async (): Promise<Smurf[]> => {
  const res = await fetch(`${API_URL}/Smurfs`);
  if (!res.ok) throw new Error("Failed to fetch smurfs");
  return await res.json();
};

// Mushroom Houses
export const fetchMushroomHouses = async (): Promise<MushroomHouse[]> => {
  const res = await fetch(`${API_URL}/MushroomHouses`);
  if (!res.ok) throw new Error("Failed to fetch mushroom houses");
  return await res.json();
};

// Working places
export const fetchWorkingPlaces = async (): Promise<WorkingPlace[]> => {
  const res = await fetch(`${API_URL}/WorkingPlaces`);
  if (!res.ok) throw new Error("Failed to fetch working places");
  return await res.json();
};

// Leisure venues
export const fetchLeisureVenues = async (): Promise<LeisureVenue[]> => {
  const res = await fetch(`${API_URL}/LeisureVenues`);
  if (!res.ok) throw new Error("Failed to fetch leisure venues");
  return await res.json();
};

// Jobs
export const fetchJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${API_URL}/Jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
};

// Foods
export const fetchFoods = async (): Promise<Food[]> => {
  const res = await fetch(`${API_URL}/Foods`);
  if (!res.ok) throw new Error("Failed to fetch foods");
  return await res.json();
};

// Brands
export const fetchBrands = async (): Promise<Brand[]> => {
  const res = await fetch(`${API_URL}/Brands`);
  if (!res.ok) throw new Error("Failed to fetch brands");
  return await res.json();
};
