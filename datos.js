const evento = {
    // --- CONFIGURACIÓN ---
    config: {
        tipoPaquete: "premium", // "basico" o "premium"
    },
    
    estilos: {
        colorPrincipal: "#C5A059",    
        colorSecundario: "#F4F4F4",
        colorTexto: "#333333",
        fuenteTitulos: "'Playfair Display', serif",
        fuenteNombres: "'Great Vibes', cursive",
        portadaURL: "image00008.jpg", 
        fondoTextura: "https://www.transparenttextures.com/patterns/cream-paper.png"
    },

    controles: {
        mostrarPadres: true,
        mostrarItinerario: true, // IMPORTANTE: true
        mostrarGaleria: true,
        mostrarHoteles: true, // Nuevo
        mostrarInstagram: true, // Nuevo
        mostrarAlbum: true // Nuevo
    },

    // --- DATOS EVENTO ---
    novios: {
        nombres: "Angie Mariam Espadas Mijangos",
        fecha: "2026-01-15T19:09:00",
        frase: "El amor es la única cosa que crece cuando se reparte. por que el amor es una bendición.",
    },

    padres: {
        novia: "Lizbeth Mijangos & Manuel Espadas",
        novio: "Lorenzo Valencia & Berenice Espadas",
       
    },

    ubicacion: {
        ceremonia: {
            lugar: "Parroquia San Juan Bautista",
            linkGPS: "https://goo.gl/maps/ejemplo",
            mapaIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661966270921!2d-99.165582385093!3d19.42702058688746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1614272379361!5m2!1ses!2smx"
        },
        recepcion: {
            lugar: "Hacienda Los Arcángeles",
            linkGPS: "https://goo.gl/maps/ejemplo",
            mapaIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661966270921!2d-99.165582385093!3d19.42702058688746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1614272379361!5m2!1ses!2smx"
        }
    },

    // --- PREMIUM ---
    musica: {
        // Link seguro HTTPS
        url: "./assets/audio/cancion.mp3"

        // nuevo link de spotify
        ,linkPlaylist: "https://open.spotify.com/embed/album/4nGTiZ3H4UK5HV8bguWBfX?utm_source=generator"
    },

    itinerario: [
        { hora: "18:00", actividad: "Ceremonia Religiosa", icono: "fas fa-church" },
        { hora: "19:30", actividad: "Cóctel de Bienvenida", icono: "fas fa-glass-martini-alt" },
        { hora: "21:00", actividad: "Cena", icono: "fas fa-utensils" },
        { hora: "23:00", actividad: "Baile", icono: "fas fa-music" }
    ],
    fraseItinerario: "¡Que siga la fiesta...!", 

    hoteles: [
        {
            nombre: "Hotel Fiesta Americana",
            direccion: "Av. Principal 123",
            telefono: "+52 999 123 4567",
            foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=60",
            linkReserva: "https://www.fiestamericana.com"
        },
        {
            nombre: "City Express Plus",
            direccion: "Zona Hotelera",
            telefono: "+52 999 765 4321",
            foto: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=60",
            linkReserva: "https://www.cityexpress.com"
        }
    ],

    galeria: [
        "./assets/img/image00001.jpg",
        "./assets/img/image00002.jpg",
        "./assets/img/image00003.jpg",
        "./assets/img/image00004.jpg",
        "./assets/img/image00005.jpg",
        "./assets/img/image00006.jpg",
        "./assets/img/image00007.jpg",
        "./assets/img/image00008.jpg",
        "./assets/img/image00009.jpg",
        "./assets/img/image00010.jpg",
        
    ],

    redes: {
        hashtag: "#MisXVañosAngie",
        linkInstagram: "https://www.instagram.com/explore/tags/MisXVañosAngie/"
    },

    albumFotos: {
        usar: true,
        link: "https://photos.google.com/", 
        frase: "¡Queremos ver la fiesta desde tus ojos! Sube aquí tus mejores fotos."
    },

    invitados: {
        "fam-perez": { nombre: "Familia Pérez", pases: 4 },
        "tios-gomez": { nombre: "Tíos Gómez", pases: 2 },
        "default": { nombre: "Apreciable Invitado", pases: 1 }
        
    }
};