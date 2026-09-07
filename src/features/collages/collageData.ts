export const collageImages = Array.from({ length: 31 }, (_, index) => {
  const fileNumber = index + 1;
  return {
    name: `${fileNumber}.jpg`,
    src: `/assets/collages/${fileNumber}.jpg`,
  };
});
