import { useState } from "react";
import { Plus, X, Calendar as CalendarIcon, Building2, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";

interface PreselectionQuestion {
  id: string;
  question: string;
  type: "text" | "choice" | "yesno";
  required: boolean;
  options?: string[];
}

interface JobFormData {
  title: string;
  description: string;
  location: string;
  type: string;
  organizationType: string;
  sector: string;
  salary: string;
  experience: string;
  education: string;
  languages: string[];
  skills: string[];
  remote: boolean;
  publishNow: boolean;
  publishDate?: Date;
  preselectionQuestions: PreselectionQuestion[];
  benefits: string[];
  organizationSize: string;
}

export function EnhancedJobForm({ onSubmit, onCancel }: { onSubmit: (data: JobFormData) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    location: "",
    type: "CDI",
    organizationType: "entreprise-privee",
    sector: "technologie",
    salary: "",
    experience: "",
    education: "",
    languages: [],
    skills: [],
    remote: false,
    publishNow: true,
    preselectionQuestions: [],
    benefits: [],
    organizationSize: "pme",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "text" as "text" | "choice" | "yesno",
    required: false,
    options: [""],
  });

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== language),
    });
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit.trim()],
      });
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefit: string) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((b) => b !== benefit),
    });
  };

  const addQuestion = () => {
    if (newQuestion.question.trim()) {
      const question: PreselectionQuestion = {
        id: Date.now().toString(),
        question: newQuestion.question,
        type: newQuestion.type,
        required: newQuestion.required,
        options: newQuestion.type === "choice" ? newQuestion.options.filter((o) => o.trim()) : undefined,
      };
      setFormData({
        ...formData,
        preselectionQuestions: [...formData.preselectionQuestions, question],
      });
      setNewQuestion({
        question: "",
        type: "text",
        required: false,
        options: [""],
      });
    }
  };

  const removeQuestion = (id: string) => {
    setFormData({
      ...formData,
      preselectionQuestions: formData.preselectionQuestions.filter((q) => q.id !== id),
    });
  };

  const addQuestionOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, ""],
    });
  };

  const updateQuestionOption = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: newOptions,
    });
  };

  const removeQuestionOption = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto px-1">
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informations</TabsTrigger>
          <TabsTrigger value="requirements">Prérequis</TabsTrigger>
          <TabsTrigger value="preselection">Présélection</TabsTrigger>
          <TabsTrigger value="publication">Publication</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          {/* Type d'organisation */}
          <div className="space-y-2">
            <Label htmlFor="organizationType">Type d'organisation *</Label>
            <Select 
              value={formData.organizationType} 
              onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
            >
              <SelectTrigger>
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entreprise-privee">Entreprise Privée</SelectItem>
                <SelectItem value="administration-publique">Administration Publique</SelectItem>
                <SelectItem value="ong">ONG / Organisation Humanitaire</SelectItem>
                <SelectItem value="association">Association</SelectItem>
                <SelectItem value="startup">Start-up / Jeune Entreprise</SelectItem>
                <SelectItem value="tpe">TPE (Très Petite Entreprise)</SelectItem>
                <SelectItem value="pme">PME (Petite et Moyenne Entreprise)</SelectItem>
                <SelectItem value="grande-entreprise">Grande Entreprise</SelectItem>
                <SelectItem value="multinationale">Multinationale</SelectItem>
                <SelectItem value="secteur-informel">Secteur Informel</SelectItem>
                <SelectItem value="cooperative">Coopérative</SelectItem>
                <SelectItem value="diaspora">Organisation de la Diaspora</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Secteur d'activité */}
          <div className="space-y-2">
            <Label htmlFor="sector">Secteur d'activité *</Label>
            <Select 
              value={formData.sector} 
              onValueChange={(value) => setFormData({ ...formData, sector: value })}
            >
              <SelectTrigger>
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agriculture">Agriculture & Agro-alimentaire</SelectItem>
                <SelectItem value="artisanat">Artisanat & Métiers Manuels</SelectItem>
                <SelectItem value="commerce">Commerce & Distribution</SelectItem>
                <SelectItem value="construction">BTP & Construction</SelectItem>
                <SelectItem value="education">Éducation & Formation</SelectItem>
                <SelectItem value="energie">Énergie & Environnement</SelectItem>
                <SelectItem value="finance">Finance & Banque</SelectItem>
                <SelectItem value="sante">Santé & Social</SelectItem>
                <SelectItem value="hotellerie">Hôtellerie & Restauration</SelectItem>
                <SelectItem value="industrie">Industrie & Manufacturing</SelectItem>
                <SelectItem value="technologie">IT & Technologie</SelectItem>
                <SelectItem value="logistique">Logistique & Transport</SelectItem>
                <SelectItem value="marketing">Marketing & Communication</SelectItem>
                <SelectItem value="media">Médias & Audiovisuel</SelectItem>
                <SelectItem value="ong-humanitaire">ONG & Humanitaire</SelectItem>
                <SelectItem value="services">Services aux Entreprises</SelectItem>
                <SelectItem value="telecom">Télécommunications</SelectItem>
                <SelectItem value="tourisme">Tourisme</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre du poste *</Label>
            <Input
              id="title"
              placeholder="ex: Développeur Full Stack, Maçon, Cuisiner, Assistant RH..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du poste *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez les missions, responsabilités et environnement de travail..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localisation *</Label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une ville..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yaoundé">Yaoundé, Cameroun</SelectItem>
                  <SelectItem value="Douala">Douala, Cameroun</SelectItem>
                  <SelectItem value="Garoua">Garoua, Cameroun</SelectItem>
                  <SelectItem value="Bafoussam">Bafoussam, Cameroun</SelectItem>
                  <SelectItem value="Dakar">Dakar, Sénégal</SelectItem>
                  <SelectItem value="Abidjan">Abidjan, Côte d'Ivoire</SelectItem>
                  <SelectItem value="Lagos">Lagos, Nigeria</SelectItem>
                  <SelectItem value="Accra">Accra, Ghana</SelectItem>
                  <SelectItem value="Libreville">Libreville, Gabon</SelectItem>
                  <SelectItem value="Brazzaville">Brazzaville, Congo</SelectItem>
                  <SelectItem value="Kinshasa">Kinshasa, RDC</SelectItem>
                  <SelectItem value="Lomé">Lomé, Togo</SelectItem>
                  <SelectItem value="Cotonou">Cotonou, Bénin</SelectItem>
                  <SelectItem value="Bamako">Bamako, Mali</SelectItem>
                  <SelectItem value="Niamey">Niamey, Niger</SelectItem>
                  <SelectItem value="remote">Télétravail complet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de contrat *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI (Contrat Durée Indéterminée)</SelectItem>
                  <SelectItem value="CDD">CDD (Contrat Durée Déterminée)</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Apprentissage">Apprentissage</SelectItem>
                  <SelectItem value="Freelance">Freelance / Consultant</SelectItem>
                  <SelectItem value="Interim">Intérim / Temporaire</SelectItem>
                  <SelectItem value="Volontariat">Volontariat</SelectItem>
                  <SelectItem value="Benevolat">Bénévolat (ONG/Association)</SelectItem>
                  <SelectItem value="Mission">Mission courte durée</SelectItem>
                  <SelectItem value="Journalier">Journalier</SelectItem>
                  <SelectItem value="Saisonnier">Saisonnier</SelectItem>
                  <SelectItem value="Temps-partiel">Temps partiel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Rémunération</Label>
              <Input
                id="salary"
                placeholder="ex: 850K-1.2M FCFA/mois, 15K/jour, À négocier"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Laissez vide pour "À définir" ou "Selon profil"
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationSize">Taille de l'organisation</Label>
              <Select 
                value={formData.organizationSize} 
                onValueChange={(value) => setFormData({ ...formData, organizationSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-entrepreneur">Auto-entrepreneur / Indépendant</SelectItem>
                  <SelectItem value="tpe">TPE (1-10 employés)</SelectItem>
                  <SelectItem value="pme">PME (11-250 employés)</SelectItem>
                  <SelectItem value="eti">ETI (251-5000 employés)</SelectItem>
                  <SelectItem value="ge">Grande Entreprise (5000+ employés)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Avantages & Bénéfices</Label>
            <div className="flex gap-2">
              <Input
                placeholder="ex: Transport fourni, Formation continue, Repas..."
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" onClick={addBenefit} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.benefits.map((benefit) => (
                <Badge key={benefit} variant="secondary" className="gap-1">
                  {benefit}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeBenefit(benefit)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="remote"
              checked={formData.remote}
              onCheckedChange={(checked) => setFormData({ ...formData, remote: checked })}
            />
            <Label htmlFor="remote" className="cursor-pointer">Télétravail possible / Travail à distance</Label>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Expérience requise</Label>
            <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucune">Aucune expérience (Débutant accepté)</SelectItem>
                <SelectItem value="0-1">0-1 an (Junior)</SelectItem>
                <SelectItem value="1-3">1-3 ans</SelectItem>
                <SelectItem value="3-5">3-5 ans (Confirmé)</SelectItem>
                <SelectItem value="5-10">5-10 ans (Senior)</SelectItem>
                <SelectItem value="10+">10+ ans (Expert)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Niveau d'études minimum</Label>
            <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucun">Aucun diplôme requis</SelectItem>
                <SelectItem value="CEP">CEP / Primaire</SelectItem>
                <SelectItem value="BEPC">BEPC / Collège</SelectItem>
                <SelectItem value="Bac">Baccalauréat</SelectItem>
                <SelectItem value="BTS">BTS / DUT</SelectItem>
                <SelectItem value="Licence">Licence / Bachelor</SelectItem>
                <SelectItem value="Master">Master / Ingénieur</SelectItem>
                <SelectItem value="Doctorat">Doctorat / PhD</SelectItem>
                <SelectItem value="CAP">CAP / Formation professionnelle</SelectItem>
                <SelectItem value="Autre">Autre formation spécialisée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Langues requises</Label>
            <div className="flex gap-2">
              <Input
                placeholder="ex: Français, Anglais, Wolof..."
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
              />
              <Button type="button" onClick={addLanguage} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.languages.map((language) => (
                <Badge key={language} variant="secondary" className="gap-1">
                  {language}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeLanguage(language)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Compétences requises</Label>
            <div className="flex gap-2">
              <Input
                placeholder="ex: Maçonnerie, Excel, Conduite, Couture..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preselection" className="space-y-4 mt-4">
          <div>
            <h3 className="mb-2">Questions de présélection</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ajoutez des questions personnalisées pour filtrer automatiquement les candidatures
            </p>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label htmlFor="newQuestion">Question</Label>
              <Input
                id="newQuestion"
                placeholder="ex: Avez-vous un permis de conduire ?"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="questionType">Type de réponse</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value: "text" | "choice" | "yesno") =>
                    setNewQuestion({ ...newQuestion, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texte libre</SelectItem>
                    <SelectItem value="choice">Choix multiple</SelectItem>
                    <SelectItem value="yesno">Oui / Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="questionRequired"
                  checked={newQuestion.required}
                  onCheckedChange={(checked) =>
                    setNewQuestion({ ...newQuestion, required: checked })
                  }
                />
                <Label htmlFor="questionRequired" className="cursor-pointer">
                  Question obligatoire
                </Label>
              </div>
            </div>

            {newQuestion.type === "choice" && (
              <div className="space-y-2">
                <Label>Options de réponse</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateQuestionOption(index, e.target.value)}
                    />
                    {newQuestion.options.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestionOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addQuestionOption}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une option
                </Button>
              </div>
            )}

            <Button type="button" onClick={addQuestion} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter cette question
            </Button>
          </div>

          {formData.preselectionQuestions.length > 0 && (
            <div className="space-y-2">
              <Label>Questions ajoutées ({formData.preselectionQuestions.length})</Label>
              <div className="space-y-2">
                {formData.preselectionQuestions.map((question) => (
                  <div key={question.id} className="p-3 border rounded-lg flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {question.type === "text"
                            ? "Texte"
                            : question.type === "choice"
                            ? "Choix multiple"
                            : "Oui/Non"}
                        </Badge>
                        {question.required && (
                          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                            Obligatoire
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="publication" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="publishNow"
                checked={formData.publishNow}
                onCheckedChange={(checked) => setFormData({ ...formData, publishNow: checked })}
              />
              <Label htmlFor="publishNow" className="cursor-pointer">
                Publier immédiatement
              </Label>
            </div>

            {!formData.publishNow && (
              <div className="space-y-2">
                <Label>Date de publication programmée</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.publishDate
                        ? formData.publishDate.toLocaleDateString("fr-FR")
                        : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.publishDate}
                      onSelect={(date) => setFormData({ ...formData, publishDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium mb-2">Visibilité de votre offre</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p>Publication sur le Job Board Irelis</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p>Envoi aux candidats correspondants de la CVthèque</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p>Partage automatique sur les réseaux sociaux partenaires</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p>Notification à votre réseau de la diaspora africaine</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium mb-2 text-red-900 flex items-center gap-2">
                <span>🛡️</span> Protection anti-arnaque automatique
              </h4>
              <p className="text-sm text-red-800">
                Votre offre inclura automatiquement un avertissement rappelant aux candidats qu'Irelis ne demande jamais d'argent pour un recrutement. Cela protège vos candidats et renforce votre crédibilité.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Annuler
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          {formData.publishNow ? "Publier l'offre" : "Programmer la publication"}
        </Button>
      </div>
    </div>
  );
}
