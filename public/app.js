document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS COMUNES ---
    const app_back = document.querySelector('.app__back');

    // --- ELEMENTOS DE LA PÁGINA DE CÁLCULO ---
    const container_calculo_cards = document.getElementById('app__calculo-cards');
    const app_limites = document.getElementById('app__limites-container');
    const app_derivadas = document.getElementById('app__derivadas-container');
    const app_integralesD = document.getElementById('app__integrales-definidas-container');
    const app_integralesI = document.getElementById('app__integrales-indefinidas-container');

    // --- ELEMENTOS DE LA PÁGINA DE MATRICES ---
    const container_matrices_cards = document.getElementById('app__matrices-cards');
    const app_calculadora = document.getElementById('app__calculadora-matrices-container');
    const app_determinantes = document.getElementById('app__determinantes-container');
    const app_inversa = document.getElementById('app__inversa-container');
    const app_iterativos = document.getElementById('app__metodos-iterativos-container');

    // --- FUNCIÓN PARA VOLVER AL MENÚ PRINCIPAL ---
    const app_return = () => {
        // Oculta el botón de regreso
        app_back.classList.add('app__hidden');

        // Muestra el menú de tarjetas correspondiente y oculta las secciones
        if (container_calculo_cards) {
            container_calculo_cards.classList.remove('app__hidden');
            app_limites.classList.add('app__hidden');
            app_derivadas.classList.add('app__hidden');
            app_integralesD.classList.add('app__hidden');
            app_integralesI.classList.add('app__hidden');
        }

        if (container_matrices_cards) {
            container_matrices_cards.classList.remove('app__hidden');
            app_calculadora.classList.add('app__hidden');
            app_determinantes.classList.add('app__hidden');
            app_inversa.classList.add('app__hidden');
            app_iterativos.classList.add('app__hidden');
        }
    };

    // --- FUNCIONES DE NAVEGACIÓN ---
    const showSection = (cardContainer, sectionToShow) => {
        if (cardContainer) {
            cardContainer.classList.add('app__hidden');
        }
        if (sectionToShow) {
            sectionToShow.classList.remove('app__hidden');
        }
        app_back.classList.remove('app__hidden');
    };

    // --- ASIGNACIÓN DE EVENTOS ---

    // Asigna el evento al botón de regreso (siempre existe)
    if (app_back) {
        app_back.addEventListener('click', app_return);
    }

    // VERIFICA SI ESTAMOS EN LA PÁGINA DE CÁLCULO Y ASIGNA SUS EVENTOS
    if (container_calculo_cards) {
        container_calculo_cards.querySelector('[data-target="limites"]').addEventListener('click', () => showSection(container_calculo_cards, app_limites));
        container_calculo_cards.querySelector('[data-target="derivadas"]').addEventListener('click', () => showSection(container_calculo_cards, app_derivadas));
        container_calculo_cards.querySelector('[data-target="integrales-definidas"]').addEventListener('click', () => showSection(container_calculo_cards, app_integralesD));
        container_calculo_cards.querySelector('[data-target="integrales-indefinidas"]').addEventListener('click', () => showSection(container_calculo_cards, app_integralesI));
    }

    // VERIFICA SI ESTAMOS EN LA PÁGINA DE MATRICES Y ASIGNA SUS EVENTOS
    if (container_matrices_cards) {
        container_matrices_cards.querySelector('[data-target="calculadora-matrices"]').addEventListener('click', () => showSection(container_matrices_cards, app_calculadora));
        container_matrices_cards.querySelector('[data-target="determinantes"]').addEventListener('click', () => showSection(container_matrices_cards, app_determinantes));
        container_matrices_cards.querySelector('[data-target="inversa"]').addEventListener('click', () => showSection(container_matrices_cards, app_inversa));
        container_matrices_cards.querySelector('[data-target="metodos-iterativos"]').addEventListener('click', () => showSection(container_matrices_cards, app_iterativos));
    }
});