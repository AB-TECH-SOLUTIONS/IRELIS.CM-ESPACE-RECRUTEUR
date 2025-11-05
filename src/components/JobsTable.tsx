import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";

interface Job {
  id: string;
  title: string;
  status: "active" | "draft" | "closed" | "pending";
  location: string;
  type: string;
  candidates: number;
  views: number;
  posted: string;
  salary: string;
}

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Développeur Full Stack Senior",
    status: "active",
    location: "Douala",
    type: "CDI",
    candidates: 23,
    views: 456,
    posted: "2024-10-15",
    salary: "3-4M FCFA",
  },
  {
    id: "2",
    title: "Maçon Chef d'Équipe",
    status: "active",
    location: "Yaoundé",
    type: "CDI",
    candidates: 34,
    views: 512,
    posted: "2024-10-18",
    salary: "400-500K FCFA",
  },
  {
    id: "3",
    title: "Infirmier(ère) Diplômé(e)",
    status: "active",
    location: "Douala",
    type: "CDI",
    candidates: 18,
    views: 298,
    posted: "2024-10-22",
    salary: "450-550K FCFA",
  },
  {
    id: "4",
    title: "Chef Cuisinier Restaurant",
    status: "active",
    location: "Yaoundé",
    type: "CDI",
    candidates: 27,
    views: 387,
    posted: "2024-10-20",
    salary: "500-650K FCFA",
  },
  {
    id: "5",
    title: "Coordinateur Projet ONG",
    status: "active",
    location: "Garoua",
    type: "CDD",
    candidates: 15,
    views: 234,
    posted: "2024-10-25",
    salary: "1.5-2M FCFA",
  },
  {
    id: "6",
    title: "Agronome Spécialiste Maraîchage",
    status: "pending",
    location: "Bafoussam",
    type: "CDI",
    candidates: 9,
    views: 156,
    posted: "2024-10-28",
    salary: "700-900K FCFA",
  },
  {
    id: "7",
    title: "Vendeur(se) Boutique Mode",
    status: "active",
    location: "Douala",
    type: "CDI",
    candidates: 42,
    views: 623,
    posted: "2024-10-12",
    salary: "250-350K FCFA + commission",
  },
  {
    id: "8",
    title: "Enseignant(e) Primaire",
    status: "active",
    location: "Yaoundé",
    type: "CDI",
    candidates: 31,
    views: 445,
    posted: "2024-10-10",
    salary: "320-420K FCFA",
  },
  {
    id: "9",
    title: "Chauffeur Poids Lourd",
    status: "active",
    location: "Douala",
    type: "CDI",
    candidates: 28,
    views: 389,
    posted: "2024-10-16",
    salary: "350-450K FCFA",
  },
  {
    id: "10",
    title: "Couturière Professionnelle",
    status: "active",
    location: "Yaoundé",
    type: "Freelance",
    candidates: 19,
    views: 267,
    posted: "2024-10-24",
    salary: "15-25K FCFA/jour",
  },
  {
    id: "11",
    title: "UX/UI Designer",
    status: "active",
    location: "Télétravail",
    type: "Freelance",
    candidates: 31,
    views: 589,
    posted: "2024-10-10",
    salary: "200-300K FCFA/j",
  },
  {
    id: "12",
    title: "Assistant RH (Retour Diaspora)",
    status: "draft",
    location: "Libreville",
    type: "CDI",
    candidates: 0,
    views: 0,
    posted: "2024-11-01",
    salary: "800K-1.2M FCFA",
  },
  {
    id: "13",
    title: "Mécanicien Auto Expérimenté",
    status: "active",
    location: "Douala",
    type: "CDI",
    candidates: 22,
    views: 342,
    posted: "2024-10-19",
    salary: "380-480K FCFA",
  },
  {
    id: "14",
    title: "Responsable Marketing Digital",
    status: "closed",
    location: "Yaoundé",
    type: "CDI",
    candidates: 45,
    views: 721,
    posted: "2024-09-15",
    salary: "2.3-3M FCFA",
  },
];

type SortField = "title" | "candidates" | "views" | "posted";
type SortOrder = "asc" | "desc";

export function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    type: "CDI",
    salary: "",
    description: "",
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedJobs = () => {
    if (!sortField) return filteredJobs;
    
    return [...filteredJobs].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "posted") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedJobs = getSortedJobs();

  const handleSelectAll = () => {
    if (selectedJobs.length === sortedJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(sortedJobs.map((job) => job.id));
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleDeleteSelected = () => {
    setJobs((prev) => prev.filter((job) => !selectedJobs.includes(job.id)));
    setSelectedJobs([]);
  };

  const handleCreateJob = () => {
    const job: Job = {
      id: (jobs.length + 1).toString(),
      title: newJob.title,
      status: "draft",
      location: newJob.location,
      type: newJob.type,
      candidates: 0,
      views: 0,
      posted: new Date().toISOString().split("T")[0],
      salary: newJob.salary,
    };
    setJobs([...jobs, job]);
    setIsCreateDialogOpen(false);
    setNewJob({ title: "", location: "", type: "CDI", salary: "", description: "" });
  };

  const getStatusBadge = (status: Job["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      closed: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    const labels = {
      active: "Active",
      draft: "Brouillon",
      closed: "Fermée",
      pending: "En attente",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Alerte Anti-Arnaque */}
      <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-green-900">
            <span className="font-semibold">Protection anti-arnaque activée : </span>
            Toutes vos offres d'emploi incluent automatiquement un message de sécurité rappelant qu'aucun frais n'est jamais demandé.
          </p>
        </AlertDescription>
      </Alert>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre ou localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="closed">Fermée</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle offre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle offre d'emploi</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du poste *</Label>
                  <Input
                    id="title"
                    placeholder="ex: Développeur Full Stack"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      placeholder="ex: Paris"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de contrat *</Label>
                    <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Stage">Stage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire</Label>
                  <Input
                    id="salary"
                    placeholder="ex: 45-55K€"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description du poste</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez les missions, compétences requises..."
                    rows={6}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateJob} disabled={!newJob.title || !newJob.location}>
                  Créer l'offre
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
          <p>{selectedJobs.length} offre(s) sélectionnée(s)</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Modifier le statut
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedJobs.length === sortedJobs.length && sortedJobs.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center gap-2">
                  Titre du poste
                  <SortIcon field="title" />
                </div>
              </TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("candidates")}>
                <div className="flex items-center justify-end gap-2">
                  Candidatures
                  <SortIcon field="candidates" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("views")}>
                <div className="flex items-center justify-end gap-2">
                  Vues
                  <SortIcon field="views" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("posted")}>
                <div className="flex items-center gap-2">
                  Date de publication
                  <SortIcon field="posted" />
                </div>
              </TableHead>
              <TableHead>Salaire</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => handleSelectJob(job.id)}
                  />
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <Badge variant="outline">{job.type}</Badge>
                </TableCell>
                <TableCell className="text-right">{job.candidates}</TableCell>
                <TableCell className="text-right">{job.views}</TableCell>
                <TableCell>{new Date(job.posted).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir l'offre
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {sortedJobs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucune offre trouvée
        </div>
      )}
    </div>
  );
}
