# syniti-take-home

A utility for processing a JSON encoded array of objects.

Attached is an imaginary example set of data a customer might need to
migrate from one system to another. It's a JSON encoded array of objects.
The customer understands some of the data might be bad and want to know
which records are invalid so they can ensure the new system will only have
valid data. Write a program that will read in the data and mark any
record:

1. That are a duplicate of another record
2. `name` field is null, missing, or blank
3. `address` field is null, missing, or blank
4. `zip` is null, missing, or an invalid U.S. zipcode

## Prereqs:

1. A recent [Node Js](https://nodejs.org/en/) version (this repo was developed using 14.16.0)

## Installation

1. Clone the repository via `git clone git@github.com:gravyboat/syniti-take-home.git`
2. Change in to the directory and install dependencies via `npm install`

## Running Tests

This repository is using Typescript and [ts-jest](https://github.com/kulshekhar/ts-jest).

Tests can be run via `npm t`.

## Usage

For the provided test data use the following steps:

1. `npm run build`
2. `node .\dist\validateData.js`

Data will be output in to the `output` directory as an example.

For your own data:

```
// make sure you have the appropriate path since this isn't a module
import validateData from 'validateData'

validateData('pathToInputFile', 'pathToValidOutputFile', 'pathToInvalidOutputFile')
```
