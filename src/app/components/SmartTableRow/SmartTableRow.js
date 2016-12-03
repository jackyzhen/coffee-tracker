import { TableRow, TableRowColumn } from 'material-ui/Table';
import React, { PropTypes } from 'react';
import formatTableCell from './formatTableCell';

function SmartTableRow(props) {
  const { index, row, tableHeaders } = props;
  return (
    <TableRow key={index} selectable>
      { tableHeaders.map((header, propIndex) => (
        <TableRowColumn key={propIndex}>{ formatTableCell(row[header.dataAlias], header.format, row) }</TableRowColumn>
      )) }
    </TableRow>
  );
}

SmartTableRow.propTypes = {
  index: PropTypes.number,
  row: PropTypes.object,
  tableHeaders: PropTypes.array,
};

export default SmartTableRow;
