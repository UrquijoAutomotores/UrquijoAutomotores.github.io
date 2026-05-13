// Animaciones al Scroll (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar clases iniciales a los elementos a animar
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-fade-in-up, section h2, .hover-lift');
    animateElements.forEach(el => {
        // Solo si no tienen ya la animación via CSS
        if (!el.classList.contains('animate-fade-in-up')) {
            el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
            observer.observe(el);
        }
    });

    // Body fade in
    document.body.classList.add('opacity-0', 'transition-opacity', 'duration-700');
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
    }, 100);
});

// Parallax Hero y Navbar Config
const navbar = document.getElementById('navbar');
const heroImage = document.querySelector('#inicio img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
        if (scrollY > 20) {
            navbar.classList.add('shadow-md', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-md', 'py-2');
            navbar.classList.add('py-4');
        }
    }

    // Parallax
    if (heroImage && scrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
});

// Lógica de Favoritos
function getFavorites() {
    const favs = localStorage.getItem('urquijo_favorites');
    return favs ? JSON.parse(favs) : [];
}

function toggleFavorite(carId, btnElement) {
    let favs = getFavorites();
    const index = favs.indexOf(carId);
    
    if (index === -1) {
        favs.push(carId);
        btnElement.classList.remove('text-gray-300', 'far');
        btnElement.classList.add('text-accent-500', 'fas');
    } else {
        favs.splice(index, 1);
        btnElement.classList.remove('text-accent-500', 'fas');
        btnElement.classList.add('text-gray-300', 'far');
    }
    
    localStorage.setItem('urquijo_favorites', JSON.stringify(favs));
    
    // Si estamos viendo solo favoritos, re-filtrar
    if (window.showFavoritesOnly) {
        filterInventory();
    }
}
window.toggleFavorite = toggleFavorite;

// Lógica de Renderizado del Inventario
const inventoryGrid = document.getElementById('inventory-grid');
const searchInput = document.getElementById('search-input');
const conditionSelect = document.getElementById('condition-select');
const brandSelect = document.getElementById('brand-select');
const yearSelect = document.getElementById('year-select');
const kmSelect = document.getElementById('km-select');
const favToggleBtn = document.getElementById('fav-toggle-btn');
const loadMoreBtn = document.getElementById('load-more-btn');

window.showFavoritesOnly = false;

const initialLimit = 6;
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
    const favs = getFavorites();

    carsToShow.forEach(car => {
        const statusBadge = car.status ? `<span class="absolute top-4 left-4 z-10 ${car.available ? 'bg-accent-500' : 'bg-brand-900'} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">${car.status}</span>` : '';
        const isFav = favs.includes(car.id);

        // Ribbon (Etiqueta Promocional)
        const ribbonHtml = car.tag ? `
            <div class="ribbon-wrapper">
                <div class="ribbon">${car.tag}</div>
            </div>` : '';

        // Galería Interactiva
        let galleryDots = '';
        if (car.gallery && car.gallery.length > 1) {
            galleryDots = `
                <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20" onclick="event.stopPropagation()">
                    ${car.gallery.slice(0, 5).map((img, i) => `
                        <button onclick="changeCardImage(event, this, '${img}')" class="gallery-dot w-2 h-2 rounded-full transition-all focus:outline-none ${i===0 ? 'bg-white scale-125 shadow-sm' : 'bg-white/50 hover:bg-white'}"></button>
                    `).join('')}
                </div>
            `;
        }

        const card = `
            <article class="bg-white rounded-2xl hover-lift group border border-gray-100 flex flex-col transition-all duration-300 relative">
                ${ribbonHtml}
                <button onclick="toggleFavorite(${car.id}, this.querySelector('i'))" class="absolute top-4 right-4 z-20 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                    <i class="${isFav ? 'fas fa-heart text-accent-500' : 'far fa-heart text-gray-300'} text-xl transition-colors"></i>
                </button>
                <div class="img-zoom-container relative h-64 bg-gray-100 overflow-hidden rounded-t-2xl cursor-pointer" onclick="window.location.href='detalle.html?auto=${getCarSlug(car)}'">
                    ${statusBadge}
                    ${galleryDots}
                    <img src="${car.gallery && car.gallery.length > 0 ? car.gallery[0] : car.image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!car.available ? 'grayscale opacity-80' : ''}" loading="lazy">
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
    if (!inventoryGrid) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const condition = conditionSelect ? conditionSelect.value : 'Todos';
    const brand = brandSelect ? brandSelect.value : 'Todas';
    const minYear = yearSelect ? (yearSelect.value === 'Cualquiera' ? 0 : parseInt(yearSelect.value)) : 0;
    const maxKm = kmSelect ? (kmSelect.value === 'Cualquiera' ? 9999999 : parseInt(kmSelect.value)) : 9999999;
    
    const favs = getFavorites();

    // Mostrar Skeletons
    inventoryGrid.innerHTML = Array(6).fill(`
        <article class="bg-white rounded-2xl border border-gray-100 flex flex-col h-[400px]">
            <div class="h-64 skeleton rounded-t-2xl"></div>
            <div class="p-6 md:p-8 flex flex-col flex-grow gap-4">
                <div class="h-8 skeleton rounded-lg w-3/4"></div>
                <div class="h-6 skeleton rounded-lg w-1/4"></div>
                <div class="mt-auto h-12 skeleton rounded-xl w-full"></div>
            </div>
        </article>
    `).join('');
    inventoryGrid.style.opacity = '1';

    setTimeout(() => {
        const filteredCars = inventoryData.filter(car => {
            const matchesSearch = (car.brand + ' ' + car.model + ' ' + car.trim).toLowerCase().includes(searchTerm);
            const matchesCondition = condition === 'Todos' || car.condition === condition;
            const matchesBrand = brand === 'Todas' || car.brand === brand;
            const matchesYear = car.year >= minYear;
            
            // Clean km string (e.g. "86.000" -> 86000)
            const carKm = parseInt(car.km.replace(/\D/g, '')) || 0;
            const matchesKm = carKm <= maxKm;

            const matchesFav = window.showFavoritesOnly ? favs.includes(car.id) : true;

            return matchesSearch && matchesCondition && matchesBrand && matchesYear && matchesKm && matchesFav;
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
    if (yearSelect) yearSelect.value = 'Cualquiera';
    if (kmSelect) kmSelect.value = 'Cualquiera';
    window.showFavoritesOnly = false;
    
    if (favToggleBtn) {
        favToggleBtn.classList.remove('text-accent-500');
        favToggleBtn.classList.add('text-gray-400');
        const icon = document.getElementById('fav-toggle-icon');
        if(icon) { icon.classList.remove('fas'); icon.classList.add('far'); }
    }
    filterInventory();
}

// Event Listeners for Filtering
if (searchInput) searchInput.addEventListener('input', filterInventory);
if (conditionSelect) conditionSelect.addEventListener('change', filterInventory);
if (brandSelect) brandSelect.addEventListener('change', filterInventory);
if (yearSelect) yearSelect.addEventListener('change', filterInventory);
if (kmSelect) kmSelect.addEventListener('change', filterInventory);

if (favToggleBtn) {
    favToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.showFavoritesOnly = !window.showFavoritesOnly;
        
        const icon = document.getElementById('fav-toggle-icon');
        if (window.showFavoritesOnly) {
            favToggleBtn.classList.remove('text-gray-400');
            favToggleBtn.classList.add('text-accent-500');
            if(icon) { icon.classList.remove('far'); icon.classList.add('fas'); }
        } else {
            favToggleBtn.classList.remove('text-accent-500');
            favToggleBtn.classList.add('text-gray-400');
            if(icon) { icon.classList.remove('fas'); icon.classList.add('far'); }
        }
        
        filterInventory();
    });
}
if (yearSelect) yearSelect.addEventListener('change', filterInventory);
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

// Populate Brand Select and Year Select
if (typeof inventoryData !== 'undefined') {
    if (brandSelect) {
        const uniqueBrands = [...new Set(inventoryData.map(car => car.brand))].sort();
        uniqueBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }

    if (yearSelect) {
        const uniqueYears = [...new Set(inventoryData.map(car => car.year))].sort((a, b) => b - a);
        uniqueYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    }
}



// Parallax Hero
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        heroBg.style.transform = `translateY(${scrollValue * 0.4}px) scale(1.1)`;
    });
}

// Intersection Observer for scroll animations
const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

document.querySelectorAll('.fade-in-section').forEach((section) => {
    fadeObserver.observe(section);
});

// Counter Animation Observer
const counters = document.querySelectorAll('.counter');
const counterObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, counterObserverOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Change Image on Main Catalog Card
window.changeCardImage = function(e, btn, imgSrc) {
    e.preventDefault();
    e.stopPropagation();
    const container = btn.closest('.img-zoom-container');
    const img = container.querySelector('img');
    img.src = imgSrc;
    const dots = container.querySelectorAll('.gallery-dot');
    dots.forEach(d => { d.classList.remove('bg-white', 'scale-125'); d.classList.add('bg-white/50'); });
    btn.classList.remove('bg-white/50');
    btn.classList.add('bg-white', 'scale-125');
};

// Back to top logic
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
