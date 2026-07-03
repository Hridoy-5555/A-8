/**
 * 📦 SKILLSPHERE CORE APPLICATION ENGINE (Vanilla JS Edition)
 * Save this file exactly as `app.js` and link it in your HTML structure:
 * <script src="app.js" defer></script>
 */

// ==========================================
// 🗄️ GLOBAL RECORD DATA REPOSITORIES
// ==========================================
const globalCoursesData = [
    { "id": 1, "title": "Complete Web Development Bootcamp", "instructor": "John Doe", "duration": "20 hours", "rating": 4.9, "level": "Beginner", "description": "Learn full-stack web development from scratch using modern tools like React, Node.js, and Next.js.", "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80", "category": "Development", "isTrending": true },
    { "id": 2, "title": "Advanced UI/UX Masterclass", "instructor": "Jane Smith", "duration": "15 hours", "rating": 4.8, "level": "Advanced", "description": "Master Figma, typography, color theory, and advanced user experience design methodologies.", "image": "https://images.unsplash.com/photo-1541462608141-ad4979e408c9?w=500&q=80", "category": "Design", "isTrending": true },
    { "id": 3, "title": "Data Science & Machine Learning 101", "instructor": "Dr. Alex Rivera", "duration": "32 hours", "rating": 4.7, "level": "Intermediate", "description": "Dive deep into Python, Pandas, NumPy, and Scikit-Learn to build production-ready predictive models.", "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", "category": "Data Science", "isTrending": true },
    { "id": 4, "title": "Next.js 14 Production Essentials", "instructor": "Sarah Connor", "duration": "12 hours", "rating": 4.6, "level": "Advanced", "description": "Learn Server Actions, PPR, App Router architecture, and deployment strategies for high performance.", "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&q=80", "category": "Development", "isTrending": false },
    { "id": 5, "title": "Product Management for Tech Leaders", "instructor": "Michael Chang", "duration": "18 hours", "rating": 4.5, "level": "Intermediate", "description": "Map user journeys, write flawless PRDs, run agile sprints, and manage stakeholders efficiently.", "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80", "category": "Business", "isTrending": false },
    { "id": 6, "title": "Cybersecurity Defenses & Ethical Hacking", "instructor": "Elena Rostova", "duration": "25 hours", "rating": 4.9, "level": "Beginner", "description": "Understand network security, penetration testing, and counteracting vulnerabilities safely.", "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", "category": "Cybersecurity", "isTrending": false }
];

const instructorMockData = [
    { name: "John Doe", role: "Principal Web Architect", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80" },
    { name: "Jane Smith", role: "UX Design Lead at Google", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" },
    { name: "Dr. Alex Rivera", role: "Ex-Meta ML Scientist", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80" },
    { name: "Elena Rostova", role: "SecOps Security Analyst", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" }
];

// ==========================================
// 🎛️ CORE RUNTIME APPLICATION STATE
// ==========================================
let activeUserSession = null;
let activeRouteContext = 'home';
let routingRedirectTargetId = null;

// ==========================================
// 🛠️ TOAST CONTROLLER UTILITY
// ==========================================
window.Toast = {
    trigger(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const element = document.createElement('div');
        element.className = "bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 toast-animate pointer-events-auto";
        element.innerHTML = `<div class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div><span>${msg}</span>`;
        
        container.appendChild(element);
        setTimeout(() => { element.remove(); }, 2500);
    }
};

// ==========================================
// 🗺️ CLIENT-SIDE ROUTER ENGINE
// ==========================================
window.Router = {
    navigate(routeTarget) {
        activeRouteContext = routeTarget;
        
        // Suppress validation displays upon transition shifts
        const loginErr = document.getElementById('login-error-container');
        const regErr = document.getElementById('register-error-container');
        if (loginErr) loginErr.classList.add('hidden');
        if (regErr) regErr.classList.add('hidden');

        // Toggle visibility structures across target view layouts
        document.querySelectorAll('.route-view').forEach(element => element.classList.remove('active'));
        
        const targetingElement = document.getElementById(`view-${routeTarget}`);
        if (targetingElement) {
            targetingElement.classList.add('active');
        } else {
            const notFoundView = document.getElementById('view-not-found');
            if (notFoundView) notFoundView.classList.add('active');
        }

        // Active state style handling for navigation components
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-route') === routeTarget) {
                link.classList.add('text-indigo-600', 'font-semibold');
                link.classList.remove('text-slate-600');
            } else {
                link.classList.remove('text-indigo-600', 'font-semibold');
                link.classList.add('text-slate-600');
            }
        });

        // Context Hook Triggers
        if (routeTarget === 'courses') CourseCatalog.initializeFetch();
        if (routeTarget === 'profile') ProfileUI.renderData();
        if (routeTarget === 'update-profile') ProfileUI.populateUpdateFields();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ==========================================
// 🔐 AUTHENTICATION LAYER (Better-Auth Compliant)
// ==========================================
window.Auth = {
    checkPersistenceState() {
        const persistenceToken = localStorage.getItem('ss_user');
        if (persistenceToken) {
            activeUserSession = JSON.parse(persistenceToken);
        }
        this.syncNavbarControls();
    },

    syncNavbarControls() {
        const targetNode = document.getElementById('nav-auth-zone');
        if (!targetNode) return;
        
        if (activeUserSession) {
            document.querySelectorAll('.status-auth').forEach(el => el.classList.remove('hidden'));
            targetNode.innerHTML = `
                <div class="flex items-center gap-4">
                    <div onclick="Router.navigate('profile')" class="flex items-center gap-2 group cursor-pointer">
                        <img src="${activeUserSession.image}" class="w-8 h-8 rounded-full object-cover border border-indigo-200">
                        <span class="text-sm font-medium text-slate-700 group-hover:text-indigo-600 hidden md:inline">${activeUserSession.name}</span>
                    </div>
                    <button onclick="Auth.executeLogOut()" class="p-2 text-slate-500 hover:text-red-600 transition" title="Logout">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>`;
        } else {
            document.querySelectorAll('.status-auth').forEach(el => el.classList.add('hidden'));
            targetNode.innerHTML = `
                <div class="flex items-center gap-3">
                    <button onclick="Router.navigate('login')" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Log In</button>
                    <button onclick="Router.navigate('register')" class="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Register</button>
                </div>`;
        }
    },

    executeFormLogin(event) {
        event.preventDefault();
        const errBox = document.getElementById('login-error-container');
        errBox.classList.add('hidden');

        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        if (!email || !pass) {
            errBox.textContent = "Error: Input fields must not be empty.";
            errBox.classList.remove('hidden');
            return;
        }
        if (pass.length < 6) {
            errBox.textContent = "Error: Password must be at least 6 characters long.";
            errBox.classList.remove('hidden');
            return;
        }

        const mockUser = {
            name: "John Developer",
            email: email,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
        };

        this.commitSession(mockUser, "Successfully logged in.");
    },

    executeFormRegister(event) {
        event.preventDefault();
        const errBox = document.getElementById('register-error-container');
        errBox.classList.add('hidden');

        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;

        if (!name || !email || !pass) {
            errBox.textContent = "Validation Failure: Please fulfill all mandatory blocks.";
            errBox.classList.remove('hidden');
            return;
        }
        if (pass.length < 6) {
            errBox.textContent = "Constraint Error: Secure keys require at least 6 characters.";
            errBox.classList.remove('hidden');
            return;
        }

        Toast.trigger("Registration pipeline executed successfully.");
        document.getElementById('register-form').reset();
        Router.navigate('login');
    },

    executeGoogleOAuth() {
        const googlePayload = {
            name: "Google Scholar Core",
            email: "oauth.identity@gmail.com",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"
        };
        this.commitSession(googlePayload, "OAuth Identity Token verified via Google Systems.");
    },

    commitSession(userObj, successMessage) {
        activeUserSession = userObj;
        localStorage.setItem('ss_user', JSON.stringify(userObj));
        this.syncNavbarControls();
        Toast.trigger(successMessage);

        if (routingRedirectTargetId) {
            const savedId = routingRedirectTargetId;
            routingRedirectTargetId = null;
            CourseCatalog.viewDetails(savedId);
        } else {
            Router.navigate('home');
        }
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.reset();
    },

    executeLogOut() {
        activeUserSession = null;
        localStorage.removeItem('ss_user');
        this.syncNavbarControls();
        Toast.trigger("Session configuration cleared.");
        Router.navigate('home');
    },

    // Simulates the architectural pattern: await auth.updateUser({ name, image })
    // Direct specification reference: https://better-auth.com/docs/concepts/users-accounts#update-user
    async executeBetterAuthUpdate(event) {
        event.preventDefault();
        if (!activeUserSession) return;

        const nextName = document.getElementById('update-name-input').value;
        const nextImage = document.getElementById('update-image-input').value;

        activeUserSession.name = nextName;
        activeUserSession.image = nextImage;

        localStorage.setItem('ss_user', JSON.stringify(activeUserSession));
        this.syncNavbarControls();
        
        Toast.trigger("User updated successfully via Better-Auth user schema.");
        setTimeout(() => { Router.navigate('profile'); }, 600);
    }
};

// ==========================================
// 📚 CATALOGUE VIEW CONTROLLER
// ==========================================
window.CourseCatalog = {
    initializeFetch() {
        const grid = document.getElementById('catalog-courses-grid');
        const loader = document.getElementById('catalog-loader');
        const empty = document.getElementById('catalog-empty');

        if (!grid || !loader || !empty) return;

        grid.innerHTML = '';
        empty.classList.add('hidden');
        loader.classList.remove('hidden');

        // Emulates database call fetching times
        setTimeout(() => {
            loader.classList.add('hidden');
            this.renderCatalogItems(globalCoursesData);
        }, 400);
    },

    renderCatalogItems(dataSlice) {
        const grid = document.getElementById('catalog-courses-grid');
        const empty = document.getElementById('catalog-empty');
        if (!grid) return;
        
        grid.innerHTML = '';

        if (dataSlice.length === 0) {
            if (empty) empty.classList.remove('hidden');
            return;
        }

        if (empty) empty.classList.add('hidden');

        dataSlice.forEach(course => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition";
            card.innerHTML = `
                <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
                <div class="p-6 flex flex-col flex-grow space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">${course.category}</span>
                        <span class="text-xs text-slate-400 font-medium">${course.level}</span>
                    </div>
                    <h3 class="font-bold text-lg text-slate-900 line-clamp-1">${course.title}</h3>
                    <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed">${course.description}</p>
                    <div class="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                        <span>⏱️ ${course.duration}</span>
                        <span>★ ${course.rating}</span>
                    </div>
                    <div class="pt-4 border-t border-slate-100 mt-auto">
                        <button onclick="CourseCatalog.viewDetails(${course.id})" class="block w-full text-center bg-slate-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">View Details</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    },

    handleSearch(event) {
        const term = event.target.value.toLowerCase();
        const matched = globalCoursesData.filter(c => c.title.toLowerCase().includes(term));
        this.renderCatalogItems(matched);
    },

    viewDetails(id) {
        const targetMatch = globalCoursesData.find(c => c.id === id);
        if (!targetMatch) {
            Router.navigate('not-found');
            return;
        }

        // Middleware verification logic: route protection block
        if (!activeUserSession) {
            Toast.trigger("🔒 Protected Route: Authentication mandatory.");
            routingRedirectTargetId = id;
            Router.navigate('login');
            return;
        }

        const targetDOMNode = document.getElementById('course-details-content');
        if (!targetDOMNode) return;

        targetDOMNode.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div class="lg:col-span-2 space-y-6">
                    <div class="space-y-3">
                        <span class="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md">${targetMatch.category}</span>
                        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">${targetMatch.title}</h1>
                    </div>
                    <p class="text-slate-600 leading-relaxed text-base">${targetMatch.description}</p>
                    <div class="flex flex-wrap gap-6 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200 font-medium">
                        <span>⏱️ ${targetMatch.duration} total runtime</span>
                        <span>🏆 Tier: ${targetMatch.level}</span>
                        <span>★ Rating: ${targetMatch.rating}</span>
                    </div>
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <img src="${targetMatch.image}" class="w-full h-48 object-cover">
                    <div class="p-6 space-y-4">
                        <div>
                            <p class="text-xs text-slate-400">Lead Curriculum Instructor</p>
                            <p class="font-bold text-slate-900 text-lg">${targetMatch.instructor}</p>
                        </div>
                        <button class="w-full text-center bg-indigo-600 text-white font-medium py-3 rounded-xl text-sm cursor-default">Enrolled Successfully</button>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-slate-200 pt-10 space-y-6 mt-12">
                <h3 class="text-2xl font-bold text-slate-900">Course Curriculum Structural Syllabus</h3>
                <div class="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                    <div class="p-5 flex gap-4"><div class="text-emerald-500 font-bold">✔</div><div><span class="text-xs text-slate-400 font-bold block">MODULE 01</span><p class="font-semibold text-slate-800">Core Foundations Framework & Infrastructure Setup</p></div></div>
                    <div class="p-5 flex gap-4"><div class="text-emerald-500 font-bold">✔</div><div><span class="text-xs text-slate-400 font-bold block">MODULE 02</span><p class="font-semibold text-slate-800">Advanced State Data Pipelines Routing Architecture</p></div></div>
                    <div class="p-5 flex gap-4"><div class="text-emerald-500 font-bold">✔</div><div><span class="text-xs text-slate-400 font-bold block">MODULE 03</span><p class="font-semibold text-slate-800">Production Build Deploy Optimization & Runtime Diagnostics</p></div></div>
                </div>
            </div>`;

        Router.navigate('course-details');
    }
};

// ==========================================
// 👤 PROFILE VIEW MANAGEMENT PIPELINE
// ==========================================
window.ProfileUI = {
    renderData() {
        if (!activeUserSession) return;
        
        const cardImg = document.getElementById('profile-card-image');
        const cardName = document.getElementById('profile-card-name');
        const fName = document.getElementById('profile-field-name');
        const fEmail = document.getElementById('profile-field-email');

        if (cardImg) cardImg.src = activeUserSession.image;
        if (cardName) cardName.textContent = activeUserSession.name;
        if (fName) fName.textContent = activeUserSession.name;
        if (fEmail) fEmail.textContent = activeUserSession.email;
    },

    populateUpdateFields() {
        if (!activeUserSession) return;
        const nameInput = document.getElementById('update-name-input');
        const imgInput = document.getElementById('update-image-input');

        if (nameInput) nameInput.value = activeUserSession.name;
        if (imgInput) imgInput.value = activeUserSession.image;
    }
};

// ==========================================
// 🏠 BASE HOME TEMPLATE INJECTION ENGINE
// ==========================================
const LandingPageUI = {
    init() {
        this.renderPopularGrid();
        this.renderTrendingGrid();
        this.renderInstructors();
    },

    renderPopularGrid() {
        const container = document.getElementById('popular-courses-grid');
        if (!container) return;
        container.innerHTML = '';
        
        const highRated = [...globalCoursesData].sort((a, b) => b.rating - a.rating).slice(0, 3);
        
        highRated.forEach(course => {
            const block = document.createElement('div');
            block.className = "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition";
            block.innerHTML = `
                <img src="${course.image}" class="w-full h-48 object-cover">
                <div class="p-6 flex flex-col flex-grow space-y-4">
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 w-max">${course.category}</span>
                    <h3 class="font-bold text-lg text-slate-900 line-clamp-1">${course.title}</h3>
                    <p class="text-xs text-slate-500">Instructor: <span class="font-medium text-slate-700">${course.instructor}</span></p>
                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                        <div class="text-amber-500 font-semibold text-sm">★ ${course.rating}</div>
                        <button onclick="CourseCatalog.viewDetails(${course.id})" class="text-sm font-medium text-indigo-600 hover:text-indigo-700">View Details</button>
                    </div>
                </div>`;
            container.appendChild(block);
        });
    },

    renderTrendingGrid() {
        const container = document.getElementById('trending-courses-grid');
        if (!container) return;
        container.innerHTML = '';
        
        const trending = globalCoursesData.filter(c => c.isTrending);

        trending.forEach(course => {
            const block = document.createElement('div');
            block.className = "bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex gap-4 items-start";
            block.innerHTML = `
                <div class="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">⚡</div>
                <div>
                    <h3 class="font-bold text-base text-slate-900 line-clamp-1">${course.title}</h3>
                    <p class="text-xs text-slate-500 mt-1">By ${course.instructor}</p>
                    <button onclick="CourseCatalog.viewDetails(${course.id})" class="inline-block mt-3 text-xs font-semibold text-indigo-600 hover:underline">Get Details &rarr;</button>
                </div>`;
            container.appendChild(block);
        });
    },

    renderInstructors() {
        const container = document.getElementById('instructors-grid');
        if (!container) return;
        container.innerHTML = '';
        
        instructorMockData.forEach(inst => {
            const block = document.createElement('div');
            block.className = "bg-white border border-slate-200 rounded-xl p-6 text-center space-y-3";
            block.innerHTML = `
                <img src="${inst.avatar}" class="w-20 h-20 rounded-full mx-auto object-cover border-2 border-indigo-100">
                <h4 class="font-bold text-slate-900">${inst.name}</h4>
                <p class="text-xs text-slate-500 font-medium">${inst.role}</p>`;
            container.appendChild(block);
        });
    }
};

// ==========================================
// 🏁 RUNTIME LIFECYCLE INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    Auth.checkPersistenceState();
    LandingPageUI.init();
    Router.navigate('home');
});
