document.addEventListener('DOMContentLoaded', () => {

    // Tabla de usuarios fake
    const usuarios = [
        {nombre:'Andres Godoy', email:'andres@duoc.cl', password: '123456'},
        {nombre:'Maria Perez', email:'maria@gmail.com', password: '123456'},
        {nombre:'Juan Soto', email:'juan@duoc.cl', password: '123456'}
    ];

    const tbody = document.querySelector('#tablaUsuarios tbody');
    if(tbody){
        usuarios.forEach(u=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${u.nombre}</td><td>${u.email}</td><td><button onclick='eliminarFila(this)'>Eliminar</button><button>Editar</button></td>`;
            tbody.appendChild(tr);
        });
    }

    // Login simulado
    const loginForm = document.getElementById('loginForm');
    if(loginForm){
        loginForm.addEventListener('submit', function(e){
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const usuarioValido = usuarios.find(u => u.email === email && u.password === password);
            if(usuarioValido){
                alert('Usuario logueado');
                window.location.href = 'index.html';
            } else {
                alert('Correo o contraseña incorrecta');
            }
        });
    }

    // Filtrado de productos
    function filtrarProductos() {
        const categoriaSeleccionada = document.getElementById('categoria')?.value || 'todos';
        const tipoSeleccionado = document.getElementById('tipo')?.value || 'todos';
        const saborSeleccionado = document.getElementById('Sabores')?.value || 'todos';

        const productos = document.querySelectorAll('.catalogo-card');

        productos.forEach(producto => {
            // Convertimos a arrays si hay múltiples valores separados por coma
            const categorias = producto.dataset.categoria ? producto.dataset.categoria.split(',').map(c => c.trim()) : [];
            const tipos = producto.dataset.tipo ? producto.dataset.tipo.split(',').map(t => t.trim()) : [];
            const sabores = producto.dataset.sabores ? producto.dataset.sabores.split(',').map(s => s.trim()) : [];

            const coincideCategoria = (categoriaSeleccionada === 'todos') || categorias.includes(categoriaSeleccionada);
            const coincideTipo = (tipoSeleccionado === 'todos') || tipos.includes(tipoSeleccionado);
            const coincideSabor = (saborSeleccionado === 'todos') || sabores.includes(saborSeleccionado);

            producto.style.display = (coincideCategoria && coincideTipo && coincideSabor) ? 'block' : 'none';
        });
    }

    // Detectar cambios en los select
    const selectCategoria = document.getElementById('categoria');
    const selectTipo = document.getElementById('tipo');
    const selectSabores = document.getElementById('Sabores');

    if(selectCategoria) selectCategoria.addEventListener('change', filtrarProductos);
    if(selectTipo) selectTipo.addEventListener('change', filtrarProductos);
    if(selectSabores) selectSabores.addEventListener('change', filtrarProductos);

});

// Función para eliminar filas de la tabla
function eliminarFila(btn){
    btn.closest('tr').remove();
}

// Función para guardar reseñas
function guardarResena(){
    const textarea = document.querySelector('textarea');
    const resenasDiv = document.getElementById('resenas');
    if(textarea.value.trim() !== ''){
        const p = document.createElement('p');
        p.textContent = textarea.value;
        resenasDiv.appendChild(p);
        textarea.value = '';
    }
}


// funciones pendientes AgregarCarro() guardarResena()