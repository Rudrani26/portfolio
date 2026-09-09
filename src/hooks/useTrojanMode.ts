import { useContext } from 'react';
import { TrojanModeContext, type TrojanModeContextValue } from '../lib/trojanModeContext';

export function useTrojanMode(): TrojanModeContextValue {
  const ctx = useContext(TrojanModeContext);
  if (!ctx) throw new Error('useTrojanMode must be used within a TrojanModeProvider');
  return ctx;
}
