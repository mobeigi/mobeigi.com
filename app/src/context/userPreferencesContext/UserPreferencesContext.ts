'use client';

import { createContext } from 'react';
import { UserPreferencesContextProps } from './types';

export const UserPreferencesContext = createContext<UserPreferencesContextProps | undefined>(undefined);
