import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(id: string): T {
    return JSON.parse(localStorage.getItem(id)) as T;
  }

  delete(id: string): void {
    localStorage.removeItem(id);
  }

  clear(): void {
    localStorage.clear();
  }
}
