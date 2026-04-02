// Configuración de Navbar al hacer scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }
    });
}

// Lógica de Renderizado del Inventario
const inventoryGrid = document.getElementById('inventory-grid');
const searchInput = document.getElementById('search-input');
const conditionSelect = document.getElementById('condition-select');
const brandSelect = document.getElementById('brand-select');
const loadMoreBtn = document.getElementById('load-more-btn');

const initialLimit = 999;
let currentLimit = initialLimit;
let currentCars = typeof inventoryData !== 'undefined' ? [...inventoryData] : [];

function updateLoadMoreButton() {
    if (!loadMoreBtn) return;

    // Ocultar si hay menos autos que el límite inicial
    if (currentCars.length <= initialLimit) {
        loadMoreBtn.parentElement.style.display = 'none';
        return;
    }

    loadMoreBtn.parentElement.style.display = 'block';

    if (currentLimit >= currentCars.length) {
        // Expandido: Mostrar botón para contraer
        loadMoreBtn.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
    } else {
        // Contraído: Mostrar botón para expandir
        loadMoreBtn.innerHTML = 'Explorar inventario completo <i class="fas fa-chevron-down"></i>';
    }
}

function renderInventory(cars) {
    if (!inventoryGrid) return; // Por si estamos en la página de detalles

    inventoryGrid.innerHTML = '';

    if (cars.length === 0) {
        inventoryGrid.innerHTML = `
            <div class="col-span-full py-12 text-center text-gray-500 animate-fade-in-up">
                <i class="fas fa-car-crash text-4xl mb-4 text-gray-300"></i>
                <p class="text-xl font-medium">No se encontraron vehículos que coincidan con su búsqueda.</p>
                <button onclick="clearFilters()" class="mt-4 text-accent-500 font-medium hover:underline">Limpiar filtros</button>
            </div>
        `;
        if (loadMoreBtn) loadMoreBtn.parentElement.style.display = 'none';
        return;
    }

    const carsToShow = cars.slice(0, currentLimit);

    carsToShow.forEach(car => {
        const statusBadge = car.status ? `<span class="absolute top-4 left-4 z-10 ${car.available ? 'bg-accent-500' : 'bg-brand-900'} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">${car.status}</span>` : '';

        const card = `
            <article class="bg-white rounded-2xl hover-lift group border border-gray-100 flex flex-col animate-fade-in-up transition-all duration-300">
                <div class="img-zoom-container relative h-64 bg-gray-100">
                    ${statusBadge}
                    <img src="${car.image}" alt="${car.brand} ${car.model}" class="img-zoom ${!car.available ? 'grayscale opacity-80' : ''}" loading="lazy">
                </div>
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-display text-2xl font-bold ${!car.available ? 'text-gray-400' : 'text-brand-900'} leading-tight">
                            ${car.brand} ${car.model} <br>
                            <span class="text-lg font-medium ${!car.available ? 'text-gray-300' : 'text-brand-400'}">${car.trim}</span>
                        </h3>
                        <span class="font-bold text-xl ${!car.available ? 'text-gray-400' : 'text-brand-900'}">${car.price}</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 mb-6 mt-auto ${!car.available ? 'opacity-50 text-gray-400' : ''}">
                        <div class="text-center">
                            <span class="block font-medium ${car.available ? 'text-brand-900' : ''} mb-1 pt-1"><i class="fas fa-calendar-alt text-sm ${car.available ? 'text-brand-400' : ''} mb-2"></i><br>${car.year}</span>
                        </div>
                        <div class="text-center border-x border-gray-100">
                            <span class="block font-medium ${car.available ? 'text-brand-900' : ''} mb-1 pt-1"><i class="fas fa-road text-sm ${car.available ? 'text-brand-400' : ''} mb-2"></i><br>${car.km}</span>
                        </div>
                        <div class="text-center">
                            <span class="block font-medium ${car.available ? 'text-brand-900' : ''} mb-1 pt-1"><i class="fas fa-gas-pump text-sm ${car.available ? (car.fuel === 'Híbrido' ? 'text-accent-500' : 'text-brand-400') : ''} mb-2"></i><br>${car.fuel}</span>
                        </div>
                    </div>
                    ${car.available ? `
                        <a href="detalle.html?auto=${getCarSlug(car)}" class="w-full inline-flex justify-center items-center gap-2 bg-transparent border-2 border-brand-900 text-brand-900 font-semibold py-3 rounded-xl hover:bg-brand-900 hover:text-white transition-all">
                            Ver Detalles <i class="fas fa-arrow-right text-sm transition-transform group-hover:translate-x-1"></i>
                        </a>
                    ` : `
                        <button disabled class="w-full inline-flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed">
                            No Disponible
                        </button>
                    `}
                </div>
            </article>
        `;
        inventoryGrid.insertAdjacentHTML('beforeend', card);
    });

    updateLoadMoreButton();
}

function filterInventory() {
    if (!searchInput || !conditionSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const condition = conditionSelect.value;
    const brand = brandSelect ? brandSelect.value : 'Todas';

    inventoryGrid.style.opacity = '0.5';

    setTimeout(() => {
        const filteredCars = inventoryData.filter(car => {
            const matchesSearch = (car.brand + ' ' + car.model + ' ' + car.trim).toLowerCase().includes(searchTerm);
            const matchesCondition = condition === 'Todos' || car.condition === condition;
            const matchesBrand = brand === 'Todas' || car.brand === brand;
            return matchesSearch && matchesCondition && matchesBrand;
        });

        currentCars = filteredCars;
        currentLimit = initialLimit;
        renderInventory(currentCars);
        inventoryGrid.style.opacity = '1';
    }, 200);
}

window.clearFilters = function () {
    if (searchInput) searchInput.value = '';
    if (conditionSelect) conditionSelect.value = 'Todos';
    if (brandSelect) brandSelect.value = 'Todas';
    filterInventory();
}

// Event Listeners for Filtering
if (searchInput) searchInput.addEventListener('input', filterInventory);
if (conditionSelect) conditionSelect.addEventListener('change', filterInventory);
if (brandSelect) brandSelect.addEventListener('change', filterInventory);
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterInventory();
        document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' });
    });
}

// Load More Button Event
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentLimit >= currentCars.length) {
            // Contraer y volver arriba
            currentLimit = initialLimit;
            renderInventory(currentCars);
            const section = document.getElementById('inventario');
            if (section) {
                const headerOffset = 80;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        } else {
            // Expandir todo
            currentLimit = currentCars.length;
            renderInventory(currentCars);
        }
    });
}

// Populate Brand Select
if (brandSelect && typeof inventoryData !== 'undefined') {
    const uniqueBrands = [...new Set(inventoryData.map(car => car.brand))].sort();
    uniqueBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

// Inicializar el Home
if (inventoryGrid) {
    currentCars = typeof inventoryData !== 'undefined' ? [...inventoryData] : [];
    currentLimit = initialLimit;
    renderInventory(currentCars);
}

// Lógica para Smooth Scrolling y cerrar menú en móvil
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        // Comprobar si estamos en index.html, de lo contrario redigir
        if (window.location.pathname.includes('detalle.html') && targetId.startsWith('#')) {
            window.location.href = 'index.html' + targetId;
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
