// Usamos uma IIFE para não poluir o escopo global.
(function() {
    // ===============================================
    // ANIMAÇÃO AO ROLAR A PÁGINA (COM INTERSECTION OBSERVER)
    // ===============================================

    /**
     * Usa a API Intersection Observer para adicionar uma classe a elementos
     * quando eles entram na área visível da tela. É muito mais performático
     * que um event listener de 'scroll'.
     */
    const setupFadeInAnimation = () => {
        const sections = document.querySelectorAll('.fade-in');

        const observerOptions = {
            root: null, // Observa em relação à viewport
            rootMargin: '0px',
            threshold: 0.1 // Ativa quando 10% do elemento está visível
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: para de observar o elemento depois que ele já apareceu
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    // ============================
    // SLIDER DE SERVIÇOS/PROJETOS
    // ============================

    const setupSlider = () => {
        let currentProject = 0;
        const projects = document.querySelectorAll('.project');
        const nextButton = document.querySelector('#next');
        const prevButton = document.querySelector('#prev');
        
        // Se não houver elementos do slider na página, não faz nada.
        if (projects.length === 0 || !nextButton || !prevButton) {
            return;
        }

        /**
         * Exibe o projeto correspondente ao índice fornecido.
         * @param {number} index - Índice do projeto a ser exibido
         */
        const showProject = (index) => {
            projects.forEach((project, i) => {
                project.classList.toggle('active', i === index);
            });
        };

        // Evento do botão "Próximo"
        nextButton.addEventListener('click', () => {
            currentProject = (currentProject + 1) % projects.length;
            showProject(currentProject);
        });

        // Evento do botão "Anterior"
        prevButton.addEventListener('click', () => {
            currentProject = (currentProject - 1 + projects.length) % projects.length;
            showProject(currentProject);
        });

        // Exibe o primeiro projeto ao carregar a página
        showProject(currentProject);
    };

    // Roda as funções quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        setupFadeInAnimation();
        setupSlider();
    });

})();