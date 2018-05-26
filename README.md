Projet AWS Calendar 
========================================
LIU BIN & LI HONGYU

## Page d'acceuil
![xgcalendar screenshot1](img/calendar1.jpg) 
 Dans la page principle, le planning de la semaine courante apparaît sous la forme d’une grande table, avec une colonne par jour. Et découper chaque jour en 48 cases d’une demie heure chacune. La hauteur des cases est fixe. Des boutons permettent de naviguer dans les semaines. Aujourd'hui marque par la couleur orange.
## Page Login
![xgcalendar screenshot2](img/login.jpg) 
## Page Regist
![xgcalendar screenshot2](img/regist.jpg) 

## Page d'acceuil après login
![xgcalendar screenshot2](img/calendar2.jpg)  

## Ajouter des événements
![xgcalendar screenshot2](img/event1.jpg)
Uniquement les utilisateurs connectés ont droit de modifier le calendrier.
## Afficher l'événement
![xgcalendar screenshot2](img/event2.jpg)
Les événements sont représentés avec la couleur gris pour montrer les plages horaires occupées. Quand mouseover les plages horaires occupées, il afficher le contenu de cet événement dans le gauche. Et le jour de calendrier qui est marqué par la couleur vert. 

## Fonctionnement 
  * Suposser un utilisateur ajoute des événement avec une date, une heure de début et une heure de fin 
  * Suposser de supprimer l'événement
  * L'utilisateur confirme
  * Mettre à jour la base de données
  * L'affichage l'événement d'utilisateur en cas de connecter avec succès
  * Demander confirmation avant de supprimer
  * Utiliser par mobile
  
 ## Techniques utilisés
 * CSS
 * JavaScript
 * JSON
 * Ajax

