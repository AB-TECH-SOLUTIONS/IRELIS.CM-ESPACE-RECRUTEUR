import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AntiScamWarning() {
  return (
    <Alert className="bg-gradient-to-r from-red-50 to-orange-50 border-red-400 border-2">
      <ShieldAlert className="h-5 w-5 text-red-600" />
      <AlertDescription className="ml-2">
        <div className="space-y-2">
          <p className="font-semibold text-red-900">
            ⚠️ ATTENTION - MESSAGE IMPORTANT DE SÉCURITÉ
          </p>
          <p className="text-sm text-red-800">
            <span className="font-semibold">Irelis et ses partenaires ne demandent JAMAIS d'argent pour un recrutement.</span>
            {" "}Aucun frais de dossier, frais de formation, caution ou autre paiement n'est requis à aucune étape du processus de recrutement.
          </p>
          <p className="text-sm text-red-800">
            Si quelqu'un vous demande de payer quoi que ce soit en rapport avec cette offre d'emploi, 
            <span className="font-semibold"> c'est une ARNAQUE</span>. Signalez-le immédiatement à{" "}
            <a 
              href="mailto:recrutement@ireliscameroun.com" 
              className="underline font-semibold hover:text-red-950"
            >
              recrutement@ireliscameroun.com
            </a>
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
