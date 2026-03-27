export type rowTemplateContent={
    category : string;
    amount : number;
    date : string;
}


export type lastSixMonthsData={
    year : number;
    month : number;
    total : number;
}

export type Role = {
  id: number;
  role: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
  phoneNumber: string;

  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;

  authorities: any[];
  username: string;
};

export type UserSettings = {
  userId: number;
  currency: string;
  theme?: string;
};

export type Subscription = {
  planName: string;
  startDate: string;
  endDate: string;
  active: boolean;
};

export type LoginResponse = {
  user: User;
  userSettings: UserSettings;
  subscription: Subscription | null;
  jwt?: string;
  refreshToken?: string;
};

export type ChangePasswordPayload={
  oldPassword: string;
  newPassword: string;
}
