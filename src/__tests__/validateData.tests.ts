import { readFileSync } from 'fs';
import {
    userAddressFormat,
    validZipCode,
    readJsonFile,
    validateData,
} from '../validateData';
import path from 'path';

describe('read in data', () => {
    test('Reads in JSON aray file to confirm local file access', () => {
        expect(readJsonFile('data/testData/data.json')).toBeInstanceOf(Array);
    });
});

describe('Checks zipcodes for validity', () => {
    test('Checks if a null zipcode is valid', () => {
        expect(validZipCode(null)).toThrowError;
    });

    test('Checks if an undefined zipcode is valid', () => {
        expect(validZipCode(null)).toThrowError;
    });
    test('Checks if a short zipcode is valid', () => {
        expect(validZipCode('9810')).toBe(false);
    });
    test('Checks if a long zipcode is valid', () => {
        expect(validZipCode('981011')).toBe(false);
    });
    test('Checks if a valid zipcode is valid', () => {
        expect(validZipCode('98101')).toBe(true);
    });
});

describe('validates JSON data', () => {
    test('reads JSON array to ensure valid values are correct', () => {
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
    test('reads JSON array to ensure invalid values are correct', () => {
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
