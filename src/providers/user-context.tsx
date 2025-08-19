"use client";

import { IReminder, ITask, IUser } from "@/@core/domain";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTask, useUser } from "@/@core/presentation/hooks";

interface UserContextProps {
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  mutate: () => Promise<void>;
  reminders: IReminder[];
  setReminders: Dispatch<SetStateAction<IReminder[]>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<IUser>();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [reminders, setReminders] = useState<IReminder[]>([]);

  const handleUser = useUser();
  const handleTask = useTask();

  // Função para buscar tasks do usuário
  const mutate = async () => {
    if (!user?._id) return;

    try {
      const taskData = await handleTask.fetcher.loadAll({ userID: user?._id });

      setTasks([...taskData]);
    } catch (err) {
      console.error("Erro ao buscar tasks:", err);
    }
  };

  // Busca dados do usuário quando o token estiver disponível
  useEffect(() => {
    if (!token && pathname == "/home") {
      router.push("/login");
    }

    if (!token) return;

    (async () => {
      try {
        const userData = await handleUser.fetcher.loadOne({ _id: token });
        setUser({ ...userData?.user });

        if (pathname === "/login") {
          router.push("/home");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    })();
  }, [pathname, token]);

  // Executa mutate sempre que o user._id mudar
  useEffect(() => {
    (async () => {
      await mutate();
    })();
  }, [user?._id]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        mutate,
        reminders,
        setReminders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook de acesso ao contexto
export function useUserContext(): UserContextProps {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext deve ser usado dentro do UserProvider!");
  return context;
}
