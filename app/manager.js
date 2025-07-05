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

})