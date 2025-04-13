import { Home, List, User, Settings } from "lucide-react";

export const tabs = [
  {
    label: "Início",
    href: "/",
    icon: Home,
  },
  {
    label: "Transações",
    href: "/transactions",
    icon: List,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];
