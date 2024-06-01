type User = {
  username: string;
  password: string;
  id: string;
};

type LandingPage = {
  title: string;
  description: string;
  id: string;
  ownerId: string;
  views: number;
};

export type { User, LandingPage };
