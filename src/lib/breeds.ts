interface Breeds {
  [breed: string]: string[];
}

export const flattenBreeds = (breeds: Breeds): string[] => {
  const flattenedBreeds = [];

  // Turn off eslint for this logic, I feel that this is a more readable approach.
  /* eslint no-restricted-syntax: ["error"] */
  for (const [key, value] of Object.entries(breeds)) {
    // If there are no sub-breeds, add directly to our list.
    if (!value.length) {
      flattenedBreeds.push(key);
    } else {
      // Else, iterate through the subBreed and push the subBreed prepended to the breed.
      value.forEach((subBreed) => {
        flattenedBreeds.push(`${subBreed} ${key}`);
      });
    }
  }

  // Alternative using reduce.
  // const flattenedBreeds = Object.keys(breeds).reduce((acc, breed) => {
  //   if (breeds[breed].length === 0) {
  //       // If there are no sub-breeds, add directly to our list.
  //       acc.push(breed);
  //     } else {
  //         // Else, iterate through the subBreed and push the subBreed prepended to the breed.
  //         acc.push(...breeds[breed].map((subBreed) => `${subBreed} ${breed}`));
  //       }
  //       return acc;
  // }, [] as string[]);

  return flattenedBreeds;
};
