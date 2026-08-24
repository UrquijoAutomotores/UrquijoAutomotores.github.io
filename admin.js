document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const adminSection = document.getElementById('admin-section');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const carForm = document.getElementById('car-form');
    const statusMsg = document.getElementById('status-msg');
    const submitBtn = document.getElementById('submit-btn');

    // Verificar si ya hay una sesión activa
    async function checkSession() {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            loginSection.classList.add('hidden');
            adminSection.classList.remove('hidden');
        } else {
            loginSection.classList.remove('hidden');
            adminSection.classList.add('hidden');
        }
    }
    checkSession();

    // Iniciar Sesión
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Por favor completa correo y contraseña.');
            return;
        }

        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        loginBtn.disabled = true;

        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;

        if (error) {
            alert('Error al iniciar sesión: ' + error.message);
        } else {
            checkSession();
        }
    });

    // Cerrar Sesión
    logoutBtn.addEventListener('click', async () => {
        await window.supabaseClient.auth.signOut();
        checkSession();
    });

    // Función para mostrar mensajes de estado
    function showMsg(text, type) {
        statusMsg.innerText = text;
        statusMsg.classList.remove('hidden', 'bg-blue-100', 'text-blue-700', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
        
        if(type === 'info') statusMsg.classList.add('bg-blue-100', 'text-blue-700');
        if(type === 'success') statusMsg.classList.add('bg-green-100', 'text-green-700');
        if(type === 'error') statusMsg.classList.add('bg-red-100', 'text-red-700');
    }

    // Guardar Automóvil
    carForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Guardando...';
        submitBtn.disabled = true;
        
        showMsg('Subiendo imágenes al servidor... (puede tardar unos segundos)', 'info');

        try {
            const files = document.getElementById('images').files;
            let imageUrls = [];

            // 1. Subir cada imagen a Supabase Storage
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Generar un nombre único para que no se sobreescriban
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.floor(Math.random()*1000)}.${fileExt}`;
                const filePath = `autos/${fileName}`;

                // Subir archivo al bucket 'cars-images'
                const { error: uploadError } = await window.supabaseClient.storage
                    .from('cars-images')
                    .upload(filePath, file);

                if (uploadError) {
                    throw new Error(`Error al subir imagen ${i+1}: ${uploadError.message}`);
                }

                // Obtener la URL pública de la imagen
                const { data: { publicUrl } } = window.supabaseClient.storage
                    .from('cars-images')
                    .getPublicUrl(filePath);
                
                imageUrls.push(publicUrl);
            }

            showMsg('Imágenes subidas. Guardando información del auto...', 'info');

            // 2. Preparar el objeto con toda la información
            const featuresInput = document.getElementById('features').value;
            const featuresArray = featuresInput
                ? featuresInput.split(',').map(f => f.trim()).filter(f => f.length > 0)
                : [];

            const newCar = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                trim: document.getElementById('trim').value,
                price: document.getElementById('price').value,
                year: document.getElementById('year').value,
                km: document.getElementById('km').value,
                fuel: document.getElementById('fuel').value,
                condition: document.getElementById('condition').value,
                status: document.getElementById('status').value,
                available: document.getElementById('available').checked,
                description: document.getElementById('description').value,
                features: featuresArray,
                image: imageUrls.length > 0 ? imageUrls[0] : '', // La primera foto como portada
                gallery: imageUrls // Todas las fotos
            };

            // 3. Insertar el auto en la tabla 'cars'
            const { error: dbError } = await window.supabaseClient
                .from('cars')
                .insert([newCar]);

            if (dbError) throw dbError;

            // Éxito
            showMsg('¡Automóvil guardado correctamente en la página!', 'success');
            carForm.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                statusMsg.classList.add('hidden');
            }, 5000);
            
            // Recargar la tabla
            loadInventory();

        } catch (error) {
            console.error('Error:', error);
            showMsg('Hubo un problema: ' + error.message, 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Cargar y mostrar el inventario
    async function loadInventory() {
        const container = document.getElementById('cars-table-container');
        if (!container) return;

        try {
            const { data: cars, error } = await window.supabaseClient
                .from('cars')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!cars || cars.length === 0) {
                container.innerHTML = '<p class="text-gray-500">No hay vehículos cargados aún.</p>';
                return;
            }

            let tableHTML = `
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-700">
                            <th class="p-3 border-b">Vehículo</th>
                            <th class="p-3 border-b">Precio</th>
                            <th class="p-3 border-b">Estado</th>
                            <th class="p-3 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            cars.forEach(car => {
                const statusColor = car.status === 'Vendido' ? 'bg-red-100 text-red-800' : 
                                  car.status === 'Reservado' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800';

                tableHTML += `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                        <td class="p-3">
                            <div class="flex items-center gap-3">
                                ${car.image ? `<img src="${car.image}" class="w-16 h-12 object-cover rounded">` : '<div class="w-16 h-12 bg-gray-200 rounded"></div>'}
                                <div>
                                    <p class="font-bold">${car.brand} ${car.model}</p>
                                    <p class="text-sm text-gray-500">${car.year} | ${car.km}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-3 font-semibold">${car.price}</td>
                        <td class="p-3">
                            <select onchange="updateCarStatus(${car.id}, this.value)" class="p-1 border rounded text-sm ${statusColor} outline-none cursor-pointer">
                                <option value="Disponible" ${car.status === 'Disponible' ? 'selected' : ''}>Disponible</option>
                                <option value="Reservado" ${car.status === 'Reservado' ? 'selected' : ''}>Reservado</option>
                                <option value="Vendido" ${car.status === 'Vendido' ? 'selected' : ''}>Vendido</option>
                                <option value="Destacado" ${car.status === 'Destacado' ? 'selected' : ''}>Destacado</option>
                            </select>
                        </td>
                        <td class="p-3">
                            <button onclick="deleteCar(${car.id})" class="text-red-500 hover:text-red-700 font-bold p-2 transition-colors" title="Eliminar vehículo">
                                <i class="fas fa-trash-alt"></i> Borrar
                            </button>
                        </td>
                    </tr>
                `;
            });

            tableHTML += `</tbody></table>`;
            container.innerHTML = tableHTML;

        } catch (error) {
            console.error('Error loading inventory:', error);
            container.innerHTML = '<p class="text-red-500">Error al cargar el inventario.</p>';
        }
    }

    // Actualizar estado (Global para que el HTML pueda llamarlo)
    window.updateCarStatus = async function(id, newStatus) {
        // Dependiendo del estado, también cambiamos el campo "available" (para color/gris)
        const isAvailable = (newStatus !== 'Vendido' && newStatus !== 'Reservado');
        
        try {
            const { error } = await window.supabaseClient
                .from('cars')
                .update({ status: newStatus, available: isAvailable })
                .eq('id', id);

            if (error) throw error;
            loadInventory();
            loadDashboardStats();
        } catch (error) {
            alert('Error al actualizar: ' + error.message);
        }
    };

    // Eliminar vehículo
    window.deleteCar = async function(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const { error } = await window.supabaseClient
                .from('cars')
                .delete()
                .eq('id', id);

            if (error) throw error;
            
            alert('Vehículo eliminado correctamente.');
            loadInventory(); // Recargar tabla
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    };

    // Cargar Estadísticas del Dashboard
    async function loadDashboardStats() {
        try {
            const { data: cars, error: carsErr } = await window.supabaseClient.from('cars').select('status, available');
            if (!carsErr && cars) {
                const disponibles = cars.filter(c => c.available).length;
                const vendidos = cars.filter(c => c.status === 'Vendido').length;
                document.getElementById('stat-disponibles').innerText = disponibles;
                document.getElementById('stat-vendidos').innerText = vendidos;
            }

            const { count: leadsCount, error: leadsErr } = await window.supabaseClient.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'Pendiente');
            if (!leadsErr) {
                document.getElementById('stat-leads').innerText = leadsCount || 0;
            }
        } catch (e) { console.error('Error loading stats:', e); }
    }

    // Cargar y mostrar los Leads (Clientes)
    async function loadLeads() {
        const container = document.getElementById('leads-table-container');
        if (!container) return;

        try {
            const { data: leads, error } = await window.supabaseClient
                .from('leads')
                .select('*, cars(brand, model)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!leads || leads.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">No hay clientes nuevos por contactar.</p>';
                return;
            }

            let tableHTML = `
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-gray-700 text-sm">
                            <th class="p-4 border-b font-bold">Fecha</th>
                            <th class="p-4 border-b font-bold">Cliente</th>
                            <th class="p-4 border-b font-bold">Vehículo Interés</th>
                            <th class="p-4 border-b font-bold">Estado / Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            leads.forEach(lead => {
                const date = new Date(lead.created_at).toLocaleDateString('es-AR', {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'});
                const carName = lead.cars ? `${lead.cars.brand} ${lead.cars.model}` : 'Vehículo Eliminado';
                const statusColor = lead.status === 'Pendiente' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200';
                
                tableHTML += `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                        <td class="p-4 text-sm text-gray-500">${date}</td>
                        <td class="p-4">
                            <p class="font-bold text-brand-900">${lead.name}</p>
                            <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola ${lead.name}, te contacto de Urquijo Automotores por tu consulta sobre el ${carName}." target="_blank" class="text-accent-500 hover:text-accent-600 font-medium text-sm inline-flex items-center mt-1"><i class="fab fa-whatsapp mr-1"></i>${lead.phone}</a>
                        </td>
                        <td class="p-4 font-medium text-gray-700">${carName}</td>
                        <td class="p-4 flex gap-2 items-center">
                            <select onchange="updateLeadStatus(${lead.id}, this.value)" class="p-1.5 rounded-lg text-sm font-bold ${statusColor} outline-none cursor-pointer">
                                <option value="Pendiente" ${lead.status === 'Pendiente' ? 'selected' : ''}>🔴 Pendiente</option>
                                <option value="Contactado" ${lead.status === 'Contactado' ? 'selected' : ''}>🟢 Contactado</option>
                            </select>
                            <button onclick="deleteLead(${lead.id})" class="text-gray-400 hover:text-red-500 transition-colors p-2" title="Eliminar contacto">
                                <i class="fas fa-trash-alt text-lg"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            tableHTML += `</tbody></table>`;
            container.innerHTML = tableHTML;

        } catch (error) {
            console.error('Error loading leads:', error);
            container.innerHTML = '<p class="text-red-500 text-center py-8">Error al cargar clientes.</p>';
        }
    }

    // Actualizar estado del lead o eliminar si es Contactado
    window.updateLeadStatus = async function(id, newStatus) {
        try {
            if (newStatus === 'Contactado') {
                const { error } = await window.supabaseClient.from('leads').delete().eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await window.supabaseClient.from('leads').update({ status: newStatus }).eq('id', id);
                if (error) throw error;
            }
            loadLeads();
            loadDashboardStats();
        } catch (error) {
            alert('Error al actualizar cliente: ' + error.message);
        }
    };

    // Eliminar lead manualmente
    window.deleteLead = async function(id) {
        if (!confirm('¿Seguro que quieres eliminar este contacto permanentemente?')) return;
        try {
            const { error } = await window.supabaseClient.from('leads').delete().eq('id', id);
            if (error) throw error;
            loadLeads();
            loadDashboardStats();
        } catch (error) {
            alert('Error al eliminar cliente: ' + error.message);
        }
    };

    // Llamamos a loadInventory al iniciar sesión correctamente
    const originalCheckSession = checkSession;
    checkSession = async function() {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            loginSection.classList.add('hidden');
            adminSection.classList.remove('hidden');
            loadInventory();
            loadDashboardStats();
            loadLeads();
        } else {
            loginSection.classList.remove('hidden');
            adminSection.classList.add('hidden');
        }
    };
    checkSession();
});
