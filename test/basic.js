const Encryptor = require('../lib/file-encryptor'),
  fs = require('fs'),
  path = require('path'),
  assert = require('assert');

const key = 'My Super Secret Key';

const encryptor = new Encryptor({ key });

const exampleFilename = path.join(__dirname, 'example.txt');
const encryptedFilename = path.join(__dirname, 'encrypted.data');
const decryptedFilename = path.join(__dirname, 'decrypted.data');

const cleanUp = () => {
  fs.unlinkSync(encryptedFilename);
  fs.unlinkSync(decryptedFilename);
};

const encryptFile = () => {
  return encryptor.encryptFile(exampleFilename, encryptedFilename);
};

const decryptFile = () => {
  return encryptor.decryptFile(encryptedFilename, decryptedFilename);
};

const checkFiles = () => {
  const exampleFileContents = fs.readFileSync(exampleFilename, 'utf8');
  const encryptedFileContents = fs.readFileSync(encryptedFilename, 'utf8');
  const decryptedFileContents = fs.readFileSync(decryptedFilename, 'utf8');
  
  assert(exampleFileContents !== encryptedFileContents, 'Encryption failed');
  assert(exampleFileContents === decryptedFileContents, 'Decryption failed');
};

encryptFile()
  .then(decryptFile)
  .then(checkFiles)
  .then(cleanUp)
  .catch((e) => {
    cleanUp();
    console.log(`Test failed: ${e.message}`);
  });

