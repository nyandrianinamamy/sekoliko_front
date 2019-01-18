
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

**Thanks for our team**
<table>
  
  </table>


<table>
    <tr>
        <td><img src="https://avatars3.githubusercontent.com/u/32259364?s=400&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars1.githubusercontent.com/u/35923219?s=400&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars1.githubusercontent.com/u/21168538?s=400&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars1.githubusercontent.com/u/30557565?s=460&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars2.githubusercontent.com/u/13257963?s=400&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars2.githubusercontent.com/u/45004342?s=460&v=4" style="float: left" width="50" height="50" title="hover text"></td>
        <td><img src="https://avatars1.githubusercontent.com/u/44327690?s=460&v=4" style="float: left" width="50" height="50" title="hover text"></td>
    </tr>
</table>

# Techzara sekoliko App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8 on october 2018.

## Initialisation Environnement de DEV

  git clone  https://github.com/julkwel/sekoliko_front.git

  cd sekoliko_front

  npm install

  ng serve --o
  
  
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Production Test server

Run `ng build --prod` for a production application with Service Worker. 
Run `http-server dist/techzara-sekoliko-app` for a production server.
Navigate to `http://localhost:8080/`. 

## Methode Post et Get

Service dataService
url: urlList
ex: this.dataService.post(url).subscribe()

## Menu de navigation

ajouter dans MenuItem.ts

## Color chart graphique 

indigo => #aa66cc

Bleu => #1976d2

Grey => #e9ebee

Thanks
