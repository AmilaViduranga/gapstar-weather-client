import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it ("should return dd-mm-yyyy format date for given valid date", () => {
    // given
    const value = 1666310400;
    const expectedValue = "2022-10-21";

    // when
    const actualValue = new DatePipe().transform(value);

    // then
    expect(expectedValue).toEqual(actualValue);
  });

  it ("should return empty string for given invalid date", () => {
    // given
    const value = "2022-08-12";
    const expectedValue = "";

    // when
    const actualValue = new DatePipe().transform(value as any);

    // then
    expect(expectedValue).toEqual(actualValue);
  });
});
