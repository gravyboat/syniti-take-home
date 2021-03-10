import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface userAddressFormat {
    name: string | null | undefined;
    address: string | null | undefined;
    zip: string | null | undefined;
}

export const readJsonFile = (filePath: string): userAddressFormat[] => {
    const jsonFilePath = path.join(__dirname, '../', filePath);
    const formattedData: userAddressFormat[] = JSON.parse(
        readFileSync(jsonFilePath, 'utf-8').split('\n')[0]
    );
    return formattedData;
};

export const validZipCode = (zipcode: string): boolean => {
    return /^\d{5}(-\d{4})?$/.test(zipcode);
};

const writeOutput = (addressArray: userAddressFormat[], outputPath: string) => {
    const validOutputPath: string = path.join(__dirname, '../', outputPath);

    writeFileSync(validOutputPath, JSON.stringify(addressArray), 'utf-8');
};

export const validateAndOptionallyWriteData = (
    filePath: string,
    validOutputPath?: string,
    invalidOutputPath?: string
): userAddressFormat[][] => {
    const jsonDataArray: userAddressFormat[] = readJsonFile(filePath);
    const validAddressArray: userAddressFormat[] = [];
    const invalidAddressArray: userAddressFormat[] = [];

    jsonDataArray.forEach((entry) => {
        if (
            entry.name &&
            entry.name.length >= 1 &&
            entry.address &&
            entry.address.length > 1 &&
            entry.zip &&
            validZipCode(entry.zip) &&
            !validAddressArray.includes(entry)
        ) {
            validAddressArray.push(entry);
        } else {
            invalidAddressArray.push(entry);
        }
    });
    if (validOutputPath) {
        writeOutput(validAddressArray, validOutputPath);
    }
    if (invalidOutputPath) {
        writeOutput(invalidAddressArray, invalidOutputPath);
    }

    return [validAddressArray, invalidAddressArray];
};

validateAndOptionallyWriteData(
    'data/data.json',
    'output/valid.json',
    'output/invalid.json'
);
