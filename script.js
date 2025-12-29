/**
 * Beauty Parlour Booking System - Main JavaScript File
 * 
 * WARNING: This is a demo application using localStorage for data persistence.
 * In a production environment, you should use a proper backend database
 * and implement secure authentication mechanisms.
 */

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let isAuthenticated = false;

// Sample data for demonstration
const SAMPLE_DATA = {
    users: [
        {
            id: 1,
            username: 'customer@demo.com',
            password: 'password123',
            role: 'customer',
            firstName: 'Priya',
            lastName: 'Sharma',
            email: 'customer@demo.com',
            phone: '+91 98765 43210',
            address: 'Mumbai, Maharashtra',
            dateOfBirth: '1990-05-15',
            preferences: 'Sensitive skin, prefers organic products',
            loyaltyPoints: 150,
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            username: 'admin@demo.com',
            password: 'admin123',
            role: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@demo.com',
            phone: '+91 98765 43211',
            createdAt: '2024-01-01'
        },
        {
            id: 3,
            username: 'owner@demo.com',
            password: 'owner123',
            role: 'owner',
            firstName: 'Owner',
            lastName: 'User',
            email: 'owner@demo.com',
            phone: '+91 98765 43212',
            createdAt: '2024-01-01'
        }
    ],
    artists: [
        {
            id: 1,
            name: 'Anita Mehta',
            specialization: 'Hair Styling & Coloring',
            experience: 8,
            bio: 'Expert in modern hair trends and coloring techniques',
            rating: 4.8,
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            name: 'Sneha Patel',
            specialization: 'Facial & Skin Care',
            experience: 6,
            bio: 'Specialized in advanced facial treatments and skin care',
            rating: 4.9,
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 3,
            name: 'Riya Singh',
            specialization: 'Makeup & Bridal',
            experience: 5,
            bio: 'Professional makeup artist specializing in bridal looks',
            rating: 4.7,
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 4,
            name: 'Kavya Reddy',
            specialization: 'Nail Art & Manicure',
            experience: 4,
            bio: 'Creative nail artist with expertise in nail art and designs',
            rating: 4.6,
            status: 'active',
            createdAt: '2024-01-01'
        }
    ],
    services: [
        {
            id: 1,
            name: 'Hair Cut & Style',
            category: 'Hair',
            duration: 60,
            price: 800,
            description: 'Professional hair cutting and styling service',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            name: 'Hair Coloring',
            category: 'Hair',
            duration: 120,
            price: 2500,
            description: 'Complete hair coloring with premium products',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 3,
            name: 'Facial Treatment',
            category: 'Skin',
            duration: 90,
            price: 1500,
            description: 'Deep cleansing facial with massage',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 4,
            name: 'Bridal Makeup',
            category: 'Makeup',
            duration: 180,
            price: 5000,
            description: 'Complete bridal makeup with trial',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 5,
            name: 'Manicure & Pedicure',
            category: 'Nails',
            duration: 90,
            price: 1200,
            description: 'Complete nail care with polish',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 6,
            name: 'Spa Massage',
            category: 'Spa',
            duration: 60,
            price: 2000,
            description: 'Relaxing full body massage',
            status: 'active',
            createdAt: '2024-01-01'
        }
    ],
    bookings: [
        {
            id: 1,
            customerId: 1,
            customerName: 'Priya Sharma',
            customerEmail: 'customer@demo.com',
            customerPhone: '+91 98765 43210',
            serviceId: 1,
            serviceName: 'Hair Cut & Style',
            artistId: 1,
            artistName: 'Anita Mehta',
            date: '2024-12-20',
            time: '10:00',
            location: 'Mumbai',
            amount: 800,
            status: 'confirmed',
            specialRequests: 'Prefer layered cut',
            createdAt: '2024-12-15'
        },
        {
            id: 2,
            customerId: 1,
            customerName: 'Priya Sharma',
            customerEmail: 'customer@demo.com',
            customerPhone: '+91 98765 43210',
            serviceId: 3,
            serviceName: 'Facial Treatment',
            artistId: 2,
            artistName: 'Sneha Patel',
            date: '2024-12-18',
            time: '14:00',
            location: 'Mumbai',
            amount: 1500,
            status: 'completed',
            specialRequests: 'Sensitive skin treatment',
            createdAt: '2024-12-10',
            completedAt: '2024-12-18'
        }
    ],
    reviews: [
        {
            id: 1,
            bookingId: 2,
            customerId: 1,
            customerName: 'Priya Sharma',
            rating: 5,
            comment: 'Excellent facial treatment! My skin feels amazing.',
            createdAt: '2024-12-18'
        }
    ],
    settings: {
        homepageTitle: 'Transform Your Beauty',
        homepageSubtitle: 'Professional beauty services at your convenience. Book your appointment today!',
        contactAddress: '123 Beauty Street, Mumbai, Maharashtra 400001',
        contactPhone: '+91 98765 43210',
        contactEmail: 'info@glamourbeauty.com'
    }
};

// ===== UTILITY FUNCTIONS =====

/**
 * Format currency in Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format time for display
 * @param {string} timeString - Time string to format
 * @returns {string} Formatted time string
 */
function formatTime(timeString) {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Show modal
 * @param {string} modalId - ID of modal to show
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Hide modal
 * @param {string} modalId - ID of modal to hide
 */
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Show alert message
 * @param {string} message - Message to show
 * @param {string} type - Type of alert (success, error, info)
 */
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at top of main content
    const mainContent = document.querySelector('.main-content') || document.querySelector('.container');
    if (mainContent) {
        mainContent.insertBefore(alert, mainContent.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

/**
 * Initialize sample data in localStorage
 */
function initializeSampleData() {
    if (!localStorage.getItem('beautyParlourData')) {
        localStorage.setItem('beautyParlourData', JSON.stringify(SAMPLE_DATA));
    }
}

/**
 * Get data from localStorage
 * @param {string} key - Key to get data for
 * @returns {any} Data from localStorage
 */
function getData(key) {
    const data = JSON.parse(localStorage.getItem('beautyParlourData') || '{}');
    return data[key] || [];
}

/**
 * Save data to localStorage
 * @param {string} key - Key to save data for
 * @param {any} data - Data to save
 */
function saveData(key, data) {
    const allData = JSON.parse(localStorage.getItem('beautyParlourData') || '{}');
    allData[key] = data;
    localStorage.setItem('beautyParlourData', JSON.stringify(allData));
}

/**
 * Generate unique ID
 * @returns {number} Unique ID
 */
function generateId() {
    return Date.now() + Math.random();
}

// ===== AUTHENTICATION FUNCTIONS =====

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
function checkAuthentication() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        isAuthenticated = true;
        return true;
    }
    return false;
}

/**
 * Login user
 * @param {string} username - Username/email
 * @param {string} password - Password
 * @param {string} role - User role
 * @returns {boolean} Login success status
 */
function login(username, password, role) {
    const users = getData('users');
    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );
    
    if (user) {
        currentUser = user;
        isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

/**
 * Logout user
 */
function logout() {
    currentUser = null;
    isAuthenticated = false;
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

/**
 * Redirect to appropriate dashboard based on user role
 */
function redirectToDashboard() {
    if (!isAuthenticated || !currentUser) return;
    
    switch (currentUser.role) {
        case 'admin':
            window.location.href = 'admin_dashboard.html';
            break;
        case 'super_admin':
            // Frontend-only navigation to Super Admin dashboard
            window.location.href = 'super_admin.html';
            break;
        case 'customer':
            window.location.href = 'customer_dashboard.html';
            break;
        case 'artist':
            // Frontend-only navigation to Artist dashboard
            window.location.href = 'artist_dashboard.html';
            break;
        case 'owner':
            window.location.href = 'owner_dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

// ===== BOOKING FUNCTIONS =====

/**
 * Create new booking
 * @param {Object} bookingData - Booking data
 * @returns {Object} Created booking
 */
function createBooking(bookingData) {
    const bookings = getData('bookings');
    const services = getData('services');
    const artists = getData('artists');
    
    const service = services.find(s => s.id === parseInt(bookingData.service));
    const artist = bookingData.artist ? artists.find(a => a.id === parseInt(bookingData.artist)) : null;
    
    const booking = {
        id: generateId(),
        customerId: currentUser ? currentUser.id : null,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        serviceId: parseInt(bookingData.service),
        serviceName: service ? service.name : 'Unknown Service',
        artistId: artist ? artist.id : null,
        artistName: artist ? artist.name : 'Any Available',
        date: bookingData.date,
        time: bookingData.time,
        location: bookingData.location,
        amount: service ? service.price : 0,
        status: 'pending',
        specialRequests: bookingData.specialRequests || '',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    bookings.push(booking);
    saveData('bookings', bookings);
    
    // Award loyalty points to customer
    if (currentUser && currentUser.role === 'customer') {
        awardLoyaltyPoints(currentUser.id, 5, 'Booking created');
    }
    
    return booking;
}

/**
 * Update booking status
 * @param {number} bookingId - Booking ID
 * @param {string} status - New status
 */
function updateBookingStatus(bookingId, status) {
    const bookings = getData('bookings');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = status;
        if (status === 'completed') {
            bookings[bookingIndex].completedAt = new Date().toISOString().split('T')[0];
        }
        saveData('bookings', bookings);
    }
}

/**
 * Cancel booking
 * @param {number} bookingId - Booking ID
 */
function cancelBooking(bookingId) {
    updateBookingStatus(bookingId, 'cancelled');
}

// ===== LOYALTY POINTS FUNCTIONS =====

/**
 * Award loyalty points to customer
 * @param {number} customerId - Customer ID
 * @param {number} points - Points to award
 * @param {string} reason - Reason for awarding points
 */
function awardLoyaltyPoints(customerId, points, reason) {
    const users = getData('users');
    const userIndex = users.findIndex(u => u.id === customerId);
    
    if (userIndex !== -1) {
        users[userIndex].loyaltyPoints = (users[userIndex].loyaltyPoints || 0) + points;
        saveData('users', users);
        
        // Add to points history
        const pointsHistory = getData('pointsHistory') || [];
        pointsHistory.push({
            id: generateId(),
            customerId: customerId,
            points: points,
            reason: reason,
            date: new Date().toISOString().split('T')[0],
            balance: users[userIndex].loyaltyPoints
        });
        saveData('pointsHistory', pointsHistory);
    }
}

// ===== DASHBOARD FUNCTIONS =====

/**
 * Load dashboard statistics
 */
function loadDashboardStats() {
    const bookings = getData('bookings');
    const users = getData('users');
    const reviews = getData('reviews');
    
    // Calculate statistics
    const totalBookings = bookings.length;
    const totalCustomers = users.filter(u => u.role === 'customer').length;
    const totalRevenue = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.amount, 0);
    const avgRating = reviews.length > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;
    
    // Update DOM elements
    const elements = {
        totalBookings: document.getElementById('totalBookings'),
        totalCustomers: document.getElementById('totalCustomers'),
        totalRevenue: document.getElementById('totalRevenue'),
        avgRating: document.getElementById('avgRating')
    };
    
    if (elements.totalBookings) elements.totalBookings.textContent = totalBookings;
    if (elements.totalCustomers) elements.totalCustomers.textContent = totalCustomers;
    if (elements.totalRevenue) elements.totalRevenue.textContent = formatCurrency(totalRevenue);
    if (elements.avgRating) elements.avgRating.textContent = avgRating;
}

/**
 * Load recent bookings for admin dashboard
 */
function loadRecentBookings() {
    const bookings = getData('bookings');
    const recentBookings = bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    const tbody = document.querySelector('#recentBookingsTable tbody');
    if (tbody) {
        tbody.innerHTML = recentBookings.map(booking => `
            <tr>
                <td>${booking.customerName}</td>
                <td>${booking.serviceName}</td>
                <td>${formatDate(booking.date)}</td>
                <td>${formatTime(booking.time)}</td>
                <td><span class="status-${booking.status}">${booking.status}</span></td>
            </tr>
        `).join('');
    }
}

// ===== CHART FUNCTIONS =====

/**
 * Initialize Chart.js charts for owner dashboard
 */
function initializeCharts() {
    const bookings = getData('bookings');
    const services = getData('services');
    const artists = getData('artists');
    const reviews = getData('reviews');
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueData = calculateMonthlyRevenue(bookings);
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: revenueData.labels,
                datasets: [{
                    label: 'Revenue (₹)',
                    data: revenueData.data,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Service Popularity Chart
    const servicePopularityCtx = document.getElementById('servicePopularityChart');
    if (servicePopularityCtx) {
        const serviceData = calculateServicePopularity(bookings, services);
        new Chart(servicePopularityCtx, {
            type: 'doughnut',
            data: {
                labels: serviceData.labels,
                datasets: [{
                    data: serviceData.data,
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#f5576c',
                        '#4facfe',
                        '#00f2fe'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Booking Distribution Chart
    const bookingDistributionCtx = document.getElementById('bookingDistributionChart');
    if (bookingDistributionCtx) {
        const distributionData = calculateBookingDistribution(bookings);
        new Chart(bookingDistributionCtx, {
            type: 'bar',
            data: {
                labels: distributionData.labels,
                datasets: [{
                    label: 'Bookings',
                    data: distributionData.data,
                    backgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

/**
 * Calculate monthly revenue data
 * @param {Array} bookings - Array of bookings
 * @returns {Object} Revenue data for chart
 */
function calculateMonthlyRevenue(bookings) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const revenue = new Array(6).fill(0);
    
    bookings.forEach(booking => {
        if (booking.status === 'completed') {
            const date = new Date(booking.completedAt || booking.date);
            const monthIndex = date.getMonth();
            if (monthIndex >= 0 && monthIndex < 6) {
                revenue[monthIndex] += booking.amount;
            }
        }
    });
    
    return {
        labels: months,
        data: revenue
    };
}

/**
 * Calculate service popularity data
 * @param {Array} bookings - Array of bookings
 * @param {Array} services - Array of services
 * @returns {Object} Service popularity data for chart
 */
function calculateServicePopularity(bookings, services) {
    const serviceCounts = {};
    
    bookings.forEach(booking => {
        const service = services.find(s => s.id === booking.serviceId);
        if (service) {
            serviceCounts[service.name] = (serviceCounts[service.name] || 0) + 1;
        }
    });
    
    return {
        labels: Object.keys(serviceCounts),
        data: Object.values(serviceCounts)
    };
}

/**
 * Calculate booking distribution by day of week
 * @param {Array} bookings - Array of bookings
 * @returns {Object} Booking distribution data for chart
 */
function calculateBookingDistribution(bookings) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const distribution = new Array(7).fill(0);
    
    bookings.forEach(booking => {
        const date = new Date(booking.date);
        const dayIndex = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
        distribution[dayIndex]++;
    });
    
    return {
        labels: days,
        data: distribution
    };
}

// ===== FORM HANDLERS =====

/**
 * Handle login form submission
 */
function handleLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        const role = formData.get('userRole');
        
        // Try normal auth against SAMPLE_DATA/localStorage users
        if (login(username, password, role)) {
            showAlert('Login successful!', 'success');
            setTimeout(() => {
                redirectToDashboard();
            }, 1000);
        } else {
            // Demo-only fallback for roles not present in SAMPLE_DATA (artist, super_admin)
            // SECURITY: Do NOT use this pattern in production.
            if (role === 'artist' || role === 'super_admin') {
                const demoUser = {
                    id: Date.now(),
                    username: username || `${role}@demo.local`,
                    email: username || `${role}@demo.local`,
                    role,
                    firstName: role === 'super_admin' ? 'Super' : 'Artist',
                    lastName: 'Demo',
                    createdAt: new Date().toISOString().slice(0,10)
                };
                currentUser = demoUser;
                isAuthenticated = true;
                localStorage.setItem('currentUser', JSON.stringify(demoUser));
                showAlert('Login successful! (demo)', 'success');
                setTimeout(() => { redirectToDashboard(); }, 400);
            } else {
                showAlert('Invalid credentials. Please try again.', 'error');
            }
        }
    });
}

/**
 * Handle booking form submission
 */
function handleBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData.entries());
        
        try {
            const booking = createBooking(bookingData);
            showAlert('Booking created successfully!', 'success');
            
            // Show booking details in modal
            const modal = document.getElementById('successModal');
            const details = document.getElementById('bookingDetails');
            if (modal && details) {
                details.innerHTML = `
                    <div class="booking-confirmation">
                        <h3>Booking Details</h3>
                        <p><strong>Service:</strong> ${booking.serviceName}</p>
                        <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
                        <p><strong>Time:</strong> ${formatTime(booking.time)}</p>
                        <p><strong>Amount:</strong> ${formatCurrency(booking.amount)}</p>
                        <p><strong>Status:</strong> ${booking.status}</p>
                    </div>
                `;
                showModal('successModal');
            }
            
            form.reset();
        } catch (error) {
            showAlert('Error creating booking. Please try again.', 'error');
        }
    });
}

/**
 * Populate service dropdown
 */
function populateServiceDropdown() {
    const services = getData('services');
    const serviceSelects = document.querySelectorAll('#service, #modalService');
    
    serviceSelects.forEach(select => {
        select.innerHTML = '<option value="">Choose a service</option>';
        services.forEach(service => {
            if (service.status === 'active') {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = `${service.name} - ${formatCurrency(service.price)}`;
                select.appendChild(option);
            }
        });
    });
}

/**
 * Populate artist dropdown
 */
function populateArtistDropdown() {
    const artists = getData('artists');
    const artistSelects = document.querySelectorAll('#artist, #modalArtist');
    
    artistSelects.forEach(select => {
        select.innerHTML = '<option value="">Any available artist</option>';
        artists.forEach(artist => {
            if (artist.status === 'active') {
                const option = document.createElement('option');
                option.value = artist.id;
                option.textContent = `${artist.name} - ${artist.specialization}`;
                select.appendChild(option);
            }
        });
    });
}

/**
 * Populate time slots
 */
function populateTimeSlots() {
    const timeSelects = document.querySelectorAll('#time, #modalTime');
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30'
    ];
    
    timeSelects.forEach(select => {
        select.innerHTML = '<option value="">Select time</option>';
        timeSlots.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = formatTime(time);
            select.appendChild(option);
        });
    });
}

/**
 * Load services for homepage
 */
function loadServices() {
    const services = getData('services');
    const servicesGrid = document.getElementById('servicesGrid');
    const pricingTable = document.getElementById('pricingTable');
    
    if (servicesGrid) {
        servicesGrid.innerHTML = services
            .filter(service => service.status === 'active')
            .map(service => `
                <div class="service-card">
                    <i class="fas fa-${getServiceIcon(service.category)}"></i>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-price">${formatCurrency(service.price)}</div>
                </div>
            `).join('');
    }
    
    if (pricingTable) {
        const tbody = pricingTable.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = services
                .filter(service => service.status === 'active')
                .map(service => `
                    <tr>
                        <td>${service.name}</td>
                        <td>${service.category}</td>
                        <td>${service.duration} min</td>
                        <td class="price">${formatCurrency(service.price)}</td>
                    </tr>
                `).join('');
        }
    }
}

/**
 * Get icon for service category
 * @param {string} category - Service category
 * @returns {string} Icon class name
 */
function getServiceIcon(category) {
    const icons = {
        'Hair': 'cut',
        'Skin': 'spa',
        'Nails': 'hand-paper',
        'Makeup': 'paint-brush',
        'Spa': 'leaf'
    };
    return icons[category] || 'star';
}

// ===== DASHBOARD NAVIGATION =====

/**
 * Handle dashboard navigation
 */
function handleDashboardNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// ===== MODAL HANDLERS =====

/**
 * Handle modal close buttons
 */
function handleModalClose() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize sample data
    initializeSampleData();
    
    // Check authentication
    checkAuthentication();
    
    // Handle different pages
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'login.html':
            handleLoginForm();
            break;
        case 'index.html':
            loadServices();
            populateServiceDropdown();
            populateArtistDropdown();
            populateTimeSlots();
            handleBookingForm();
            break;
        case 'admin_dashboard.html':
            if (!isAuthenticated || currentUser?.role !== 'admin') {
                window.location.href = 'login.html';
                return;
            }
            loadDashboardStats();
            loadRecentBookings();
            handleDashboardNavigation();
            break;
        case 'customer_dashboard.html':
            if (!isAuthenticated || currentUser?.role !== 'customer') {
                window.location.href = 'login.html';
                return;
            }
            loadCustomerDashboard();
            handleDashboardNavigation();
            break;
        case 'owner_dashboard.html':
            if (!isAuthenticated || currentUser?.role !== 'owner') {
                window.location.href = 'login.html';
                return;
            }
            loadOwnerDashboard();
            handleDashboardNavigation();
            break;
    }
    
    // Common handlers
    handleModalClose();
    handleLogout();
    wireGlobalNav();
}

/**
 * Load customer dashboard data
 */
function loadCustomerDashboard() {
    // Load customer stats
    const bookings = getData('bookings');
    const customerBookings = bookings.filter(b => b.customerId === currentUser.id);
    const upcomingBookings = customerBookings.filter(b => 
        b.status === 'confirmed' && new Date(b.date) >= new Date()
    );
    
    // Update stats
    const elements = {
        customerName: document.getElementById('customerName'),
        upcomingBookings: document.getElementById('upcomingBookings'),
        totalBookings: document.getElementById('totalBookings'),
        loyaltyPoints: document.getElementById('loyaltyPoints'),
        currentPoints: document.getElementById('currentPoints')
    };
    
    if (elements.customerName) elements.customerName.textContent = currentUser.firstName;
    if (elements.upcomingBookings) elements.upcomingBookings.textContent = upcomingBookings.length;
    if (elements.totalBookings) elements.totalBookings.textContent = customerBookings.length;
    if (elements.loyaltyPoints) elements.loyaltyPoints.textContent = currentUser.loyaltyPoints || 0;
    if (elements.currentPoints) elements.currentPoints.textContent = currentUser.loyaltyPoints || 0;
    
    // Load current bookings
    loadCurrentBookings();
    
    // Load booking history
    loadBookingHistory();
    
    // Load profile data
    loadProfileData();
    
    // Load loyalty points history
    loadLoyaltyPointsHistory();
}

/**
 * Load owner dashboard data
 */
function loadOwnerDashboard() {
    loadDashboardStats();
    initializeCharts();
    loadOwnerAnalytics();
}

/**
 * Load current bookings for customer
 */
function loadCurrentBookings() {
    const bookings = getData('bookings');
    const customerBookings = bookings
        .filter(b => b.customerId === currentUser.id && b.status !== 'cancelled' && b.status !== 'completed')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const container = document.getElementById('currentBookings');
    if (container) {
        if (customerBookings.length === 0) {
            container.innerHTML = '<p>No current bookings found.</p>';
            return;
        }
        
        container.innerHTML = customerBookings.map(booking => `
            <div class="booking-card">
                <h4>${booking.serviceName}</h4>
                <div class="booking-details">
                    <div class="booking-detail">
                        <strong>Date:</strong> ${formatDate(booking.date)}
                    </div>
                    <div class="booking-detail">
                        <strong>Time:</strong> ${formatTime(booking.time)}
                    </div>
                    <div class="booking-detail">
                        <strong>Artist:</strong> ${booking.artistName}
                    </div>
                    <div class="booking-detail">
                        <strong>Amount:</strong> ${formatCurrency(booking.amount)}
                    </div>
                </div>
                <div class="booking-actions">
                    <button class="btn btn-danger btn-sm" onclick="cancelBooking(${booking.id})">Cancel</button>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Load booking history for customer
 */
function loadBookingHistory() {
    const bookings = getData('bookings');
    const customerBookings = bookings
        .filter(b => b.customerId === currentUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const tbody = document.querySelector('#historyTable tbody');
    if (tbody) {
        tbody.innerHTML = customerBookings.map(booking => `
            <tr>
                <td>${booking.serviceName}</td>
                <td>${booking.artistName}</td>
                <td>${formatDate(booking.date)}</td>
                <td>${formatTime(booking.time)}</td>
                <td>${formatCurrency(booking.amount)}</td>
                <td><span class="status-${booking.status}">${booking.status}</span></td>
                <td>${getBookingRating(booking.id)}</td>
            </tr>
        `).join('');
    }
}

/**
 * Get booking rating
 * @param {number} bookingId - Booking ID
 * @returns {string} Rating display
 */
function getBookingRating(bookingId) {
    const reviews = getData('reviews');
    const review = reviews.find(r => r.bookingId === bookingId);
    if (review) {
        return '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    }
    return '-';
}

/**
 * Load profile data
 */
function loadProfileData() {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Populate form with current user data
    Object.keys(currentUser).forEach(key => {
        const input = form.querySelector(`[name="profile${key.charAt(0).toUpperCase() + key.slice(1)}"]`);
        if (input) {
            input.value = currentUser[key] || '';
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const users = getData('users');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex !== -1) {
            // Update user data
            Object.keys(currentUser).forEach(key => {
                const input = form.querySelector(`[name="profile${key.charAt(0).toUpperCase() + key.slice(1)}"]`);
                if (input) {
                    users[userIndex][key] = input.value;
                }
            });
            
            saveData('users', users);
            currentUser = users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showAlert('Profile updated successfully!', 'success');
        }
    });
}

/**
 * Load loyalty points history
 */
function loadLoyaltyPointsHistory() {
    const pointsHistory = getData('pointsHistory') || [];
    const customerPoints = pointsHistory
        .filter(p => p.customerId === currentUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const tbody = document.querySelector('#pointsHistoryTable tbody');
    if (tbody) {
        tbody.innerHTML = customerPoints.map(point => `
            <tr>
                <td>${formatDate(point.date)}</td>
                <td>${point.reason}</td>
                <td>${point.points > 0 ? '+' : ''}${point.points}</td>
                <td>${point.balance}</td>
            </tr>
        `).join('');
    }
}

/**
 * Load owner analytics
 */
function loadOwnerAnalytics() {
    // This would load various analytics data for the owner dashboard
    // Implementation depends on specific requirements
}

/**
 * Handle logout
 */
function handleLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
}

// ===== EVENT LISTENERS =====

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
    // Reinitialize charts if needed
    if (window.location.pathname.includes('owner_dashboard.html')) {
        // Chart.js handles responsive resizing automatically
    }
});

// ===== FRONTEND-ONLY NEW PAGES (Index modal login + new dashboards) =====
// This block adds support for index.html modal login and the pages:
// super_admin.html, artist_dashboard.html, customer_dashboard.html

(function addFrontendOnlyRouting() {
    // Extend redirect mapping for new roles/pages
    function redirectToNewDashboard(role) {
        switch (role) {
            case 'super_admin':
                window.location.href = 'super_admin.html';
                return;
            case 'artist':
                window.location.href = 'artist_dashboard.html';
                return;
            case 'customer':
                window.location.href = 'customer_dashboard.html';
                return;
        }
    }

    // Safe getter for stored session
    function getSession() {
        try {
            const userRaw = localStorage.getItem('currentUser');
            return userRaw ? JSON.parse(userRaw) : null;
        } catch { return null; }
    }

    // Initialize login modal on index.html
    function initIndexLoginModal() {
        const loginBtn = document.getElementById('loginBtn');
        const modal = document.getElementById('loginModal');
        const form = document.getElementById('loginForm');
        const closeEl = modal ? modal.querySelector('.close') : null;

        if (loginBtn && modal) {
            loginBtn.addEventListener('click', () => { modal.style.display = 'block'; });
        }
        if (closeEl && modal) {
            closeEl.addEventListener('click', () => { modal.style.display = 'none'; });
        }
        window.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = (document.getElementById('loginEmail') || {}).value || '';
            const password = (document.getElementById('loginPassword') || {}).value || '';
            const role = (document.getElementById('loginRole') || {}).value || '';

            if (!email || !password || !role) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }

            // Demo-only: accept any email/password; attach a demo user profile
            // Prefer mapping to SAMPLE_DATA if possible
            let mappedUser = null;
            const users = getData('users');
            // try to map by role
            mappedUser = users.find(u => (role === 'customer' && u.role === 'customer'))
                       || users.find(u => (role === 'artist' && (u.role === 'owner' || u.role === 'admin')))
                       || users.find(u => (role === 'super_admin' && (u.role === 'admin')))
                       || null;

            const demoUser = mappedUser || {
                id: Date.now(),
                username: email,
                email,
                role,
                firstName: role === 'super_admin' ? 'Super' : role === 'artist' ? 'Artist' : 'Customer',
                lastName: 'Demo',
                phone: '+91 90000 00000',
                createdAt: new Date().toISOString().slice(0,10)
            };

            currentUser = demoUser;
            isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(demoUser));

            // Close modal and redirect
            if (modal) modal.style.display = 'none';
            showAlert('Login successful!', 'success');
            setTimeout(() => redirectToNewDashboard(role), 300);
        });
    }

    // Guards for new dashboards
    function guardPage(requiredRole, redirect = 'index.html') {
        const session = getSession();
        if (!session || session.role !== requiredRole) {
            window.location.href = redirect;
            return false;
        }
        currentUser = session;
        isAuthenticated = true;
        return true;
    }

    // Super Admin: populate overview stats, tables, and charts (using SAMPLE_DATA/localStorage)
    function initSuperAdmin() {
        if (!guardPage('super_admin')) return;

        const users = getData('users');
        const bookings = getData('bookings');
        const artists = getData('artists');

        const byId = (id) => document.getElementById(id);
        if (byId('totalUsers')) byId('totalUsers').textContent = String(users.length);
        if (byId('totalArtists')) byId('totalArtists').textContent = String((artists || []).length);
        if (byId('totalBookings')) byId('totalBookings').textContent = String(bookings.length);
        if (byId('totalRevenue')) {
            const revenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
            byId('totalRevenue').textContent = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(revenue);
        }

        // Users table
        const usersTBody = byId('usersTableBody');
        if (usersTBody) {
            usersTBody.innerHTML = users.map(u => `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.firstName || ''} ${u.lastName || ''}</td>
                    <td>${u.email || u.username}</td>
                    <td>${u.phone || '-'}</td>
                    <td><span class="role-badge">${(u.role || '').toUpperCase()}</span></td>
                    <td><span class="status-badge ${u.isActive === false ? 'inactive' : 'active'}">${u.isActive === false ? 'INACTIVE' : 'ACTIVE'}</span></td>
                    <td>${u.createdAt || '-'}</td>
                    <td>
                        <button class="btn-sm btn-primary" data-action="edit-user" data-id="${u.id}">Edit</button>
                        <button class="btn-sm btn-danger" data-action="delete-user" data-id="${u.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
        }

        // Artists table (from SAMPLE_DATA.artists)
        const artistsTBody = byId('artistsTableBody');
        if (artistsTBody && artists) {
            artistsTBody.innerHTML = artists.map(a => `
                <tr>
                    <td>${a.id}</td>
                    <td>${a.name}</td>
                    <td>-</td>
                    <td>${a.specialization}</td>
                    <td>${a.rating || 0}</td>
                    <td><span class="status-badge ${a.status === 'active' ? 'active' : 'inactive'}">${(a.status || 'active').toUpperCase()}</span></td>
                    <td>${new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0}).format((a.earnings||0))}</td>
                    <td>
                        <button class="btn-sm btn-primary" data-action="edit-artist" data-id="${a.id}">Edit</button>
                        <button class="btn-sm btn-danger" data-action="delete-artist" data-id="${a.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
        }

        // Bookings table
        const bookingsTBody = byId('bookingsTableBody');
        if (bookingsTBody) {
            bookingsTBody.innerHTML = bookings.map(b => `
                <tr>
                    <td>#${b.id}</td>
                    <td>${b.customerName}</td>
                    <td>${b.artistName}</td>
                    <td>${b.serviceName || b.service}</td>
                    <td>${b.date} ${b.time || ''}</td>
                    <td>${new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0}).format(b.amount||0)}</td>
                    <td><span class="status-badge ${b.status}">${(b.status||'pending').toUpperCase()}</span></td>
                    <td>
                        <button class="btn-sm btn-primary" data-action="view-booking" data-id="${b.id}">View</button>
                        <button class="btn-sm btn-danger" data-action="cancel-booking" data-id="${b.id}">Cancel</button>
                    </td>
                </tr>
            `).join('');
        }

        // Charts
        if (typeof Chart !== 'undefined') {
            const trends = document.getElementById('bookingTrendsChart');
            if (trends) {
                new Chart(trends, {
                    type: 'line',
                    data: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets: [{ label: 'Bookings', data: [5,9,12,7,15,20], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,0.1)', tension: 0.4 }] },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
            const revenue = document.getElementById('revenueChart');
            if (revenue) {
                new Chart(revenue, {
                    type: 'bar',
                    data: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets: [{ label: 'Revenue (₹)', data: [8000,15000,12000,22000,18000,25000], backgroundColor: '#4ecdc4' }] },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
        }

        // Simple inline CRUD actions (demo-only)
        document.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const action = t.getAttribute('data-action');
            const id = t.getAttribute('data-id');
            if (!action || !id) return;
            if (action === 'delete-user') {
                const list = getData('users').filter(u => String(u.id) !== String(id));
                saveData('users', list);
                showAlert('User deleted (demo).', 'success');
                initSuperAdmin();
            }
            if (action === 'delete-artist') {
                const list = (getData('artists')||[]).filter(a => String(a.id) !== String(id));
                saveData('artists', list);
                showAlert('Artist deleted (demo).', 'success');
                initSuperAdmin();
            }
            if (action === 'cancel-booking') {
                const list = getData('bookings').map(b => String(b.id) === String(id) ? { ...b, status: 'cancelled' } : b);
                saveData('bookings', list);
                showAlert('Booking cancelled (demo).', 'success');
                initSuperAdmin();
            }
        }, { once: true });
    }

    // Artist dashboard minimal init
    function initArtist() {
        if (!guardPage('artist')) return;
        const nameEl = document.getElementById('artistName');
        if (nameEl) nameEl.textContent = `Welcome, ${currentUser.firstName || 'Artist'}`;

        // Populate bookings list for this artist (map owner/admin to artist for demo)
        const bookings = getData('bookings').filter(b => (b.artistId || 0) > 0);
        const container = document.getElementById('bookingsContainer');
        if (container) {
            container.innerHTML = bookings.map(b => `
                <div class="booking-card">
                    <div class="booking-header">
                        <h4>${b.serviceName || b.service} - ${b.customerName}</h4>
                        <span class="booking-status ${b.status}">${(b.status||'pending').toUpperCase()}</span>
                    </div>
                    <div class="booking-details">
                        <div class="booking-detail"><strong>Date:</strong> ${b.date}</div>
                        <div class="booking-detail"><strong>Time:</strong> ${b.time || '-'}</div>
                        <div class="booking-detail"><strong>Amount:</strong> ${new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0}).format(b.amount||0)}</div>
                        <div class="booking-detail"><strong>Address:</strong> ${b.location || '-'}</div>
                    </div>
                    <div class="booking-actions">
                        ${b.status==='pending' ? `<button class="btn-success" data-ast="accept" data-id="${b.id}">Accept</button>
                        <button class="btn-danger" data-ast="reject" data-id="${b.id}">Reject</button>` : ''}
                        ${b.status==='confirmed' ? `<button class="btn-primary" data-ast="complete" data-id="${b.id}">Mark Complete</button>` : ''}
                    </div>
                </div>
            `).join('');
            container.addEventListener('click', (e) => {
                const t = e.target;
                if (!(t instanceof HTMLElement)) return;
                const action = t.getAttribute('data-ast');
                const id = t.getAttribute('data-id');
                if (!action || !id) return;
                const list = getData('bookings');
                const updated = list.map(b => {
                    if (String(b.id) !== String(id)) return b;
                    if (action==='accept') return { ...b, status: 'confirmed' };
                    if (action==='reject') return { ...b, status: 'cancelled' };
                    if (action==='complete') return { ...b, status: 'completed' };
                    return b;
                });
                saveData('bookings', updated);
                showAlert('Booking updated (demo).', 'success');
                initArtist();
            }, { once: true });
        }
    }

    // Customer minimal init: populate artists grid with SAMPLE_DATA.artists
    function initCustomer() {
        if (!guardPage('customer')) return;
        const artists = getData('artists');
        const grid = document.getElementById('artistsGrid');
        if (grid && artists) {
            grid.innerHTML = artists.map(a => `
                <div class="artist-card">
                    <div class="artist-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="artist-info">
                        <h3>${a.name}</h3>
                        <div class="artist-rating"><div class="stars">${'★★★★★'.slice(0, Math.round(a.rating||0))}</div><span>${a.rating||0}</span></div>
                        <p class="artist-location">${a.specialization}</p>
                        <p class="artist-bio">${a.bio}</p>
                    </div>
                    <div class="artist-actions">
                        <button class="btn-primary">Book Now</button>
                        <button class="btn-secondary">Message</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Hook into existing initializeApp without breaking older pages
    const originalInitializeApp = initializeApp;
    initializeApp = function() {
        // Ensure sample data is present for artists array too
        try {
            const all = JSON.parse(localStorage.getItem('beautyParlourData') || '{}');
            if (!all.artists && SAMPLE_DATA && SAMPLE_DATA.artists) {
                all.artists = SAMPLE_DATA.artists;
                localStorage.setItem('beautyParlourData', JSON.stringify(all));
            }
        } catch {}

        originalInitializeApp();
        const page = window.location.pathname.split('/').pop();
        switch (page) {
            case 'index.html':
            case '':
                initIndexLoginModal();
                break;
            case 'super_admin.html':
                initSuperAdmin();
                break;
            case 'artist_dashboard.html':
                initArtist();
                break;
            case 'customer_dashboard.html':
                initCustomer();
                break;
        }
    };
})();

// SECURITY NOTE: Demo-only localStorage auth; do NOT use in production.

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.cancelBooking = cancelBooking;
window.showModal = showModal;
window.hideModal = hideModal;

// ===== SIMPLE NAV WIRING (frontend-only) =====
function wireGlobalNav() {
    // All navigation is local-file based for demo/local development
    const byId = (id) => document.getElementById(id);
    const map = [
        { id: 'navHomeLink', to: 'index.html' },
        { id: 'navArtistLink', to: 'artist_dashboard.html' },
        { id: 'navSuperAdminLink', to: 'super_admin.html' },
        { id: 'navLoginLink', to: 'login.html' },
        { id: 'goHomeBtn', to: 'index.html' },
        { id: 'goArtistBtn', to: 'artist_dashboard.html' },
        { id: 'goSuperAdminBtn', to: 'super_admin.html' },
        { id: 'goLoginPageBtn', to: 'login.html' }
    ];
    map.forEach(({ id, to }) => {
        const el = byId(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                // SECURITY: No auth checks here; purely client-side navigation.
                window.location.href = to;
            });
        }
    });
}
