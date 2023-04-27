import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private authToken: string;

  constructor() {
    this.authToken = '';
    console.log(this.parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMUBhaXJ3YXlzLmNvbSIsImlhdCI6MTY4MjU5NzkzOSwiZXhwIjoxNjgyNjAxNTM5LCJzdWIiOiIyIn0.4GlrdumIVG9UujqefGXYBHo3V7QJtYYFZCgccQtep9Y'));
  }

  private parseJwt(token:string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    try {
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return 'Token validation error';
    }
  }
}
