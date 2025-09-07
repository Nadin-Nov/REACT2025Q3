import { describe, it, expect } from 'vitest';

import type {
  UncontrolledFormData,
  ControlledFormData,
} from '../../features/mainPage/types';

import {
  formsReducer,
  addUncontrolledFormData,
  addHookFormData,
} from './formsSlice';

describe('formsSlice', () => {
  it('should handle addUncontrolledFormData', () => {
    const initialState = { uncontrolled: [], hookForm: [] };

    const payload: UncontrolledFormData = {
      name: 'Bob',
      age: 25,
      email: 'bob@test.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      gender: 'Male',
      acceptTnC: true,
      country: 'USA',
    };

    const nextState = formsReducer(
      initialState,
      addUncontrolledFormData(payload)
    );

    expect(nextState.uncontrolled).toHaveLength(1);
    expect(nextState.uncontrolled[0]).toEqual(payload);
  });

  it('should handle addHookFormData', () => {
    const initialState = { uncontrolled: [], hookForm: [] };

    const payload: ControlledFormData = {
      name: 'Alice',
      age: 30,
      email: 'alice@test.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      gender: 'Female',
      acceptTnC: true,
      country: 'Canada',
    };

    const nextState = formsReducer(initialState, addHookFormData(payload));

    expect(nextState.hookForm).toHaveLength(1);
    expect(nextState.hookForm[0]).toEqual(payload);
  });
});
