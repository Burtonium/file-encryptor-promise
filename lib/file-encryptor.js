const crypto = require('crypto');
const fs = require('fs');

class Encryptor {
  constructor(config = {}) {
    const { key, options } = config;
    this.key = key;
    this.options = Object.assign({
      algorithm: 'aes192'
    }, options);
  }
  
  encryptFile(inputPath, outputPath, key, options = {}) {
    return new Promise((resolve, reject) => {
      const encryptionKeyBuffer = new Buffer.from(key || this.key);
      const algorithm = options.algorithm || this.options.algorithm;
      const cipher = crypto.createCipher(algorithm, encryptionKeyBuffer);
      const inputStream = fs.createReadStream(inputPath);
      const outputStream = fs.createWriteStream(outputPath);
      
      inputStream.on('data', (data) => {
        const buf = new Buffer.from(cipher.update(data), 'binary');
        outputStream.write(buf);
      });
      
      inputStream.on('end', () => {
        try {
          const buf = new Buffer.from(cipher.final('binary'), 'binary');
          outputStream.write(buf);
          outputStream.end();
          outputStream.on('close', () => {
            return resolve();
          });
        } catch(e) {
          fs.unlink(outputPath);
          return reject(e);
        }
      });
    });
  }
  
  decryptFile(inputPath, outputPath, key, options = {}) {
    return new Promise((resolve, reject) => {

      const encryptionKeyBuffer = new Buffer.from(key || this.key);
      const algorithm = options.algorithm || this.options.algorithm;
      const inputStream = fs.createReadStream(inputPath);
      const outputStream = fs.createWriteStream(outputPath);
      const cipher = crypto.createDecipher(algorithm, encryptionKeyBuffer);
      inputStream.on('data', (data) => {
        const buf = new Buffer.from(cipher.update(data), 'binary');
        outputStream.write(buf);
      });
      
      inputStream.on('end', () => {
        try {
          const buf = new Buffer.from(cipher.final('binary'), 'binary');
          outputStream.write(buf);
          outputStream.end();
          outputStream.on('close', () => {
            return resolve();
          });
        } catch(e) {
          fs.unlink(outputPath);
          return reject(e);
        }
      });
    });
  }
}

module.exports = Encryptor;

