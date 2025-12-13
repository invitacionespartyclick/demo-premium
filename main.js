document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // 1. INICIALIZAR ANIMACIONES SCROLL (AOS)
    // ======================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    // ======================================================
    // 2. INYECTAR ESTILOS (Variables CSS)
    // ======================================================
    const root = document.documentElement;
    root.style.setProperty('--color-principal', evento.estilos.colorPrincipal);
    root.style.setProperty('--color-secundario', evento.estilos.colorSecundario);
    root.style.setProperty('--color-texto', evento.estilos.colorTexto);
    root.style.setProperty('--font-titulos', evento.estilos.fuenteTitulos);
    root.style.setProperty('--font-nombres', evento.estilos.fuenteNombres);

    if (evento.estilos.portadaURL) document.getElementById('hero-section').style.backgroundImage = `url('${evento.estilos.portadaURL}')`;
    if (evento.estilos.fondoTextura) document.body.style.backgroundImage = `url('${evento.estilos.fondoTextura}')`;

    // ======================================================
    // 3. DATOS BÁSICOS
    // ======================================================
    document.getElementById('nombres-novios').textContent = evento.novios.nombres;
    
    const fechaObj = new Date(evento.novios.fecha);
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('fecha-texto').textContent = fechaObj.toLocaleDateString('es-ES', opcionesFecha);

    document.getElementById('padres-novia').textContent = evento.padres.novia;
    document.getElementById('padres-novio').textContent = evento.padres.novio;

    document.getElementById('lugar-ceremonia-txt').textContent = evento.ubicacion.ceremonia.lugar;
    document.getElementById('mapa-ceremonia-frame').innerHTML = `<iframe src="${evento.ubicacion.ceremonia.mapaIframe}" loading="lazy"></iframe>`;
    document.getElementById('btn-mapa-ceremonia').href = evento.ubicacion.ceremonia.linkGPS;
    
    document.getElementById('lugar-recepcion-txt').textContent = evento.ubicacion.recepcion.lugar;
    document.getElementById('mapa-recepcion-frame').innerHTML = `<iframe src="${evento.ubicacion.recepcion.mapaIframe}" loading="lazy"></iframe>`;
    document.getElementById('btn-mapa-recepcion').href = evento.ubicacion.recepcion.linkGPS;

    // ======================================================
    // 4. EFECTO MÁQUINA DE ESCRIBIR
    // ======================================================
    const elFrase = document.getElementById('frase-novios');
    const txtFrase = evento.novios.frase;
    elFrase.textContent = ""; 
    elFrase.classList.add('cursor-maquina');

    

    let idxLetra = 0;
    function escribir() {
        if (idxLetra < txtFrase.length) {
            elFrase.textContent += txtFrase.charAt(idxLetra);
            idxLetra++;
            setTimeout(escribir, 50);
        }
    }
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(ent => {
            if (ent.isIntersecting) {
                escribir();
                observador.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observador.observe(elFrase);

    //Segunda fraseeeee

    

    // ======================================================
    // 5. CONTROL DE SECCIONES (Visibilidad)
    // ======================================================
    const toggle = (id, show) => {
        const el = document.getElementById(id);
        if (el) { if(show) el.classList.remove('hidden'); else el.classList.add('hidden'); }
    }
    
    toggle('padres-section', evento.controles.mostrarPadres);
    toggle('hospedaje-section', evento.controles.mostrarHoteles);
    toggle('instagram-section', evento.controles.mostrarInstagram);
    toggle('album-section', evento.controles.mostrarAlbum);

    const esPremium = evento.config.tipoPaquete === 'premium';
    toggle('itinerario-section', evento.controles.mostrarItinerario && esPremium);
    toggle('galeria-section', evento.controles.mostrarGaleria && esPremium);
    toggle('music-wrapper', esPremium); 

    // ======================================================
    // 6. GENERADORES DE CONTENIDO
    // ======================================================
    
    // --- ITINERARIO ---
    if (evento.controles.mostrarItinerario && esPremium) {
        const container = document.getElementById('timeline-container');
        if(container) {
            container.innerHTML = ''; 
            evento.itinerario.forEach((item, index) => {
                const lado = index % 2 === 0 ? 'left' : 'right';
                const html = `
                    <div class="evento-item ${lado}" data-aos="fade-up">
                        <i class="${item.icono}" style="font-size: 1.5rem; color: var(--color-principal);"></i>
                        <h3>${item.hora}</h3>
                        <p>${item.actividad}</p>
                    </div>`;
                container.innerHTML += html;
            });
        }
        const elFraseIt = document.getElementById('frase-itinerario');
        if(elFraseIt && evento.fraseItinerario) elFraseIt.textContent = evento.fraseItinerario;
    }

    // --- HOTELES ---
    if (evento.controles.mostrarHoteles) {
        const divHoteles = document.getElementById('hoteles-container');
        if (divHoteles && evento.hoteles) {
            divHoteles.innerHTML = '';
            evento.hoteles.forEach((hotel, index) => { // <--- Agregamos 'index' aquí
                
                // Calculamos un retraso para que aparezcan uno por uno (efecto escalera)
                const delay = index * 100; 

                const html = `
                    <div class="hotel-card" data-aos="fade-up" data-aos-delay="${delay}">
                        <img src="${hotel.foto}" alt="${hotel.nombre}">
                        <div class="hotel-info">
                            <h3>${hotel.nombre}</h3>
                            <p>${hotel.direccion}<br>${hotel.telefono}</p>
                            <a href="${hotel.linkReserva}" class="btn" target="_blank" style="padding: 8px 20px; font-size: 0.9rem;">Reservar</a>
                        </div>
                    </div>`;
                divHoteles.innerHTML += html;
            });
        }
    }
    
    // --- GALERÍA (Modo Tarjeta) ---
    if (evento.controles.mostrarGaleria && esPremium && evento.galeria.length > 0) {
        
        const previewCard = document.getElementById('galeria-preview');
        const imgPortada = document.getElementById('foto-portada-galeria');
        const gridFotos = document.getElementById('galeria-container');
        const btnVer = document.getElementById('btn-ver-galeria');

        // 1. Portada
        imgPortada.src = evento.galeria[0];

        // 2. Grid Oculto
        gridFotos.innerHTML = '';
        evento.galeria.forEach((img, index) => {
            const delay = index * 100;
            // IMPORTANTE: data-index para el Lightbox
            const html = `<img src="${img}" alt="Foto Boda" data-index="${index}" data-aos="zoom-in" data-aos-delay="${delay}">`;
            gridFotos.innerHTML += html;
        });

        // 3. Botón Ver
        btnVer.addEventListener('click', () => {
            previewCard.style.display = 'none';
            gridFotos.classList.remove('hidden');
        });

    } else {
        if(document.getElementById('galeria-section')) {
            document.getElementById('galeria-section').classList.add('hidden');
        }
    }

    // --- INSTAGRAM ---
    if (evento.controles.mostrarInstagram) {
        document.getElementById('hashtag-boda').textContent = evento.redes.hashtag;
        document.getElementById('btn-instagram').href = evento.redes.linkInstagram;
    }

    // --- ALBUM ---
    if (evento.controles.mostrarAlbum && evento.albumFotos.usar) {
        document.getElementById('frase-album').textContent = evento.albumFotos.frase;
        document.getElementById('btn-album').href = evento.albumFotos.link;
    }

    // ======================================================
    // 7. MÚSICA & SPOTIFY
    // ======================================================
    if (esPremium && evento.musica.url) {
        const audio = document.getElementById('audio-player');
        const btn = document.getElementById('control-musica');
        const hint = document.getElementById('music-hint');
        
        audio.src = evento.musica.url;
        audio.load();
        
        let isPlaying = false;
        btn.addEventListener('click', () => {
            if (!isPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        btn.innerHTML = '<i class="fas fa-compact-disc music-rotating"></i>';
                        hint.style.display = 'none';
                        isPlaying = true;
                    }).catch(error => { console.error(error); alert("Error al reproducir audio"); });
                }
            } else {
                audio.pause();
                btn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            }
        });
    }

    // 7.1 SPOTIFY PLAYLIST
    const seccionSpotify = document.getElementById('spotify-section');
    const cajaSpotify = document.getElementById('spotify-frame-box');

    if (esPremium && evento.musica.linkPlaylist) {
        seccionSpotify.classList.remove('hidden');
        cajaSpotify.innerHTML = `
        <iframe src="${evento.musica.linkPlaylist}" 
        width="100%" height="352" frameborder="0" allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>`;
    }

    // ======================================================
    // 8. MARIPOSAS
    // ======================================================
    if (esPremium) crearMariposas();

    // ======================================================
    // 9. CUENTA REGRESIVA
    // ======================================================
    const fechaMeta = new Date(evento.novios.fecha).getTime();
    const intervalo = setInterval(() => {
        const ahora = new Date().getTime();
        const dist = fechaMeta - ahora;
        if (dist < 0) {
            clearInterval(intervalo);
            document.getElementById('contador-section').innerHTML = "<h2>¡Llegó el gran día!</h2>";
            return;
        }
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        
        if(document.getElementById('dias')) {
            document.getElementById('dias').innerText = d < 10 ? "0"+d : d;
            document.getElementById('horas').innerText = h < 10 ? "0"+h : h;
            document.getElementById('minutos').innerText = m < 10 ? "0"+m : m;
            document.getElementById('segundos').innerText = s < 10 ? "0"+s : s;
        }
    }, 1000);

    // ======================================================
    // 10. RSVP (Pases)
    // ======================================================
    const params = new URLSearchParams(window.location.search);
    const idInv = params.get('id');
    const datosInv = evento.invitados[idInv] || evento.invitados['default'];

    document.getElementById('nombre-invitado').textContent = datosInv.nombre;
    const spanPases = document.getElementById('pases-asignados');
    if(spanPases) spanPases.textContent = datosInv.pases;

    const select = document.getElementById('select-asistentes');
    if(select) {
        select.innerHTML = "";
        for(let i=1; i <= datosInv.pases; i++) {
            let op = document.createElement('option');
            op.value = i;
            op.text = `${i} persona${i > 1 ? 's' : ''}`;
            select.appendChild(op);
        }
        select.value = datosInv.pases;
    }

    document.getElementById('rsvp-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pers = select.value;
        const msg = document.getElementById('msg-invitado').value;
        let txt = `¡Hola! Soy *${datosInv.nombre}*. \nConfirmo asistencia a la boda de ${evento.novios.nombres}. \n🎟 Asistiremos: *${pers}* personas.`;
        if(msg) txt += `\n✉ Nota: ${msg}`;
        window.open(`https://api.whatsapp.com/send?phone=5219999999999&text=${encodeURIComponent(txt)}`, '_blank');
    });

    // ======================================================
    // 11. LÓGICA DEL LIGHTBOX (Con Swipe y Flechas)
    // ======================================================
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const containerGaleria = document.getElementById('galeria-container');
    const btnPrev = document.getElementById('prev-btn');
    const btnNext = document.getElementById('next-btn');

    let indiceActual = 0;

    // A. ABRIR MODAL
    if (containerGaleria) {
        containerGaleria.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                modal.classList.remove('hidden');
                modalImg.src = e.target.src;
                // Obtenemos índice
                indiceActual = parseInt(e.target.dataset.index);
            }
        });
    }

    // B. CAMBIAR FOTO
    const cambiarFoto = (direccion) => {
        indiceActual += direccion;
        if (indiceActual >= evento.galeria.length) {
            indiceActual = 0; 
        } else if (indiceActual < 0) {
            indiceActual = evento.galeria.length - 1; 
        }
        modalImg.src = evento.galeria[indiceActual];
    };

    if(btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); cambiarFoto(1); });
    if(btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); cambiarFoto(-1); });

    // C. SWIPE TACTIL
    let touchStartX = 0;
    let touchEndX = 0;

    if(modal) {
        modal.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchStartX - touchEndX;
            if (swipeDistance > 50) cambiarFoto(1);
            else if (swipeDistance < -50) cambiarFoto(-1);
        }, {passive: true});
    }

    // D. CERRAR MODAL
    const cerrarModal = () => {
        modal.classList.add('hidden');
        modalImg.src = "";
    };

    if (closeBtn) closeBtn.addEventListener('click', cerrarModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });
    }

    // ======================================================
    // 10. VINCULAR BOTÓN CALENDARIO
    // ======================================================
    const btnCalendar = document.getElementById('add-to-calendar-btn');
    if (btnCalendar) {
        btnCalendar.addEventListener('click', generateICS);
    }

}); // <--- Aquí es donde cierra el DOMContentLoaded


// ======================================================
// 12. FUNCIÓN EXTERNA: MARIPOSAS
// ======================================================
function crearMariposas() {
    const cont = document.createElement('div');
    cont.className = 'mariposas-container';
    document.body.appendChild(cont);
    for (let i = 0; i < 15; i++) {
        const m = document.createElement('div');
        m.className = 'mariposa';
        m.style.left = Math.random() * 100 + 'vw';
        m.style.animationDuration = (Math.random() * 15 + 10) + 's';
        m.style.animationDelay = Math.random() * 10 + 's';
        cont.appendChild(m);
    }
}

// ======================================================
// FUNCIÓN EXTERNA: GENERAR ARCHIVO ICS (CALENDARIO)
// ======================================================
function generateICS() {
    // 1. OBTENER DATOS
    const eventName = `Celebración de ${evento.novios.nombres}`;
    const eventLocation = evento.ubicacion.recepcion.lugar;
    
    // Obtener la fecha del evento (Ej: 2025-12-25)
    const eventDate = new Date(evento.novios.fecha);
    
    // Asumimos una hora de inicio estándar para la fiesta si no está especificada (Ej: 8:00 PM o 20:00)
    // El formato VCALENDAR requiere año/mes/día Y HORA, así que agregamos la hora de la recepción.
    eventDate.setHours(20); 
    eventDate.setMinutes(0);
    eventDate.setDate(eventDate.getDate() + 1); // ICS files use date one day later for all day events.
    
    // 2. FORMATEAR LA FECHA A VCALENDAR (YYYYMMDDTHHMMSS)
    const pad = (num) => String(num).padStart(2, '0');
    
    // Ejemplo: 20251225T200000 (UTC es +0, ajustamos a la zona horaria)
    const formattedDate = 
        eventDate.getFullYear() +
        pad(eventDate.getMonth() + 1) + // JS month is 0-11
        pad(eventDate.getDate()) +
        'T' +
        pad(eventDate.getHours()) +
        pad(eventDate.getMinutes()) +
        '00';
    
    // 3. CREAR CONTENIDO ICS
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//PartyClick//Invitation//ES',
        'BEGIN:VEVENT',
        `UID:${formattedDate}-${Math.random().toString(36).substring(2)}@partyclick.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTSTART:${formattedDate}`,
        `SUMMARY:${eventName}`,
        `LOCATION:${eventLocation}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    // 4. DESCARGAR ARCHIVO
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invitacion-partyclick.ics');
    
    // Simular clic para descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}