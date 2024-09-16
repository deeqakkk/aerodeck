import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/common/Header';

describe('Header Component', () => {
  it('renders the AppBar with the correct title', () => {
    render(<Header />);

    const titleElement = screen.getByText(/AeroDeck/i);
    expect(titleElement).toBeInTheDocument();

    const appBar = screen.getByRole('banner'); 
    expect(appBar).toBeInTheDocument();
  });
});
