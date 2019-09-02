import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiffFlatFile', () => {
  const before = path.resolve(__dirname, '__fixtures__', 'flatBefore.json');
  const after = path.resolve(__dirname, '__fixtures__', 'flatAfter.json');
  const resultString = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
  expect(genDiff(before, after)).toEqual(resultString);
});

test.each(['.json', '.yml', '.ini'])('genDiffPlain', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const resultString = path.resolve(__dirname, '__fixtures__', 'resultStringPlain.txt');
  expect(genDiff(before, after, 'plain')).toEqual(fs.readFileSync(resultString, 'utf-8'));
});

test.each(['.json', '.yml', '.ini'])('genDiffStandardFormat', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const resultString = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n        setting6: {\n            key: value\n          + ops: vops\n        }\n      + follow: false\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';
  expect(genDiff(before, after)).toEqual(resultString);
});

test.each(['.json', '.yml', '.ini'])('genDiffJson', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const resultString = path.resolve(__dirname, '__fixtures__', 'result.json');
  expect(genDiff(before, after, 'json')).toEqual(fs.readFileSync(resultString, 'utf-8'));
});
