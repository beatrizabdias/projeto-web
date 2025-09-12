// Isso daqui espera carregar o conteúdo do html
document.addEventListener('DOMContentLoaded', () =>{
        const themeToggleButton = document.getElementById('theme-toggle') 
        const themeIcon = document.getElementById('theme-icon') 
        const body = document.body 

        const saveTheme = (theme) =>{ 
            localStorage.setItem('theme', theme)
            updateThemeIcon(theme)
        }; 

        const updateThemeIcon = (theme) =>{
            if (theme === 'light-theme') {
                themeIcon.classList.remove('fa-sun')
                themeIcon.classList.add('fa-moon')
            } else{
                themeIcon.classList.remove('fa-moon')
                themeIcon.classList.add('fa-sun')
            }
        };

        const loadTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && savedTheme !== 'dark-theme'){ 
                body.classList.add(savedTheme)
                updateThemeIcon(savedTheme)
            } else{
                body.classList.remove('light-theme')
                updateThemeIcon('dark-theme')
            }
        };

        themeToggleButton.addEventListener('click', (event) =>{
            event.preventDefault()
            if (body.classList.contains('light-theme')){
                body.classList.remove('light-theme')
                saveTheme('dark-theme')
            } else{
                body.classList.add('light-theme')
                saveTheme('light-theme')
            }
        });

        loadTheme()
    });