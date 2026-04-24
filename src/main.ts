import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

// Variables pour la fonction greet
let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

// UN SEUL écouteur pour tout le chargement du DOM
window.addEventListener("DOMContentLoaded", () => {
  
  // --- GESTION DE LA FENÊTRE ---
  
  // Bouton Quitter
  document.querySelector("#btn-quitter")?.addEventListener("click", () => {
    invoke("fermer_app");
  });

  // Barre de titre (Drag)
  const titlebar = document.querySelector(".titlebar");
  titlebar?.addEventListener("mousedown", (e) => {
    // Empêche les comportements par défaut du navigateur
    e.preventDefault(); 
    
    // On vérifie que c'est le clic gauche
    if ((e as MouseEvent).button === 0) {
      appWindow.startDragging();
    }
  });

  // --- GESTION DU FORMULAIRE GREET ---
  
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

});