//FUNZIONE PER CREARE I BLOCCHI SERVIZIO 
function creaServizio(sezione, elemento, indice){
    const service = document.createElement("div");
    service.classList.add("service");
    service.dataset.indice = indice;

    const newdiv = document.createElement("div");
    newdiv.classList.add("f_div");
    const immagine = document.createElement("img");
    immagine.src = elemento.immagine;
    immagine.classList.add("image");
    const nome = document.createElement("h2");
    nome.textContent = elemento.nome;
    const descrizione = document.createElement("p");
    descrizione.textContent = elemento.descrizione;
    descrizione.classList.add("description");
    descrizione.classList.add("hidden");
    
    newdiv.appendChild(nome);
    service.appendChild(immagine);

    const tasto_info = document.createElement("button");
    tasto_info.classList.add("tasto");
    newdiv.appendChild(tasto_info);
    tasto_info.textContent = "Mostra più dettagli";
    tasto_info.addEventListener('click', mostraTesto);
    
    const prenota = document.createElement("button");
    prenota.classList.add("prenota");
    newdiv.appendChild(prenota);
    prenota.textContent = "Prenota il servizio";
    prenota.addEventListener('click', aggiungiPrenotazione);
    
    newdiv.appendChild(descrizione);
    service.appendChild(newdiv);
    sezione.appendChild(service);   
}

//FUNZIONE PER MOSTRARE IL TESTO QUANDO SI RICHIEDONO PIU' DETTAGLI
function mostraTesto(event){
    const div_0 = event.target.parentNode;
    const descr = div_0.getElementsByTagName("p")[0];
    const b = div_0.getElementsByTagName("button")[0];
    descr.classList.remove("hidden");
    cambia_testo_bottone = !cambia_testo_bottone;
    if (cambia_testo_bottone) {
        b.textContent = 'Nascondi dettagli';        
    } else {
        b.textContent = 'Mostra più dettagli';
        descr.classList.add("hidden");
    }
}

//FUNZIONE PER PRENOTARE UN SERVIZIO
function aggiungiPrenotazione(event){
    //seleziono il blocco di informazioni
    const blocco = event.currentTarget.parentNode.parentNode;

    const div_1 = document.querySelector("#prenotazioni #case");
    const intestazione = div_1.querySelector("h1");
    intestazione.classList.add("intestazione");
    intestazione.classList.remove("hidden");

    const new_div_1 = document.createElement('div');
    new_div_1.classList.add("nuovo_div_1");
    const div_prenota = document.createElement('div');
    div_prenota.classList.add("div_prenota");
    const new_nome = document.createElement('h2');
    const new_img = document.createElement('img');
    new_img.classList.add("img_prenotazione");
     
    new_nome.textContent = blocco.querySelector('h2').textContent;
    new_img.src = blocco.querySelector('img').src;

    const boxes = document.querySelectorAll("#prenotazioni #case div");   

    let esiste = "false";
    for (const box of boxes){
        if(box.dataset.indice == blocco.dataset.indice) {
                esiste = "true";
        }
    }

    if (esiste == "false") {
        div_1.appendChild(new_div_1); 
             
        div_prenota.appendChild(new_nome);
        div_prenota.appendChild(new_img);
        new_div_1.appendChild(div_prenota);

        const bottone_rimuovi = document.createElement("button");
        bottone_rimuovi.classList.add("rimuovi");
        bottone_rimuovi.textContent = "Cancella prenotazione";
        bottone_rimuovi.addEventListener('click', rimuoviprenotazione);
        div_prenota.appendChild(bottone_rimuovi);

        new_div_1.dataset.indice = blocco.dataset.indice;
    }     
}

//FUNZIONE PER RIMUOVERE UNA PRENOTAZIONE
function rimuoviprenotazione(event){
    const blocco = event.currentTarget.parentNode.parentNode;
    blocco.dataset.indice = 0;
    blocco.innerHTML="";
}

//BARRA DI RICERCA
function ricercaTesto(){
    const barra_di_ricerca = document.querySelector("#myInput");
    const testo = barra_di_ricerca.value.toLowerCase();
    const sezione_ricerca = document.querySelector(".case").querySelectorAll(".service");    
    for (let elemento of sezione_ricerca){
        if(elemento.querySelector("h2").textContent.toLowerCase().includes(testo)){
            elemento.classList.remove("hidden");
    }
    else {
        elemento.classList.add("hidden");
    }
}
}

//CREAZIONE ELEMENTI 
let cambia_testo_bottone = false;
let indice = null;
let i=0;
for(let elemento of servizio){
    i++;
    let sezione = undefined;
    sezione = document.querySelector("div.case");
    creaServizio(sezione, elemento, i);
}
