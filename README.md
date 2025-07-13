# OracleTasks

Repo-ul are in radacina 2 foldere, unul pentru primul task si un folder pentru task urile 2 si 3.

Pentru rularea microserviciului pasii sunt:
- cd microservice
- npm install
- npm run start

Acum sunt expuse endpoint-urile pe localhost:3000. Cele simple de CRUD:
GET: /projects - aduce datele despre toate proiectele

GET: /projects/:id - aduce datele despre proiectul cu id dat ca parametru

POST: /projects - creeaza un proiect nou cu date date in body 

PUT: /projects/:id - modifica datele unui proiect 

DELETE: /projects/:id - sterge proiectul din baza de date 


Pentru sarcinile de algoritmi este destul de simplu, sunt doua fisiere python cu algoritmul ce rezolva problemele din sarcini. La fel am si niste exemple dupa sa ma asigur ca algoritmii aduc rezultatul corect.
La sarcina 2, algoritmul intoarce si numarul de subsiruri, impreuna cu lista de subsiruri.
