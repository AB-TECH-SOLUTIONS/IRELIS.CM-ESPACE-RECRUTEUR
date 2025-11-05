import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2">{value}</p>
            <p className={`text-sm mt-1 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {change}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Offres actives"
        value="42"
        change="+18% ce mois"
        icon={<Briefcase className="h-6 w-6 text-primary" />}
        trend="up"
      />
      <StatCard
        title="Candidatures reçues"
        value="329"
        change="+27% ce mois"
        icon={<Users className="h-6 w-6 text-primary" />}
        trend="up"
      />
      <StatCard
        title="Vues totales"
        value="8,423"
        change="+12% ce mois"
        icon={<Eye className="h-6 w-6 text-primary" />}
        trend="up"
      />
      <StatCard
        title="Taux de conversion"
        value="6.8%"
        change="+1.2% ce mois"
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
        trend="up"
      />
    </div>
  );
}
