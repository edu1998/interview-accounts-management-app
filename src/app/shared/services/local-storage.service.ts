import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving data in localStorage', e);
    }
  }

  getItem<T>(key: string): T | undefined {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch (e) {
      console.error('Error access item in localStorage', e);
      return undefined;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }
}
