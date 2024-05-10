
// CONSTANTES
// NE PAS TOUCHER !!!
let nb_click_td;

const nb_points = new Map([
	[6, 10000],
	[7, 36],
	[8, 720],
	[9, 360],
	[10, 80],
	[11, 252],
	[12, 108],
	[13, 72],
	[14, 54],
	[15, 180],
	[16, 72],
	[17, 180],
	[18, 119],
	[19, 36],
	[20, 306],
	[21, 1080],
	[22, 144],
	[23, 1800],
	[24, 3600],
]);

// fonctions fournies
// NE PAS MODIFIER !!!!

function afficher_nb_points() {
	let str = "<ul>";
	nb_points.forEach((key, value) => {
		str += `<li>${value}: ${key}\n</li>`;
	});

	document.getElementById("nb-points").innerHTML = str + "</ul>";
}


function valeurs_tableau() {
	let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let resultat = [];

	for (let i=0; i < 9; i++) {
		let nb_alea = Math.ceil(Math.random() * (tab.length - 1));
		resultat.push(tab.splice(nb_alea, 1));
	}

	return resultat;
}


function x_cases_hasard(x) {
	let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let resultat = [];

	for (let i=0; i < x; i++) {
		let nb_alea = Math.ceil(Math.random() * (tab.length - 1));
		resultat.push(tab.splice(nb_alea, 1) - 1);
	}

	return resultat;
}


function init_page() {
	nb_click_td = 0;
	let tab = valeurs_tableau();

	document.getElementById("coups-restants").innerHTML = "Nombre de coups restants : 3";
	afficher_nb_points();

	remplir_table(tab);

	Array.from(document.getElementsByTagName("th")).forEach((element) => {
		element.addEventListener("click", th_click_event);
	});

	cacher_afficher_cases(x_cases_hasard(1));

	let bouton_rejouer = document.getElementById("bouton-rejouer");

	bouton_rejouer.addEventListener("click", click_bouton_rejouer);
}



/* FONCTIONS A REMPLIR */

// QUESTION 1
function remplir_table(tab) {
	let tds = document.getElementsByTagName("td");

	for (let i=0; i < tds.length; i++) {
		tds[i].innerHTML = tab[i];

		// on met le fond en blanc ici pour si on a déjà joué avant
		// et que donc il y 3 cases dont le fond a changé
		tds[i].style.backgroundColor = "white";
	}
}


// QUESTION 3
function ids_correspondants(id) {
	let resultat = [];

	if (id == "d1") {
		return ["11", "22", "33"];
	} else if (id == "d2") {
		return ["13", "22", "31"];
	} else {
		for (let i=1; i <= 3; i++) {
			if (id[0] == "l") {
				resultat.push(id[1] + i);
			} else if (id[0] == "c") {
				resultat.push(i + id[1]);
			}
		}
	}

	return resultat;
}


// QUESTION 4
function somme_cases(id_cases) {
	let somme = 0;

	for (let i=0; i < id_cases.length; i++) {
		let td = document.getElementById(id_cases[i]);
		somme += parseInt(td.innerHTML);
	}	

	return somme;
}


// QUESTION 5
function afficher_cases(id_cases) {
	for (let i=0; i < id_cases.length; i++) {
		let td = document.getElementById(id_cases[i]);
		td.style.backgroundColor = "grey";
		td.style.color = "black";
	}
}


// QUESTION 6
function th_click_event(event) {
	let liste_cases = ids_correspondants(event.currentTarget.id);
	
	afficher_cases(liste_cases);
	let somme = somme_cases(liste_cases);

	finir_jeu(somme);
}


// QUESTION 7
function decrementer_coups_restants() {
	let str;

	if (nb_click_td < 3) {
		str = `Nombre de coups restants : ${3 - nb_click_td}`;
	} else {
		str = "Plus de coups restants. Cliquez sur une flèche.";
	}

	document.getElementById("coups-restants").innerHTML = str;
}


// QUESTION 8
function cacher_afficher_cases(cases_affichees) {
	let tds = document.getElementsByTagName("td");

	for (let i=0; i < tds.length; i++) {
		if (! cases_affichees.includes(i)) {
			tds[i].style.color = "white";

			tds[i].addEventListener("click", afficher_td);
		} 
	}
}


// QUESTION 9
function afficher_td(event) {
	let td = event.currentTarget;

	td.style.color = "black";

	nb_click_td++;
	decrementer_coups_restants();

	if (nb_click_td > 2) {
		let tds = document.getElementsByTagName("td");
		for (let i=0; i < tds.length; i++) {
			tds[i].removeEventListener("click", afficher_td);
		}
	}
}


// QUESTION 10
function finir_jeu(somme) {
	let tds = document.getElementsByTagName("td");

	for (let i=0; i < tds.length; i++) {
		tds[i].style.color = "black";
	}

	let ths = document.getElementsByTagName("th");

	for (let i=0; i < ths.length; i++) {
		ths[i].removeEventListener("click", th_click_event);
	}

	Array.from(document.getElementsByClassName("cacher")).forEach((element) => {
		element.style.display = "block";
	});

	let resultat = document.getElementById("resultat");
	resultat.innerHTML = `La somme vaut ${somme}. Points gagnés : ${nb_points.get(somme)}`;
}


// QUESTION 11
function click_bouton_rejouer() {
	Array.from(document.getElementsByClassName("cacher")).forEach((element) => {
		element.style.display = "none";
	});

	init_page();
}









