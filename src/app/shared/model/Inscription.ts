import {User} from './User';
import {Classe} from './Classe';
import {AnneeScolaire} from './AnneeScolaire';

export class Inscription {
  NumInscription: number;
  user_id : User;
  id_classe: Classe;
  id_annee_scolaire: AnneeScolaire;
  date_inscription: Date;
  statut: string;
}
