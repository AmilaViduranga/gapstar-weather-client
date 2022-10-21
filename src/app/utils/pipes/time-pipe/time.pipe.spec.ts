import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it ("should return hh:mm format date for given valid date", () => {
    // given
    const value = 1666310400;
    const expectedValue = "05:30";

    // when
    const actualValue = new TimePipe().transform(value);

    // then
    expect(expectedValue).toEqual(actualValue);
  });

  it ("should return empty string for given invalid date", () => {
    // given
    const value = "2022-08-12";
    const expectedValue = "";

    // when
    const actualValue = new TimePipe().transform(value as any);

    // then
    expect(expectedValue).toEqual(actualValue);
  });
});
