export interface Item {
    id: number;
    name: string;
    category_id: number | null;
    location_id: number | null;
    description: string | null;
    image: string | null;
}

export interface LocationAndCategori {
    id: number;
    name: string;
    description: string | null;
}