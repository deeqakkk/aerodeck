import React from 'react';
import { Chip } from '@mui/material';

interface StatusChipProps {
    status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
    const getChipProps = (status: string) => {
        switch (status) {
            case 'On Time':
                return { label: 'On Time', sx: { backgroundColor: '#4caf50', color: 'white' } };
            case 'Delayed':
                return { label: 'Delayed', sx: { backgroundColor: '#f44336', color: 'white' } };
            case 'Boarding':
                return { label: 'Boarding', sx: { backgroundColor: '#2196f3', color: 'white' } };
            case 'Departed':
                return { label: 'Departed', sx: { backgroundColor: '#9e9e9e', color: 'white' } };
            default:
                return { label: 'Unknown', sx: { backgroundColor: '#000', color: 'white' } };
        }
    };

    const chipProps = getChipProps(status);

    return <Chip {...chipProps} />;
};

export default StatusChip;
