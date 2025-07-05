const darkMode = document.querySelector('.header__nav-dark-icon');

const ligthTheme = () => {
    document.body.classList.remove('dark');
}
const darkTheme = () => {
    document.body.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    darkMode.addEventListener('click', () => {
        if (document.body.classList.contains('dark')){
            ligthTheme();
        } else {
            darkTheme();
        }
    });

    // TODO: Ir a la aplicacion
    const goToApp = document.querySelector('.app');
    goToApp.addEventListener('click', () => {
        location.href = '/public/app.html'
    })
})