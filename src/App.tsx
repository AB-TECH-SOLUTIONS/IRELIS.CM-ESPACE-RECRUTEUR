import { useState } from "react";
import { RecruiterSidebar } from "./components/RecruiterSidebar";
import { StatsCards } from "./components/StatsCards";
import { JobsTable } from "./components/JobsTable";
import { UnifiedCandidates } from "./components/UnifiedCandidates";
import { SmartSourcing } from "./components/SmartSourcing";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { MessagingPanel } from "./components/MessagingPanel";
import { TeamManagement } from "./components/TeamManagement";
import { SupportCenter } from "./components/SupportCenter";
import { Settings, FileText, Bell, Shield, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Switch } from "./components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1>Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue dans votre espace recruteur
              </p>
            </div>
            <StatsCards />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("jobs")}>
                <CardContent className="p-6">
                  <h3>Créer une offre</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Publiez une nouvelle offre d'emploi
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("sourcing")}>
                <CardContent className="p-6">
                  <h3>CVthèque Irelis</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sourcez de nouveaux talents
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("analytics")}>
                <CardContent className="p-6">
                  <h3>Voir les stats</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analysez vos performances
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dernières candidatures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Aminata Ndiaye", job: "Maçon Chef d'Équipe", time: "Il y a 1h", status: "Nouveau" },
                      { name: "Jean-Paul Mbarga", job: "Vendeur Boutique", time: "Il y a 3h", status: "Nouveau" },
                      { name: "Grace Tchamba", job: "Infirmière DE", time: "Il y a 5h", status: "Examiné" },
                      { name: "Ibrahim Diallo", job: "Chef Cuisinier", time: "Hier", status: "Nouveau" },
                      { name: "Marie Etang", job: "Couturière Pro", time: "Hier", status: "Examiné" },
                    ].map((candidate, index) => (
                      <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div>
                          <p>{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.job}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {candidate.status}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">{candidate.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Offres les plus actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Vendeur Boutique Mode", candidates: 42, views: 623, status: "Active" },
                      { title: "Maçon Chef d'Équipe", candidates: 34, views: 512, status: "Active" },
                      { title: "Chef Cuisinier Restaurant", candidates: 27, views: 387, status: "Active" },
                      { title: "Infirmier(ère) Diplômé(e)", candidates: 18, views: 298, status: "Active" },
                      { title: "Agronome Maraîchage", candidates: 9, views: 156, status: "En attente" },
                    ].map((job, index) => (
                      <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div>
                          <p>{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {job.candidates} candidatures • {job.views} vues
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign overview */}
            <Card>
              <CardHeader>
                <CardTitle>Vue d'ensemble des campagnes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Offres actives</p>
                    <p className="mt-1">18</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Offres expirées</p>
                    <p className="mt-1">6</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Brouillons</p>
                    <p className="mt-1">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-6">
            <div>
              <h1>Gestion des offres d'emploi</h1>
              <p className="text-muted-foreground">Créez, modifiez et gérez toutes vos offres</p>
            </div>
            <JobsTable />
          </div>
        );

      case "sourcing":
        return <SmartSourcing />;

      case "candidates":
        return <UnifiedCandidates />;

      case "messaging":
        return <MessagingPanel />;

      case "analytics":
        return <AnalyticsDashboard />;

      case "team":
        return <TeamManagement />;

      case "templates":
        return (
          <div className="space-y-6">
            <div>
              <h1>Modèles d'offres</h1>
              <p className="text-muted-foreground">Créez et gérez vos modèles d'offres d'emploi pour gagner du temps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Développeur Backend", desc: "Modèle pour développeur backend avec stack technique courante" },
                { title: "Designer UI/UX", desc: "Modèle pour designer avec compétences Figma et Adobe" },
                { title: "Chef de Projet", desc: "Modèle pour chef de projet agile / scrum" },
                { title: "Data Scientist", desc: "Modèle pour data scientist avec Python et ML" },
                { title: "Product Manager", desc: "Modèle pour product manager avec expérience produit digital" },
                { title: "Consultant IT", desc: "Modèle pour consultant avec expertise technique" },
              ].map((template, index) => (
                <Card key={index} className="hover:border-primary cursor-pointer transition-colors">
                  <CardContent className="p-6">
                    <FileText className="h-8 w-8 text-muted-foreground mb-3" />
                    <h3>{template.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {template.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1>Paramètres</h1>
              <p className="text-muted-foreground">Configurez votre espace recruteur</p>
            </div>

            <Tabs defaultValue="company">
              <TabsList>
                <TabsTrigger value="company">Entreprise</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Sécurité & RGPD</TabsTrigger>
                <TabsTrigger value="billing">Facturation</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de l'entreprise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nom de l'entreprise</Label>
                      <Input defaultValue="Irelis" />
                    </div>
                    <div className="space-y-2">
                      <Label>Site web</Label>
                      <Input type="url" defaultValue="https://www.irelis.fr" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email de contact</Label>
                      <Input type="email" defaultValue="contact@irelis.fr" />
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input type="tel" defaultValue="+33 1 23 45 67 89" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description de l'entreprise</Label>
                      <Textarea
                        rows={4}
                        defaultValue="Leader du recrutement digital en France, Irelis accompagne les entreprises dans leur transformation RH."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Nouvelles candidatures</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un email pour chaque nouvelle candidature
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Résumé quotidien</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un rapport chaque matin
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Résumé hebdomadaire</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un rapport détaillé chaque lundi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Offres expirées</p>
                        <p className="text-sm text-muted-foreground">
                          Alerte 7 jours avant l'expiration d'une offre
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Messages candidats</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications pour les nouveaux messages
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité et protection des données (RGPD)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p>Conformité RGPD</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Vos données et celles de vos candidats sont protégées conformément au RGPD.
                            Toutes les actions sont tracées et un historique complet est disponible.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Durée de conservation des CV (mois)</Label>
                      <Input type="number" defaultValue="24" />
                      <p className="text-sm text-muted-foreground">
                        Les CV sont automatiquement supprimés après cette période
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p>Anonymisation automatique</p>
                        <p className="text-sm text-muted-foreground">
                          Anonymiser les candidatures refusées après 6 mois
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p>Politique de confidentialité</p>
                        <p className="text-sm text-muted-foreground">
                          Afficher votre politique sur les offres d'emploi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label>Politique de confidentialité</Label>
                      <Textarea
                        rows={4}
                        defaultValue="Les données collectées sont utilisées uniquement dans le cadre du processus de recrutement..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historique et traçabilité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Toutes les actions effectuées sur la plateforme sont enregistrées et consultables.
                    </p>
                    <div className="space-y-2">
                      {[
                        { action: "Modification de l'offre 'Développeur Full Stack'", user: "Marie Dupont", date: "Aujourd'hui à 14:30" },
                        { action: "Changement de statut candidat", user: "Pierre Laurent", date: "Aujourd'hui à 11:20" },
                        { action: "Accès aux données candidat 'Sophie Martin'", user: "Marie Dupont", date: "Hier à 16:45" },
                      ].map((log, index) => (
                        <div key={index} className="p-3 border rounded-lg text-sm">
                          <p>{log.action}</p>
                          <p className="text-muted-foreground mt-1">
                            Par {log.user} • {log.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Abonnement et facturation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Plan Premium</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Offres illimitées • CVthèque complète • Support prioritaire
                          </p>
                        </div>
                        <p>499€/mois</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Crédits CVthèque disponibles</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div className="bg-primary rounded-full h-2 w-3/4"></div>
                        </div>
                        <span className="text-sm">750/1000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Mode de paiement</Label>
                      <div className="p-3 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p>•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expire 12/2025</p>
                          </div>
                        </div>
                        <p className="text-sm text-primary cursor-pointer">Modifier</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Historique de facturation</Label>
                      <div className="space-y-2">
                        {[
                          { date: "01/11/2024", amount: "499€", status: "Payée" },
                          { date: "01/10/2024", amount: "499€", status: "Payée" },
                          { date: "01/09/2024", amount: "499€", status: "Payée" },
                        ].map((invoice, index) => (
                          <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                            <div>
                              <p>{invoice.date}</p>
                              <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {invoice.status}
                              </span>
                              <p className="text-sm text-primary cursor-pointer">Télécharger</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case "support":
        return <SupportCenter />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <RecruiterSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
