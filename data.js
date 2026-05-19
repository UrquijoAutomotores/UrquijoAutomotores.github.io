const inventoryData = [
    {
        id: 1,
        brand: 'Ford',
        model: 'Fiesta Kinetic',
        trim: 'S Plus 1.6',
        price: 'Consultar',
        year: '2014',
        km: '129.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Fiesta/Fiesta 1.webp',
        gallery: [
            './Autos Pagina/Fiesta/Fiesta 2.webp',
            './Autos Pagina/Fiesta/Fiesta 3.webp',
            './Autos Pagina/Fiesta/Fiesta 4.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'El Ford Fiesta Kinetic S Plus 2014 destaca por su atractivo y moderno diseño global. Equipado con el confiable motor 1.6L Sigma de 120 CV, ofrece un excelente equilibrio entre eficiencia y respuesta urbana, sumado a un completo nivel de equipamiento en confort y seguridad para su segmento.',
        features: ['Sistema de conectividad SYNC con control por voz', 'Llantas de aleación de 15"', 'Doble airbag frontal y frenos ABS', 'Aire acondicionado', 'Alzacristales y espejos eléctricos']
    },
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
        km: '110.544KM',
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
        id: 12,
        brand: 'Ford',
        model: 'Ka',
        trim: 'Fly',
        price: 'Consultar',
        year: '2010',
        km: '115.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Ford-ka/FordKaIni.webp',
        gallery: [
            './Autos Pagina/Ford-ka/fordka1.webp',
            './Autos Pagina/Ford-ka/Fordka2.webp',
            './Autos Pagina/Ford-ka/Fordka3.webp',
            './Autos Pagina/Ford-ka/Fordka4.webp'
        ],
        status: 'Disponible',
        available: true,
        description: 'El Ford Ka es un vehículo compacto, ágil y de excelente rendimiento urbano. Destaca por su practicidad y economía de combustible, siendo la opción ideal para moverse por la ciudad.',
        features: ['Aire acondicionado', 'Dirección asistida']
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
    {
        id: 9,
        brand: 'Volkswagen',
        model: 'UP!',
        trim: 'High 3 Puertas',
        price: 'Consultar',
        year: '2018',
        km: '72.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/VW UP 2018/Up 1.webp',
        gallery: [
            './Autos Pagina/VW UP 2018/Up 1.webp',
            './Autos Pagina/VW UP 2018/Up 2.webp',
            './Autos Pagina/VW UP 2018/Up 3.webp',
            './Autos Pagina/VW UP 2018/Up 4.webp',
        ],
        status: 'Disponible',
        available: true,
        description: 'El Volkswagen up! Take 2018 es ideal para moverse en entornos urbanos por sus dimensiones compactas. Con una de las mayores calificaciones de seguridad de su segmento y un modernísimo motor tricilíndrico 1.0L de 75 CV, es la opción inteligente.',
        features: ['Motor 1.0L de 75 CV', 'Transmisión manual de 5 velocidades', 'Dirección asistida eléctrica', 'Frenos ABS con EBD', 'Doble airbag frontal', 'Aire acondicionado', 'Levantacristales eléctricos delanteros', 'Cierre centralizado con comando a distancia', 'Llantas de acero con tazas de 14"', 'Sistema de audio con CD/MP3, USB y Bluetooth', 'Anclajes ISOFIX en plazas traseras', 'Asiento conductor regulable en altura', 'Computadora de a bordo', 'Indicador de cambio de marcha', 'Asiento trasero abatible 60/40', 'Volante regulable en altura', 'Tercera luz de freno', 'Inmovilizador electrónico', 'Sistema de alarma antirrobo', 'Cinturones de seguridad con pretensores', 'Apoyacabezas delanteros y traseros', 'Asiento trasero con ISOFIX', 'Sistema de frenado de emergencia (AFU)', 'Distribución electrónica de frenado (REF)', 'Control de estabilidad (ESP)', 'Control de tracción (ASR)', 'Asistente de arranque en pendiente (HSA)', 'Sensor de estacionamiento trasero', 'Espejos retrovisores eléctricos', 'Levantacristales eléctricos con función "one-touch"']
    },
    {
        id: 10,
        brand: 'Peugeot',
        model: '308 1.6 HDI',
        trim: 'Allure Nav',
        price: 'Consultar',
        year: '2013',
        km: '117.000KM',
        fuel: 'Diesel',
        condition: 'Usados',
        image: './Autos Pagina/Peugeot-308/Peugeot-308.webp',
        gallery: [
            './Autos Pagina/Peugeot-308/Peugeot-308.webp',
            './Autos Pagina/Peugeot-308/Peugeot-308-2.webp',
            './Autos Pagina/Peugeot-308/Peugeot-308-3.webp',
            './Autos Pagina/Peugeot-308/Peugeot-308-4.webp'
        ],
        status: 'Reservado',
        available: false,
        description: 'El Peugeot 308 Allure Nav 1.6 HDI 2013 combina un diseño elegante con la eficiencia de su motor diésel. Con 115 CV y un excelente rendimiento de combustible, es ideal para quienes buscan confort y economía en sus viajes.',
        features: ['Motor 1.6L HDI de 115 CV', 'Transmisión manual de 5 velocidades', 'Frenos ABS con EBD', 'Doble airbag frontal', 'Aire acondicionado', 'Levantacristales eléctricos', 'Cierre centralizado con comando a distancia', 'Llantas de aleación ligera de 16"', 'Apoyabrazos central delantero', 'Sistema de alarma antirrobo', 'Sensor de estacionamiento trasero', 'Espejos retrovisores eléctricos', 'Levantacristales eléctricos con función "one-touch"']
    },
    {
        id: 11,
        brand: 'Citroen',
        model: 'Xsara Picasso 1.6 L',
        trim: 'Exclusive',
        price: 'Consultar',
        year: '2008',
        km: '106.000KM',
        fuel: 'Nafta',
        condition: 'Usados',
        image: './Autos Pagina/Citroen-Piccaso/Piccaso1.webp',
        gallery: [
            './Autos Pagina/Citroen-Piccaso/Piccaso2.webp',
            './Autos Pagina/Citroen-Piccaso/Piccaso3.webp',
            './Autos Pagina/Citroen-Piccaso/Piccaso4.webp',
            './Autos Pagina/Citroen-Piccaso/Piccaso-km.webp',
        ],
        status: 'Disponible',
        available: true,
        description: 'La Citroën Xsara Picasso 1.6 Exclusive es el monovolumen por excelencia, diseñado para maximizar el confort y el espacio de toda la familia. Equipada con un eficiente motor 1.6L que garantiza un bajo consumo, esta versión tope de gama ofrece una modularidad interior inigualable y un nivel de equipamiento premium, haciendo que cada viaje largo o recorrido urbano sea una experiencia de primera clase',
        features: ['climatizador automático', 'Frenos ABS', 'Levantacristales eléctricos en las 4 puertas', 'Cierre centralizado con comando', 'Espejos de regulación eléctrica']
    }
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
