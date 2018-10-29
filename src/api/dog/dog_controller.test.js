import DogController from './dog_controller';

// Happy path
test("Using default breed: Hound", async () => {
  return DogController('hound').then(data => {
    const { breed, images, subBreeds } = data;
    // Our response has all required fields
    expect(data).toHaveProperty('breed');
    expect(data).toHaveProperty('images');
    expect(data).toHaveProperty('subBreeds');

    // Some extra validations for the data returned
    expect(breed).toEqual('hound')
    expect(Array.isArray(subBreeds)).toBeTruthy;
    expect(Array.isArray(images)).toBeTruthy;
  });
})

// Error path
test("Using invalid breed: crazyBreed", async () => {
  return DogController('crazyBreed').catch(err => {
    expect(err).toHaveProperty('message');
    expect(err.message).toEqual('Request failed with status code 404');
  });
})

