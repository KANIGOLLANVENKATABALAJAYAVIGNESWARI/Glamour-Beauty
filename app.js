const artists = [
    { id: 'a1', name: 'Sara K.', rating: 4.8, status: 'available', services: ['bridal','party'], distanceKm: 1.2, cover: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1200&auto=format&fit=crop', priceFrom: 1200 },
    { id: 'a2', name: 'Maya R.', rating: 4.6, status: 'busy', services: ['party','casual'], distanceKm: 2.7, cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop', priceFrom: 900 },
    { id: 'a3', name: 'Aisha L.', rating: 4.9, status: 'available', services: ['bridal'], distanceKm: 0.9, cover: 'https://images.unsplash.com/photo-1512203492609-8d3e5a5f78fb?q=80&w=1200&auto=format&fit=crop', priceFrom: 2000 },
    { id: 'a4', name: 'Nina P.', rating: 4.5, status: 'offline', services: ['casual'], distanceKm: 3.6, cover: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=1200&auto=format&fit=crop', priceFrom: 750 }
];

const form = document.getElementById('bookingForm');
const serviceInput = document.getElementById('serviceInput');
const cardsWrap = document.getElementById('artistCards');
const servicesGrid = document.getElementById('servicesGrid');

document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchor scrolling for internal nav
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const el = document.querySelector(targetId);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function renderCards(list) {
    if (!cardsWrap) return;
    cardsWrap.innerHTML = '';
    list.forEach(a => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
            <div class="cover" style="background-image:url('${a.cover}')"></div>
            <div class="meta">
                <h4>${a.name} <span class="badge ${a.status}">${a.status}</span></h4>
                <span class="star">★ ${a.rating.toFixed(1)}</span>
            </div>
            <div class="muted">${a.distanceKm.toFixed(1)} km • ${a.services.join(', ')}</div>
            <div class="meta" style="margin-top:8px">
                <span class="price">₹${a.priceFrom}+ </span>
                <button class="btn btn--outline">View Profile</button>
            </div>
        `;
        cardsWrap.appendChild(el);
    });
}

renderCards(artists);

// Booking form validation and submission
if (form) {
    const nameEl = document.getElementById('nameInput');
    const emailEl = document.getElementById('emailInput');
    const phoneEl = document.getElementById('phoneInput');
    const dateEl = document.getElementById('dateInput');
    const timeEl = document.getElementById('timeInput');
    const notesEl = document.getElementById('notesInput');
    const resultEl = document.getElementById('bookingResult');

    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const phoneErr = document.getElementById('phoneError');
    const serviceErr = document.getElementById('serviceError');
    const dateErr = document.getElementById('dateError');
    const timeErr = document.getElementById('timeError');

    // set min date to today
    if (dateEl) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth()+1).padStart(2,'0');
        const dd = String(today.getDate()).padStart(2,'0');
        dateEl.min = `${yyyy}-${mm}-${dd}`;
    }

    function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function validatePhone(v){ return /^\d{10}$/.test(v.replace(/\D/g,'')); }
    function clearErrors(){
        if (nameErr) nameErr.textContent='';
        if (emailErr) emailErr.textContent='';
        if (phoneErr) phoneErr.textContent='';
        if (serviceErr) serviceErr.textContent='';
        if (dateErr) dateErr.textContent='';
        if (timeErr) timeErr.textContent='';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let ok = true;
        if (!nameEl.value.trim()) { nameErr.textContent = 'Please enter your name'; ok = false; }
        if (!emailEl.value.trim() || !validateEmail(emailEl.value.trim())) { emailErr.textContent = 'Enter a valid email'; ok = false; }
        if (!phoneEl.value.trim() || !validatePhone(phoneEl.value)) { phoneErr.textContent = 'Enter a 10-digit phone number'; ok = false; }
        if (!serviceInput.value) { serviceErr.textContent = 'Please select a service'; ok = false; }
        if (!dateEl.value) { dateErr.textContent = 'Choose a date'; ok = false; }
        if (!timeEl.value) { timeErr.textContent = 'Choose a time'; ok = false; }
        if (!ok) return;

        // Mock availability + confirmation
        const selected = artists.filter(a => a.services.includes(serviceInput.value)).sort((a,b)=>a.distanceKm-b.distanceKm)[0];
        const confirmationId = 'BK' + Math.random().toString(36).slice(2,8).toUpperCase();
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.textContent = selected
                ? `✅ Booking requested! Ref ${confirmationId}. Closest available: ${selected.name}. You will receive confirmation shortly.`
                : `✅ Booking requested! Ref ${confirmationId}. We will assign an artist and confirm soon.`;
        }
        form.reset();
    });
}

// Services data and renderer
const services = [
    { name: 'Makeup', tag: 'Bridal/Party', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Mehendi', tag: 'Bridal/Arabian', img: 'https://images.unsplash.com/photo-1596457223725-8f23c4d2a682?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Hairstyle', tag: 'Buns/Curls', img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Haircut', tag: 'Men & Women', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Grooming', tag: 'Beard/Facial', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Nail Art', tag: 'Gel/Acrylic', img: 'https://images.unsplash.com/photo-1610992015732-07e2454e0c8f?q=80&w=1200&auto=format&fit=crop' },
];

function renderServices() {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = '';
    services.forEach(s => {
        const el = document.createElement('div');
        el.className = 'service';
        el.innerHTML = `
            <div class="img" style="background-image:url('${s.img}')"></div>
            <div class="body">
                <div>
                    <div class="name">${s.name}</div>
                    <div class="tag">${s.tag}</div>
                </div>
                <a class="btn btn--outline" href="#booking">Book</a>
            </div>
        `;
        servicesGrid.appendChild(el);
    });
}

renderServices();

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nameEl = document.getElementById('contactName');
    const emailEl = document.getElementById('contactEmail');
    const msgEl = document.getElementById('contactMsg');
    const nameErr = document.getElementById('contactNameError');
    const emailErr = document.getElementById('contactEmailError');
    const msgErr = document.getElementById('contactMsgError');

    function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    function clearErrors(){ nameErr.textContent=''; emailErr.textContent=''; msgErr.textContent=''; }

    contactForm.addEventListener('submit', (e) => {
        clearErrors();
        let ok = true;
        if (!nameEl.value.trim()) { nameErr.textContent = 'Please enter your name'; ok = false; }
        if (!emailEl.value.trim() || !validateEmail(emailEl.value.trim())) { emailErr.textContent = 'Enter a valid email'; ok = false; }
        if (!msgEl.value.trim()) { msgErr.textContent = 'Message is required'; ok = false; }
        if (!ok) { e.preventDefault(); return; }
        e.preventDefault();
        contactForm.reset();
        alert('Thanks! We will get back to you soon.');
    });
}




