import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(
      new User('Ashish', 'Singh', 'ashish@test.com', 'password')
    ).toBeTruthy();
  });
});
