# file-encryptor-promise

Promisified version of XervoIO's package [file-encryptor](https://github.com/XervoIO/file-encryptor). Encrypts files using Node's built-in Cipher class. Encryption is stream-based for low memory footprint.

## Getting Started

Install the module:

    npm install file-encryptor-promise

Use it in your script:

    const Encryptor = require('file-encryptor-promise');

    const key = 'My Super Secret Key';
    
    const encryptor = new Encryptor({ key });

    // Encrypt file.
    await encryptor.encryptFile('input_file.txt', 'encrypted.dat');

    // Decrypt file.
    await encryptor.decryptFile('encrypted.dat', 'output_file.txt');

The input file will be streamed through the Cipher and to the output file. If the output files does not
exists, it will be created. If the output file already exists, it will be truncated.

## Change Cipher Algorithm

By default the "aes192" cipher algorithm is used. This can be changed by passing a new algorithm string
as an option.

Available algorithms can be found by executing:

    openssl list-cipher-algorithms

Setting algorithm option:

    var key = 'My Super Secret Key';
    var options = { algorithm: 'aes256' };

    encryptor = new Encryptor({ key, options });

    await encryptor.decryptFile('encrypted.dat', 'outputfile.txt');

## License
Copyright (c) 2013 Modulus
Licensed under the MIT license.
