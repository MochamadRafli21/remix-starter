import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User;
}) {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside <UserProvider>");
  return context;
}
