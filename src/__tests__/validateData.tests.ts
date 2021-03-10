import { readFileSync } from 'fs';
import {
    userAddressFormat,
    validZipCode,
    readJsonFile,
    validateData,
} from '../validateData';
import path from 'path';

describe('read in data', () => {
    test('reads in JSON aray file to confirm local file access', () => {
        expect(readJsonFile('data/testData/data.json')).toBeInstanceOf(Array);
    });
});

describe('checks zipcodes for validity', () => {
    test('checks if a null zipcode is valid', () => {
        expect(validZipCode(null)).toThrowError;
    });

    test('rhecks if an undefined zipcode is valid', () => {
        expect(validZipCode(null)).toThrowError;
    });
    test('checks if a short zipcode is valid', () => {
        expect(validZipCode('9810')).toBe(false);
    });
    test('checks if a long zipcode is valid', () => {
        expect(validZipCode('981011')).toBe(false);
    });
    test('checks if a valid zipcode is valid', () => {
        expect(validZipCode('98101')).toBe(true);
    });
});

describe('validates JSON data', () => {
    test('reads JSON array to ensure valid values are correct', () => {
        expect(validateData('data/testData/data.json')).toBeInstanceOf(Array);
    });
    test('reads JSON array to ensure valid data is created and writes to the output file when only an output path is provided', () => {
        validateData('data/testData/data.json', 'data/testData/valid.json');
        expect(
            readFileSync(
                path.join(
                    __dirname,
                    '../../data/testData/mockResults/valid.json'
                )
            )
        ).toEqual(
            readFileSync(path.join(__dirname, '../../data/testData/valid.json'))
        );
    });
    test('reads JSON array to ensure valid data is created and writes to a file', () => {
        validateData(
            'data/testData/data.json',
            'data/testData/valid.json',
            'data/testData/invalid.json'
        );
        expect(
            readFileSync(
                path.join(
                    __dirname,
                    '../../data/testData/mockResults/valid.json'
                )
            )
        ).toEqual(
            readFileSync(path.join(__dirname, '../../data/testData/valid.json'))
        );
    });
    test('reads JSON array to ensure invalid data is created and writes to a file', () => {
        validateData(
            'data/testData/data.json',
            'data/testData/valid.json',
            'data/testData/invalid.json'
        );
        expect(
            readFileSync(
                path.join(
                    __dirname,
                    '../../data/testData/mockResults/invalid.json'
                )
            )
        ).toEqual(
            readFileSync(
                path.join(__dirname, '../../data/testData/invalid.json')
            )
        );
    });
});
