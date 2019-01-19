import { SharedState } from './shared-state.interface';

export function createSharedState(): SharedState {
  return {
    removeMe: null
  };
}
