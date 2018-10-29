import _debug from 'debug';
import axios from 'axios';

const debug = _debug('app:dog:controller');

// Have a single axios instance so we dont have to put all these settings more than once
const ApiClient = axios.create({
  baseURL: 'https://dog.ceo/api/',
  method: 'get',
  responseType: 'json'
})

// Query the API to get the sub breeds of a particular breed
const getSubBreeds = (breed) => ApiClient.get(`breed/${breed}/list`);

// Query the API to get the Images of a particular breed
const getBreedImages = (breed) => ApiClient.get(`breed/${breed}/images`);

// By requirements, images array items should not be simple stirngs as the returned
// by the API but objects with a url property on them, i.e, { url: 'https...'}
const prependURL = (url) => ({ url });

// Our main function that will perfomr the API Calls and prepare the data
const DogController = breed =>
  new Promise((resolve, reject) => {
    // Our API Calls are not dependent on each other
    // so we concurrently query process API calls
    axios.all([getSubBreeds(breed), getBreedImages(breed)])
    .then(axios.spread((subBreedsResponse, imagesResponse) => {
      // Both requests are now complete, so we destructure the response to get our data
      const { data: { message: subBreeds } } = subBreedsResponse;
      const { data: { message: breedImages } } = imagesResponse;
      const images = breedImages.map(prependURL); // Apply transformation to our images items

      return resolve({
        breed,
        subBreeds,
        images
      });
    }))
    .catch((err) => {
      debug('Please try again.', err.message);
      reject(err);
    })
  });

export default DogController;
