import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  Star,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback } from "./ui/avatar";
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

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  status: "new" | "reviewed" | "interview" | "offer" | "rejected";
  experience: string;
  location: string;
  appliedDate: string;
  rating: number;
  salary: string;
}

const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "Aminata Ndiaye",
    email: "aminata.ndiaye@email.com",
    phone: "+237 6 91 23 45 67",
    jobTitle: "Développeur Full Stack Senior",
    status: "interview",
    experience: "5 ans",
    location: "Douala",
    appliedDate: "2024-10-28",
    rating: 5,
    salary: "3.5M FCFA",
  },
  {
    id: "2",
    name: "Jean-Paul Mbarga",
    email: "jp.mbarga@email.com",
    phone: "+237 6 77 88 99 00",
    jobTitle: "Développeur Full Stack Senior",
    status: "new",
    experience: "3 ans",
    location: "Yaoundé",
    appliedDate: "2024-10-30",
    rating: 0,
    salary: "2.8M FCFA",
  },
  {
    id: "3",
    name: "Grace Tchamba",
    email: "grace.tchamba@email.com",
    phone: "+237 6 55 44 33 22",
    jobTitle: "Chef de Projet Digital",
    status: "reviewed",
    experience: "7 ans",
    location: "Douala",
    appliedDate: "2024-10-25",
    rating: 4,
    salary: "4.2M FCFA",
  },
  {
    id: "4",
    name: "Kofi Mensah",
    email: "k.mensah@email.com",
    phone: "+233 24 567 8901",
    jobTitle: "UX/UI Designer",
    status: "offer",
    experience: "4 ans",
    location: "Accra",
    appliedDate: "2024-10-20",
    rating: 5,
    salary: "250K FCFA/j",
  },
  {
    id: "5",
    name: "Fatoumata Bâ",
    email: "fatoumata.ba@email.com",
    phone: "+221 77 123 45 67",
    jobTitle: "Data Analyst",
    status: "rejected",
    experience: "2 ans",
    location: "Dakar",
    appliedDate: "2024-10-29",
    rating: 2,
    salary: "2.1M FCFA",
  },
  {
    id: "6",
    name: "Ibrahim Diallo",
    email: "ibrahim.diallo@email.com",
    phone: "+237 6 99 88 77 66",
    jobTitle: "Chef de Projet Digital",
    status: "new",
    experience: "6 ans",
    location: "Yaoundé",
    appliedDate: "2024-10-31",
    rating: 0,
    salary: "3.8M FCFA",
  },
];

type SortField = "name" | "appliedDate" | "rating";
type SortOrder = "asc" | "desc";

export function CandidatesTable() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedCandidates = () => {
    if (!sortField) return filteredCandidates;
    
    return [...filteredCandidates].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "appliedDate") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    const matchesJob = jobFilter === "all" || candidate.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const sortedCandidates = getSortedCandidates();

  const handleSelectAll = () => {
    if (selectedCandidates.length === sortedCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(sortedCandidates.map((candidate) => candidate.id));
    }
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const getStatusBadge = (status: Candidate["status"]) => {
    const variants = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      reviewed: "bg-purple-100 text-purple-800 border-purple-200",
      interview: "bg-yellow-100 text-yellow-800 border-yellow-200",
      offer: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    const labels = {
      new: "Nouveau",
      reviewed: "Examiné",
      interview: "Entretien",
      offer: "Offre",
      rejected: "Refusé",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const uniqueJobs = Array.from(new Set(candidates.map((c) => c.jobTitle)));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou poste..."
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
              <SelectItem value="new">Nouveau</SelectItem>
              <SelectItem value="reviewed">Examiné</SelectItem>
              <SelectItem value="interview">Entretien</SelectItem>
              <SelectItem value="offer">Offre</SelectItem>
              <SelectItem value="rejected">Refusé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-52">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les postes</SelectItem>
              {uniqueJobs.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
          <p>{selectedCandidates.length} candidat(s) sélectionné(s)</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Changer le statut
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Envoyer un email
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
                  checked={
                    selectedCandidates.length === sortedCandidates.length &&
                    sortedCandidates.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-2">
                  Candidat
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Expérience</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("appliedDate")}>
                <div className="flex items-center gap-2">
                  Date de candidature
                  <SortIcon field="appliedDate" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                <div className="flex items-center gap-2">
                  Note
                  <SortIcon field="rating" />
                </div>
              </TableHead>
              <TableHead>Salaire souhaité</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate) => (
              <TableRow key={candidate.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedCandidates.includes(candidate.id)}
                    onCheckedChange={() => handleSelectCandidate(candidate.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>
                  {new Date(candidate.appliedDate).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {candidate.rating > 0 ? (
                      <>
                        {Array.from({ length: candidate.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </>
                    ) : (
                      <span className="text-muted-foreground text-sm">Non noté</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{candidate.salary}</TableCell>
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
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer un email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Planifier entretien
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {sortedCandidates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucun candidat trouvé
        </div>
      )}
    </div>
  );
}
