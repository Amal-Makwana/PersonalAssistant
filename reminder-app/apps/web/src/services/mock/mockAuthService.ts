import { wait } from './delay';

export class MockAuthService {
  private authenticated = false;

  async signIn(): Promise<void> {
    await wait();
    this.authenticated = true;
  }

  async signOut(): Promise<void> {
    await wait(150);
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
