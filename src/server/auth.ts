export type Session = {
  userId: string;
};

export function getSessionFromRequest(_request: Request): Session | null {
  return null;
}

