import { useEffect, useState } from "react";
import {
  fetchSmurfs,
  fetchMushroomHouses,
  fetchWorkingPlaces,
  fetchLeisureVenues,
  fetchJobs,
  fetchFoods,
  fetchBrands,
} from "../services/api";
import type {
  AllSmurfData,
  Smurf,
  MushroomHouse,
  WorkingPlace,
  LeisureVenue,
} from "../types/SmurfTypes";

export type LinkedData = AllSmurfData & {
  smurfById: Record<number, Smurf>;
  houseById: Record<number, MushroomHouse>;
  workplaceById: Record<number, WorkingPlace>;
  venueById: Record<number, LeisureVenue>;
};

export function useLinkedSmurfData() {
  const [data, setData] = useState<LinkedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [smurfs, houses, workplaces, venues, jobs, foods, brands] =
          await Promise.all([
            fetchSmurfs(),
            fetchMushroomHouses(),
            fetchWorkingPlaces(),
            fetchLeisureVenues(),
            fetchJobs(),
            fetchFoods(),
            fetchBrands(),
          ]);
        //ID
        const smurfById = Object.fromEntries(smurfs.map((s) => [s.id, s]));
        const houseById = Object.fromEntries(houses.map((h) => [h.id, h]));
        const workplaceById = Object.fromEntries(
          workplaces.map((w) => [w.id, w])
        );
        const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));

        // (Task 1!)
        houses.forEach((house) => {
          house.residents = house.residentIds
            .map((id) => smurfById[id])
            .filter(Boolean);
        });
        workplaces.forEach((wp) => {
          wp.employees = wp.employeeIds
            .map((id) => smurfById[id])
            .filter(Boolean);
        });
        venues.forEach((venue) => {
          venue.members = venue.memberIds
            .map((id) => smurfById[id])
            .filter(Boolean);
        });
        smurfs.forEach((smurf) => {
          smurf.house = houses.find((h) => h.residentIds.includes(smurf.id));
          smurf.workplace = workplaces.find((w) =>
            w.employeeIds.includes(smurf.id)
          );
          smurf.leisureVenue = venues.find((v) =>
            v.memberIds.includes(smurf.id)
          );
        });

        setData({
          smurfs,
          houses,
          workplaces,
          venues,
          jobs,
          foods,
          brands,
          smurfById,
          houseById,
          workplaceById,
          venueById,
        });
      } catch (e) {
        setError((e as Error).message);
      }
    };
    loadAll();
  }, []);

  return { data, error };
}
