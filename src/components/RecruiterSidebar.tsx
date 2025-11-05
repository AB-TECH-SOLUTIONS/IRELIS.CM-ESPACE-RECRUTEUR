import { LayoutDashboard, Briefcase, Users, BarChart3, Settings, FileText, Search, MessageSquare, HelpCircle, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import logo from "figma:asset/962f09fbbf6299000d03ce8cc7ff5211d8ddd3ab.png";

interface RecruiterSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function RecruiterSidebar({ activeTab, onTabChange }: RecruiterSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "jobs", label: "Mes offres", icon: Briefcase },
    { id: "sourcing", label: "Sourcing Intelligent", icon: Search },
    { id: "candidates", label: "Candidatures", icon: Users },
    { id: "messaging", label: "Messagerie", icon: MessageSquare },
    { id: "analytics", label: "Statistiques", icon: BarChart3 },
    { id: "team", label: "Équipe", icon: UsersRound },
    { id: "templates", label: "Modèles", icon: FileText },
    { id: "settings", label: "Paramètres", icon: Settings },
    { id: "support", label: "Support & Aide", icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <img src={logo} alt="Irelis Cameroun" className="h-10 mb-3" />
        <p className="text-muted-foreground text-sm mt-1">Espace recruteurs</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            RH
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate">Équipe Recrutement</p>
            <p className="text-sm text-muted-foreground truncate">recrutement@ireliscameroun.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
