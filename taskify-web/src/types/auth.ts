/** @type 로그인 할 때 사용하는 폼 타입 선언 */
export interface SignInForm {
  email: string;
  password: string;
}

/** @type 로그인 시도시 받아오는 userData 타입 선언 */
export interface UserData {
  user: {
    id: 0;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
