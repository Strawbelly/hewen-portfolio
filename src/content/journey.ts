export type JourneyEntry = {
  id: string;
  label: string;
  folder: string;
};

export const journeyEntries: JourneyEntry[] = [
  {
    id: "school",
    label: "school/",
    folder: "school"
  },
  {
    id: "before-code",
    label: "before_code/",
    folder: "before_code"
  }
];
