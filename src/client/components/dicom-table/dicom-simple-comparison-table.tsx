import * as React from 'react';
import { DicomEntry, DicomComparisonData } from '../../model/dicom-entry';
import { DicomTableHeader } from './dicom-table-header';
import { TableHeader, Table, TableBody } from 'material-ui';
import { DicomTableRow } from './dicom-table-row';

export interface DicomSimpleComparisonTableProps {
    comparisonData: DicomComparisonData[];
    showOnlyDiffs: boolean;
}

export interface DicomSimpleComparisonTableState {

}

// This component displays a table of all entries belonging to a single module
export class DicomSimpleComparisonTable extends React.Component<
    DicomSimpleComparisonTableProps,
    DicomSimpleComparisonTableState> {
    public constructor(props: DicomSimpleComparisonTableProps) {
        super(props);
    }

    public render() {
        return (
            <Table selectable={false}>
                <TableHeader
                    className="tableHeader"
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    {/* Header containing tag value names*/}
                    <DicomTableHeader />
                </TableHeader>
                <TableBody selectable={false} displayRowCheckbox={false}>

                    {this.props.comparisonData.reduce((
                        arr: JSX.Element[], group, groupIndex) => {
                        {/* if header, print once*/ }
                        if (group.group.length > 1) {
                            let entryHeader: DicomEntry = {
                                id: group.group[0].id,
                                offset: group.group[0].offset,
                                byteLength: group.group[0].byteLength,
                                tagGroup: group.group[0].tagGroup,
                                tagElement: group.group[0].tagElement,
                                tagName: '',
                                tagValue: '',
                                tagVR: '',
                                tagVM: '',
                                colour: '#000000',
                                sequence: []
                            };
                            arr.push(
                                <DicomTableRow entry={entryHeader} shouldShowTag={true} key={groupIndex} compareMode={true}/>
                            );
                            group.group.map((entry, entryIndex) => {

                                arr.push(

                                    <DicomTableRow
                                        entry={entry}
                                        shouldShowTag={false}
                                        key={entryIndex + 1000 * (groupIndex + 1)}
                                        compareMode={true}
                                    />
                                );
                            });

                        } else if (group.group.length === 1 && this.props.showOnlyDiffs === false) {
                            arr.push(
                                <DicomTableRow entry={group.group[0]} shouldShowTag={true} key={groupIndex} compareMode={true} />
                            );
                        }
                        return arr;
                    },                                [])}
                </TableBody>
            </Table>
        );
    }
}