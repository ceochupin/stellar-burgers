import { Action } from '@reduxjs/toolkit';

interface PendingAction extends Action {
  meta: {
    requestStatus: 'pending';
  };
}

interface RejectedAction extends Action {
  payload?: string;
  error: { message: string };
}

export const isPendingAction = (action: Action): action is PendingAction =>
  action.type.endsWith('/pending');

export const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('/rejected');
