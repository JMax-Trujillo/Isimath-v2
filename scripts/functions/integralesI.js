document.addEventListener('DOMContentLoaded', () => {
            // Referencias a elementos del DOM con los nuevos IDs
            const integralesI__functionInput = document.getElementById('integralesI__function-input');
            const integralesI__solveBtn = document.getElementById('integralesI__solve-btn');
            const integralesI__resultDiv = document.getElementById('integralesI__result');
            const integralesI__functionGraphCanvas = document.getElementById('integralesI__function-graph');
            const integralesI__ctx = integralesI__functionGraphCanvas.getContext('2d');

            const integralesI__functionError = document.getElementById('integralesI__function-error');

            // Configuración inicial del canvas
            let integralesI__scaleX = 50; // Píxeles por unidad en el eje X
            let integralesI__scaleY = 50; // Píxeles por unidad en el eje Y
            let integralesI__originX = integralesI__functionGraphCanvas.width / 2;
            let integralesI__originY = integralesI__functionGraphCanvas.height / 2;

            // Función para limpiar el canvas
            const integralesI__clearCanvas = () => {
                integralesI__ctx.clearRect(0, 0, integralesI__functionGraphCanvas.width, integralesI__functionGraphCanvas.height);
                integralesI__drawAxes();
            };

            // Función para dibujar los ejes
            const integralesI__drawAxes = () => {
                integralesI__ctx.beginPath();
                // Obtener el color de la variable CSS para el modo claro/oscuro
                integralesI__ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-text-muted-light');
                if (document.body.classList.contains('dark')) {
                    integralesI__ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-text-muted-dark');
                }
                integralesI__ctx.lineWidth = 1;

                // Eje X
                integralesI__ctx.moveTo(0, integralesI__originY);
                integralesI__ctx.lineTo(integralesI__functionGraphCanvas.width, integralesI__originY);
                // Eje Y
                integralesI__ctx.moveTo(integralesI__originX, 0);
                integralesI__ctx.lineTo(integralesI__originX, integralesI__functionGraphCanvas.height);
                integralesI__ctx.stroke();

                // Dibujar marcas en los ejes
                integralesI__ctx.font = '10px Arial';
                integralesI__ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-text-light');
                if (document.body.classList.contains('dark')) {
                    integralesI__ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-text-dark');
                }
                integralesI__ctx.textAlign = 'center';
                integralesI__ctx.textBaseline = 'top';

                // Marcas en X
                for (let i = -Math.floor(integralesI__originX / integralesI__scaleX); i * integralesI__scaleX < integralesI__functionGraphCanvas.width - integralesI__originX; i++) {
                    if (i === 0) continue;
                    integralesI__ctx.fillText(i, integralesI__originX + i * integralesI__scaleX, integralesI__originY + 5);
                    integralesI__ctx.beginPath();
                    integralesI__ctx.moveTo(integralesI__originX + i * integralesI__scaleX, integralesI__originY - 3);
                    integralesI__ctx.lineTo(integralesI__originX + i * integralesI__scaleX, integralesI__originY + 3);
                    integralesI__ctx.stroke();
                }

                integralesI__ctx.textAlign = 'right';
                integralesI__ctx.textBaseline = 'middle';
                // Marcas en Y
                for (let i = -Math.floor(integralesI__originY / integralesI__scaleY); i * integralesI__scaleY < integralesI__functionGraphCanvas.height - integralesI__originY; i++) {
                    if (i === 0) continue;
                    integralesI__ctx.fillText(-i, integralesI__originX - 5, integralesI__originY + i * integralesI__scaleY);
                    integralesI__ctx.beginPath();
                    integralesI__ctx.moveTo(integralesI__originX - 3, integralesI__originY + i * integralesI__scaleY);
                    integralesI__ctx.lineTo(integralesI__originX + 3, integralesI__originY + i * integralesI__scaleY);
                    integralesI__ctx.stroke();
                }
            };

            // Ajustar el tamaño del canvas al contenedor
            const integralesI__resizeCanvas = () => {
                const integralesI__container = integralesI__functionGraphCanvas.parentElement;
                integralesI__functionGraphCanvas.width = integralesI__container.clientWidth - 30; // Ajustar por padding
                integralesI__functionGraphCanvas.height = 300; // Mantener altura fija
                integralesI__originX = integralesI__functionGraphCanvas.width / 2;
                integralesI__originY = integralesI__functionGraphCanvas.height / 2;
                integralesI__clearCanvas(); // Redibujar los ejes al cambiar el tamaño
            };

            // Event listener para redimensionar el canvas
            window.addEventListener('resize', integralesI__resizeCanvas);
            integralesI__resizeCanvas(); // Llamar al inicio para establecer el tamaño inicial

            // Función para parsear y evaluar la función de forma segura
            const integralesI__evaluateFunction = (funcStr, xVal) => {
                try {
                    let parsedFunc = funcStr
                        .replace(/sin\(/g, 'Math.sin(')
                        .replace(/cos\(/g, 'Math.cos(')
                        .replace(/tan\(/g, 'Math.tan(')
                        .replace(/log\(/g, 'Math.log(')
                        .replace(/exp\(/g, 'Math.exp(')
                        .replace(/sqrt\(/g, 'Math.sqrt(')
                        .replace(/pow\(/g, 'Math.pow(')
                        .replace(/\^/g, '**');

                    parsedFunc = parsedFunc.replace(/([0-9.]+)\s*([a-zA-Z])/g, '$1*$2');
                    parsedFunc = parsedFunc.replace(/([a-zA-Z])\s*([0-9.]+)/g, '$1*$2');
                    parsedFunc = parsedFunc.replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2');
                    
                    const x = xVal;
                    return eval(parsedFunc);
                } catch (e) {
                    console.error("Error al evaluar la función:", e);
                    return NaN;
                }
            };

            // Función para dibujar la gráfica de la función original
            const integralesI__drawGraph = (funcStr) => {
                integralesI__clearCanvas(); // Limpiar y redibujar ejes

                integralesI__ctx.beginPath();
                integralesI__ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-secondary-light');
                if (document.body.classList.contains('dark')) {
                    integralesI__ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--integralesI-secondary-dark');
                }
                integralesI__ctx.lineWidth = 2;

                const step = 0.1; // Incremento para dibujar la curva
                const minX = -integralesI__originX / integralesI__scaleX;
                const maxX = (integralesI__functionGraphCanvas.width - integralesI__originX) / integralesI__scaleX;

                let firstPoint = true;

                for (let x = minX; x <= maxX; x += step) {
                    const y = integralesI__evaluateFunction(funcStr, x);

                    if (isNaN(y) || !isFinite(y)) {
                        firstPoint = true; // Reiniciar la línea si hay un valor inválido
                        continue;
                    }

                    const canvasX = integralesI__originX + x * integralesI__scaleX;
                    const canvasY = integralesI__originY - y * integralesI__scaleY; // Y en canvas es invertido

                    if (firstPoint) {
                        integralesI__ctx.moveTo(canvasX, canvasY);
                        firstPoint = false;
                    } else {
                        integralesI__ctx.lineTo(canvasX, canvasY);
                    }
                }
                integralesI__ctx.stroke();
            };

            // Event listener para el botón de resolver
            integralesI__solveBtn.addEventListener('click', () => {
                const funcStr = integralesI__functionInput.value.trim();

                // Limpiar errores previos
                integralesI__functionError.textContent = '';
                integralesI__resultDiv.innerHTML = 'Calculando...';
                integralesI__clearCanvas();

                if (!funcStr) {
                    integralesI__functionError.textContent = 'Por favor, introduce una función.';
                    integralesI__resultDiv.innerHTML = 'Error: Falta la función.';
                    return;
                }

                // Mostrar un resultado simbólico conceptual
                integralesI__resultDiv.innerHTML = `La antiderivada de $f(x) = ${funcStr}$ es $F(x) + C$.<br><small>(La integración simbólica no es posible con JavaScript puro. Se muestra la función original).</small>`;
                
                // Dibujar la gráfica de la función original
                integralesI__drawGraph(funcStr);
            });

            // Lógica para el tema oscuro/claro (tomada de tu documento original)
            const integralesI__applyTheme = (theme) => {
                const body = document.body;
                const integralesI__iconSun = document.querySelector('.integralesI__icon-sun');
                const integralesI__iconMoon = document.querySelector('.integralesI__icon-moon');
                if (theme === 'dark') {
                    body.classList.add('dark');
                    if (integralesI__iconSun) integralesI__iconSun.classList.add('integralesI__hidden');
                    if (integralesI__iconMoon) integralesI__iconMoon.classList.remove('integralesI__hidden');
                } else {
                    body.classList.remove('dark');
                    if (integralesI__iconSun) integralesI__iconSun.classList.remove('integralesI__hidden');
                    if (integralesI__iconMoon) integralesI__iconMoon.classList.add('integralesI__hidden');
                }
                // Redibujar la gráfica para actualizar los colores de los ejes
                const funcStr = integralesI__functionInput.value.trim();
                if (funcStr) {
                    integralesI__drawGraph(funcStr);
                } else {
                    integralesI__clearCanvas(); // Solo redibujar ejes
                }
            };

            // Cargar tema guardado
            const savedTheme = localStorage.getItem('theme') || 'light';
            integralesI__applyTheme(savedTheme);

            // Listener para el botón de cambio de tema (si existe en el HTML padre)
            const themeToggleButton = document.getElementById('app__theme-toggle'); // Mantener el ID original si está fuera
            if (themeToggleButton) {
                themeToggleButton.addEventListener('click', () => {
                    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
                    localStorage.setItem('theme', newTheme);
                    integralesI__applyTheme(newTheme);
                });
            }
        });