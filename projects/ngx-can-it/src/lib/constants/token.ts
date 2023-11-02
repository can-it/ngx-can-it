import { InjectionToken } from '@angular/core';
import { ActionOperator, RiOperator } from '@can-it/core';

export const ACTION_OPERATOR = new InjectionToken<ActionOperator>('ACTION_OPERATOR')

export const RI_OPERATOR = new InjectionToken<RiOperator>('RI_OPERATOR')
