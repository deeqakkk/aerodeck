import React from 'react';
import { Box, TableCell, SxProps } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface TableHeaderCellProps {
  icon: SvgIconComponent;
  text: string;
  sx?: SxProps; 
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ icon: Icon, text, sx }) => {
  return (
    <TableCell sx={sx}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon sx={{ mr: 1 }} />
        {text}
      </Box>
    </TableCell>
  );
};

export default TableHeaderCell;
