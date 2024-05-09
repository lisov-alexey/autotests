import assert from 'assert';

export class AssertingHelper {
  static assertingEqual<T>(actual: T, expected: T, message?: string): void {
    assert.strictEqual(actual, expected, message);
    console.log(`Expected result: ` + message);  }
}
