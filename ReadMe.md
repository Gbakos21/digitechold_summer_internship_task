# Project Plan and Design Decisions

## Development Steps

1. Understanding the task
2. Setting up Docker -> Creating and configuring the YAML file
3. Understanding the backend
4. Creating `smurfTypes.ts` according to the backend
5. API component
6. Creating `useLinkedsmurfdata.ts` for connecting the data
7. Basic dashboard functionality
8. Basic functionality of other components
9. Basic design implementation
10. Applying colors to the site
11. Ensuring equal length/height (UI consistency)
12. Fully functional dashboard and components
13. Dark mode
14. Using React.memo
15. Title and SVG generation -> replacement
16. Creating detailed pages
17. Backend issue noticed: Does not provide information about which foods are accepted in mushroom houses
18. Mobile responsiveness
19. Dockerizing the frontend application for containerized deployment
20. Setting up a .env file for flexible API endpoint configuration
21. Updating the backend to enable CORS, allowing cross-origin API requests from the frontend (container-to-container communication)
22. docker compose up --build
23. Fixed backend issue: Mushroom houses now provide accepted foods information in the API response

---

The backend API(eg. Smurfs) is available at http://localhost:5000/stat/Smurfs, while the frontend application can be accessed at http://localhost:3000/.

---

# Short Design Decisions

The data is displayed through a single Dashboard.  
The following tabs are available:

- **Summary:** General statistics using MUI charts.
- **Smurfs:** List of smurfs.
- **Mushroom Houses:** Smurfs’ houses.
- **Working Places:** Workplaces.
- **Leisure Venues:** Leisure places.

Except for the summary, each page displays the basic properties.  
When clicking on a card, all related information is shown on a separate detail page.

# Long Design Decisions

## App.tsx

This is the main entry point of the entire application, implementing page-level navigation with **React Router**.

- **Dark/light mode** toggle is available.

### Main routes

- `/` – **Dashboard** (overview, lists, statistics)
- `/smurf/:id`, `/house/:id`, `/venue/:id`, `/workplace/:id` – detail pages for each entity

---

## Dashboard.tsx

Shows all main views in a **tabbed layout** or, on mobile, in a **dropdown menu**:

- **Summary** (overview statistics, pie charts)
- **Smurfs** (list of smurfs)
- **Mushroom Houses** (list of mushroom houses)
- **Working places** (list of workplaces)
- **Leisure venues** (list of leisure venues)

Each tab loads the appropriate list component (e.g., `SmurfList`).

---

## List Components

Each list component (`SmurfList`, `HouseList`, `WorkplaceList`, `VenueList`) uses **Material UI cards** to display basic entity data and lists the related smurfs, etc.  
Clicking a card navigates to the corresponding detail page.

### SmurfList.tsx

- Each smurf card shows: **name**, **age**, **workplace**, **mushroom house**, **leisure venue**, **favorite color**, etc.
- Every smurf appears with a small colored stripe indicating their favorite color.

### HouseList.tsx

- Each mushroom house card shows the house's **color**, **residents**, **motto**, and **capacity**.

### WorkplaceList.tsx

- Displays workplace **name**, **number of employees**, **number of accepted job types**, and a list of employees.

### VenueList.tsx

- Displays leisure venue **name**, **number of members**, **capacity**, **accepted brand**, and a list of members.

---

## Detail Pages

Each entity has its own **detail page** (e.g., `/smurf/:id`) displaying all details about the entity.  
Each page has a **back button** to return to the main list.

### SmurfDetail.tsx

- Shows all smurf details, including the names of related entities (mushroom house, workplace, etc.) and a visual color representation.

### HouseDetail.tsx

- Shows all details of a mushroom house, including **residents**, **accepted foods**, and **motto**.

### WorkplaceDetail.tsx

- Displays the **workplace name**, **employees**, **accepted job types**, etc.

### VenueDetail.tsx

- Shows the leisure venue's full details, including **member names** and **accepted brand**.

---

## Summary.tsx

Serves as the **main dashboard**, showing aggregate statistics (number of smurfs, houses, workplaces, leisure venues) in cards.

Includes **two pie charts**:

- One for the count of main entities
- One for selectable values (jobs, brands, foods)

---

## Data Handling

Data is loaded via the `useLinkedSmurfData` hook, which also links backend entity IDs to their actual objects  
(e.g., assigning smurf objects to mushroom houses).

For all detail pages, data loading status is always checked first, and **error handling** is implemented everywhere.

---
