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

export const validateData = (
    filePath: string,
    validOutput: string,
    invalidOutput: string
): void => {
    const jsonDataArray = readJsonFile(filePath);
    const validAddressArray = [];
    const invalidAddressArray = [];
    const validOutputPath = path.join(__dirname, '../', validOutput);
    const invalidOutputPath = path.join(__dirname, '../', invalidOutput);

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
    writeFileSync(validOutputPath, JSON.stringify(validAddressArray), 'utf-8');
    writeFileSync(
        invalidOutputPath,
        JSON.stringify(invalidAddressArray),
        'utf-8'
    );
};

validateData('data/data.json', 'output/valid.json', 'output/invalid.json');
