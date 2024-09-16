import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/common/Footer';

describe('Footer Component', () => {
  it('renders the Footer component correctly', () => {
    render(<Footer />);

    const footerText = screen.getByText(/© 2024 AeroDeck. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  it('renders the Box component with correct role', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo'); 
    expect(footerElement).toBeInTheDocument();
  });

  it('applies the correct styles to the Box component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');

    expect(footerElement).toHaveStyle('background-color: #f1f1f1');
    expect(footerElement).toHaveStyle('text-align: center');
    expect(footerElement).toHaveStyle('padding: 16px');
    expect(footerElement).toHaveStyle('margin-top: auto');
  });
});
