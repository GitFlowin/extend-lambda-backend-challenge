interface Breeds {
  [breed: string]: string[]
}

export const flattenBreeds = (breeds: Breeds): string[] => {
  return Object.keys(breeds).reduce((acc, breed) => {
    const subBreeds = breeds[breed]
    // If there are no sub-breeds, add to accumulator
    if (!subBreeds.length) {
      acc.push(breed)
    } else {
      // Else, iterate through the subBreed and push the subBreed prepended to the breed.
      subBreeds.forEach((subBreed) => {
        acc.push(`${subBreed} ${breed}`)
      })
    }
    return acc
  }, [] as string[])
}
