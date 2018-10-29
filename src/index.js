import _debug from 'debug';
import yargs from 'yargs';
import DogController from './api/dog';

const { argv } = yargs;
const debug = _debug('app:index');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', () => {
  debug('An error has ocurred.')
});

// Get the breed from the command line or default it to hound
const breed = argv.breed || 'hound';

debug(`Fetching data for our ${breed} breed.`)

// Perform the API Calls and show the data
DogController(breed)
  .then((data) => debug('Response:', data));