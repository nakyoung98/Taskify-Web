export type SignInForm = {
  email: string;
  password: string;
};

export type UserData = {
  user: {
    id: 0;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
};
