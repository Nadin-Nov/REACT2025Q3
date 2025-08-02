import { describe, expect, test } from 'vitest';

import {
  mockValidApiResponse,
  mockEmptyApiResponse,
  mockInvalidApiResponse,
} from '../__tests__/apiResponses';

import { isValidRickAndMortyApiResponse } from './validation';

describe('isValidRickAndMortyApiResponse', () => {
  test('returns true for valid full response', () => {
    expect(isValidRickAndMortyApiResponse(mockValidApiResponse)).toBe(true);
  });

  test('returns true for empty response', () => {
    expect(isValidRickAndMortyApiResponse(mockEmptyApiResponse)).toBe(true);
  });

  test('returns false for invalid response structure', () => {
    expect(isValidRickAndMortyApiResponse(mockInvalidApiResponse)).toBe(false);
  });

  test('returns false for null and non-object inputs', () => {
    expect(isValidRickAndMortyApiResponse(null)).toBe(false);
    expect(isValidRickAndMortyApiResponse(42)).toBe(false);
    expect(isValidRickAndMortyApiResponse('string')).toBe(false);
  });

  test('returns false if info fields have wrong types', () => {
    const badInfo = {
      ...mockValidApiResponse.info,
      count: 'not a number',
    };
    expect(
      isValidRickAndMortyApiResponse({
        info: badInfo,
        results: mockValidApiResponse.results,
      })
    ).toBe(false);
  });

  test('returns false if results contain invalid characters', () => {
    const badResults = [
      {
        ...mockValidApiResponse.results[0],
        id: 'not a number',
      },
    ];
    expect(
      isValidRickAndMortyApiResponse({
        info: mockValidApiResponse.info,
        results: badResults,
      })
    ).toBe(false);
  });
});
