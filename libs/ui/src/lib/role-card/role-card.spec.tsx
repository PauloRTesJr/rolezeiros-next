import { render } from '@testing-library/react';

import RoleCard from './role-card';

describe('RoleCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoleCard />);
    expect(baseElement).toBeTruthy();
  });
});
