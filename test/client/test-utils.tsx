
import { HeavyweightFile } from "../../src/client/model/file-interfaces";
import { DicomEntry, DicomComparisonData } from "../../src/client/model/dicom-entry";
import { ApplicationStateReducer } from "../../src/client/application-state";
import { ColorDictionary } from "../../src/client/utils/colour-dictionary";

export function prepareTestFile(): HeavyweightFile {
    let testFile: HeavyweightFile = {
        fileName: 'test',
        timestamp: 12345,
        fileSize: 100,
        bufferedData: new Uint8Array(0),
        dicomData: {
            entries: [prepareDicomEntry()]
        }
    }
    return testFile;
}

export function prepareTestFileWithSequence(): HeavyweightFile {
    let testFile: HeavyweightFile = {
        fileName: 'sequenceFile',
        timestamp: 12345,
        fileSize: 100,
        bufferedData: new Uint8Array(0),
        dicomData: {
            entries: [prepareDicomSequence()]
        }
    }
    return testFile;
}

export function prepareDicomEntry(): DicomEntry {
    return {
        id: 1,
        offset: 12456,
        byteLength: 10,
        tagGroup: '0001',
        tagElement: '0002',
        tagName: 'Test name',
        tagValue: 'Test value',
        tagVR: 'TVR',
        tagVM: 'TVM',
        colour: 'test color',
        sequence: []
    };
}

export function prepareDicomSequence(): DicomEntry {
    return {
        id: 1,
        byteLength: 0,
        offset: 0,
        tagGroup: '0001',
        tagElement: '0002',
        tagName: 'Sequence name',
        tagValue: 'Sequence value',
        tagVR: 'SVR',
        tagVM: 'SVM',
        colour: 'sequence test color',
        sequence: [prepareDicomEntry()]
    };
}

export function prepareSimpleTestComparisionData(): DicomComparisonData[] {
    let data: DicomComparisonData[] = [
        {
            group: [prepareDicomEntry(), prepareDicomEntry()],
            tagElement: '0001',
            tagGroup: '0002'
        }
    ];
    return data;
}


export function prepareDefaultTestProps(reducer: ApplicationStateReducer) {
  return {
    reducer: reducer,
    loadedFiles: [],
    selectedFiles: [],
    colorDictionary: new ColorDictionary(),
    className: ''
  }
}