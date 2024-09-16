import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusChip from '../components/common/StatusChip';

const statusCases = [
    { status: 'On Time', label: 'On Time' },
    { status: 'Delayed', label: 'Delayed' },
    { status: 'Boarding', label: 'Boarding' },
    { status: 'Departed', label: 'Departed' },
    { status: 'Unknown Status', label: 'Unknown' },
];

describe('StatusChip Component', () => {
    statusCases.forEach(({ status, label }) => {
        it(`renders ${label} status correctly`, () => {
            render(<StatusChip status={status} />);

            const chipElement = screen.getByText(label);
            expect(chipElement).toBeInTheDocument();
        });
    });
});
