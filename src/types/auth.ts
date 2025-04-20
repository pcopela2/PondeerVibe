export enum Role {
  USER = 'USER',
  STORE_OWNER = 'STORE_OWNER',
  STORE_ASSOCIATE = 'STORE_ASSOCIATE',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  stores?: StoreUser[];
}

export interface StoreUser {
  id: string;
  userId: string;
  storeId: string;
  role: Role;
  store: Store;
}

export interface Store {
  id: string;
  name: string;
  shopifyDomain: string;
  stripeAccountId: string;
  location: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: Role) => boolean;
  hasStoreAccess: (storeId: string) => boolean;
} 