# Sekoly-numerika Projet interne Techzara

## Techzara Sekoliko Convention et études

___

# *Convention entité*

**Préfixe tz_..._**

**tz_etablissement**

0- id

1- ets_nom

2- ets_adresse

3- ets_contact
___
*tz_prof*

0- id

1- id_matiere
____

**tz_etudiant**

0- id

1- etd_matricule

2- etd_nom

3- id_classe

____

**tz_matiere**

0- id

1- mat_nom

3- mat_coeff

2- id_classe

3- id_prof
____

**tz_salle**

0- id

1- salle_nom

2- salle_date_debut_occupation

3- salle_date_fin_occupation

4- salle_classe_occupe
___
**tz_note_etudiant**

0- id

1- id_etudiant

2- id_matiere

3- note_valeur

___

**tz_inscription**

0- id

1- ins_numero

2- id_classe

____
**tz_colage**

0- id

1- payement

2- id_etudiant

___
**tz_classe**

0- id

1- classe_numero
