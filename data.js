const inventoryData = [
    {
        id: 2,
        brand: 'Chevrolet',
        model: 'Onix',
        trim: 'Joy',
        price: 'Consultar',
        year: '2022',
        km: '77.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Onix-Joy/Onix1.webp',
        gallery: [
            './Autos Pagina/Onix-Joy/Onix2.webp',
            './Autos Pagina/Onix-Joy/OnixInterior.webp',
            './Autos Pagina/Onix-Joy/InteriorAtras.webp',
            './Autos Pagina/Onix-Joy/OnixTacometro.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'El Chevrolet Onix Joy es un vehículo confiable, ágil y económico, ideal para el uso diario en la ciudad. Ofrece un diseño moderno, bajo costo de mantenimiento y el confort necesario para tus viajes.',
        features: ['Aire acondicionado', 'Dirección asistida', 'Doble airbag frontal', 'Frenos ABS']
    },
    {
        id: 13,
        brand: 'Ford',
        model: 'Fiesta Kinetic',
        trim: 'Titanium AT',
        price: 'Consultar',
        year: '2015',
        km: '111.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Fiesta-Kinetic-Titanium/PortadaFiesta.webp',
        gallery: [
            './Autos Pagina/Fiesta-Kinetic-Titanium/PortadaFiesta.webp',
            './Autos Pagina/Fiesta-Kinetic-Titanium/Fiesta2.webp',
            './Autos Pagina/Fiesta-Kinetic-Titanium/Fiesta3.webp',
            './Autos Pagina/Fiesta-Kinetic-Titanium/Fiesta4.webp',
            './Autos Pagina/Fiesta-Kinetic-Titanium/FiestaInterior.webp',
            './Autos Pagina/Fiesta-Kinetic-Titanium/FiestaKM.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'El Ford Fiesta Kinetic Titanium es la versión tope de gama. Destaca por su atractivo diseño, comodidad de la caja automática, excelente nivel de seguridad con 7 airbags, techo solar eléctrico y tecnología de conectividad avanzada.',
        features: ['Caja Automática', 'Techo solar eléctrico', 'Climatizador automático', '7 Airbags', 'Control de velocidad crucero']
    },
    {
        id: 14,
        brand: 'Chevrolet',
        model: 'Astra',
        trim: 'GL',
        price: 'Consultar',
        year: '2008',
        km: '126.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Astra-Gl-2008/astra-costadoderecho',
        gallery: [
            './Autos Pagina/Astra-Gl-2008/astra-costado.webp',
            './Autos Pagina/Astra-Gl-2008/astra-costadoderecho.webp',
            './Autos Pagina/Astra-Gl-2008/ParteTrasera-astra.webp',
            './Autos Pagina/Astra-Gl-2008/astra-interior.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'Chevrolet Astra GL modelo 2008 sigue siendo uno de los referentes más buscados en el mercado de usados, ideal para quienes priorizan el confort de marcha y la confiabilidad a largo plazo. Equipado con el reconocido motor naftero 2.0 de 8 válvulas, ofrece un equilibrio perfecto entre agilidad urbana y un andar sereno en ruta, respaldado por una mecánica noble, repuestos accesibles y un mantenimiento muy sencillo.',
        features: ['Levantavidrios eléctricos delanteros y traseros con sistema "One Touch".', 'Aire acondicionado de gran caudal y dirección asistida', 'Llantas de aleación originales de 15 pulgadas', 'Apertura y cierre de puertas a distancia con comando en llave']
    },
    {
        id: 3,
        brand: 'Fiat',
        model: 'Palio',
        trim: 'Adventure',
        price: 'Consultar',
        year: '2011',
        km: '124.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Fiat-palio/Palio1.webp',
        gallery: [
            './Autos Pagina/Fiat-palio/palio4.webp',
            './Autos Pagina/Fiat-palio/palio5.webp',
            './Autos Pagina/Fiat-palio/palio3.webp',
            './Autos Pagina/Fiat-palio/palio-km.webp',
        ],
        status: 'Disponible',
        available: true,
        description: 'La Fiat Palio Adventure 2011 fusiona la gran capacidad de un vehículo familiar con la fortaleza de un todoterreno ligero. Impulsada por una mecánica a nafta de probada confiabilidad, destaca por su excelente despeje del suelo y suspensión reforzada, convirtiéndola en la opción ideal para transitar con total seguridad tanto en la ciudad como en caminos de tierra',
        features: ['Aire acondicionado', 'Dirección asistida', 'Llantas	acero con taza', 'Limpia-lava luneta con desempañador trasero']
    },

    {
        id: 4,
        brand: 'Renault',
        model: 'Kwid',
        trim: 'Outsider',
        price: 'Consultar',
        year: '2025',
        km: '0KM',
        fuel: 'Nafta',
        condition: 'Nuevos',
        image: './Autos Pagina/Renault Kwid 2025 0Km/Kwid 1.webp',
        gallery: [
            './Autos Pagina/Renault Kwid 2025 0Km/Kwid 1.webp',
            './Autos Pagina/Renault Kwid 2025 0Km/Kwid 2.webp',
            './Autos Pagina/Renault Kwid 2025 0Km/Kwid 3.webp',
            './Autos Pagina/Renault Kwid 2025 0Km/Kwid 4.webp',
            './Autos Pagina/Renault Kwid 2025 0Km/Kwid 5.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'El Renault Kwid Outsider 2025 es un vehículo pensado para la ciudad con un espíritu aventurero. Equipado con un ágil motor 1.0L SCe de 66 CV, ofrece un excelente despeje del suelo y diseño robusto, ideal para superar los obstáculos urbanos de forma económica.',
        features: ['Sistema multimedia MediaNav de 8" con Apple CarPlay y Android Auto', 'Cámara de retroceso', '4 Airbags (frontales y laterales)', 'Barras de techo decorativas', 'Llantas Flexwheel de 14"']
    },
    {
        id: 5,
        brand: 'Ford',
        model: 'Territory',
        trim: 'Sel 1.5T',
        price: 'Consultar',
        year: '2022',
        km: '75.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Ford Territory 2022/Territory 1.webp',
        gallery: [
            './Autos Pagina/Ford Territory 2022/Territory 1.webp',
            './Autos Pagina/Ford Territory 2022/Territory 2.webp',
            './Autos Pagina/Ford Territory 2022/Territory 3.webp',
            './Autos Pagina/Ford Territory 2022/Territory 4.webp',
            './Autos Pagina/Ford Territory 2022/Territory 5.webp'
        ],
        status: 'Destacado',
        available: true,
        description: 'El Ford Territory Titanium 2022 es un SUV mediano que combina diseño moderno, tecnología avanzada y confort para toda la familia. Equipado con un motor 1.5L Turbo de 143 CV, ofrece un excelente equilibrio entre rendimiento y eficiencia.',
        features: ['Pantalla táctil de 10.1"', 'Asientos de cuero', 'Cámara 360°', 'Freno de estacionamiento eléctrico', 'Conectividad Apple CarPlay y Android Auto']
    },
    {
        id: 8,
        brand: 'Fiat',
        model: 'Uno',
        trim: 'Sporting',
        price: 'Consultar',
        year: '2011',
        km: '150.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Fiat-uno-2011/Uno 1.webp',
        gallery: [
            './Autos Pagina/Fiat-uno-2011/Uno 1.webp',
            './Autos Pagina/Fiat-uno-2011/Uno 2.webp',
            './Autos Pagina/Fiat-uno-2011/Uno 3.webp',
            './Autos Pagina/Fiat-uno-2011/Uno 4.webp',
        ],
        status: 'Disponible',
        available: true,
        description: 'El Fiat Uno Sporting 2011 destaca por su estética deportiva y exclusiva. Equipado con el confiable motor 1.4L EVO de 85 CV y suspensión rebajada, entrega una experiencia de conducción más dinámica conservando su eficiencia típica.',
        features: ['Detalles exteriores aerodinámicos', 'Ópticas enmascaradas y antiniebla', 'Volante deportivo revestido', 'Salida de escape de doble boca', 'Llantas de aleación exclusivas de 15"']
    },
    
];

// Función para generar URLs amigables
const getCarSlug = (car) => {
    return `${car.brand}-${car.model}-${car.id}`
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/[^a-z0-9-]/g, "-") // Reemplazar caracteres raros por guiones
        .replace(/-+/g, "-") // Evitar guiones dobles
        .replace(/^-|-$/g, ""); // Quitar guiones extra al principio o final
};
