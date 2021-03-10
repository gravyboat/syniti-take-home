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

export const writeValidOutput = (
    validAddressArray: userAddressFormat[],
    validOutput: string
) => {
    const validOutputPath: string = path.join(__dirname, '../', validOutput);

    writeFileSync(validOutputPath, JSON.stringify(validAddressArray), 'utf-8');
};

export const writeInvalidOutput = (
    invalidAddressArray: userAddressFormat[],
    invalidOutput: string
) => {
    const invalidOutputPath: string = path.join(
        __dirname,
        '../',
        invalidOutput
    );

    writeFileSync(
        invalidOutputPath,
        JSON.stringify(invalidAddressArray),
        'utf-8'
    );
};

export const validateData = (
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
        writeValidOutput(validAddressArray, validOutputPath);
    }
    if (invalidOutputPath) {
        writeInvalidOutput(invalidAddressArray, invalidOutputPath);
    }

    return [validAddressArray, invalidAddressArray];
};

validateData('data/data.json', 'output/valid.json', 'output/invalid.json');
