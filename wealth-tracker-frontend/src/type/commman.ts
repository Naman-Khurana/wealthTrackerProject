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

  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;

  authorities: any[];
  username: string;
};