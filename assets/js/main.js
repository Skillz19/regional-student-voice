document.addEventListener('DOMContentLoaded', () => {
    const allEvents = [
        {
            date: '2026-03-04', // Upcoming  new Event
            title: 'Theme: Breaking Barriers',
            location: 'Sunderland University - Hope Exchange Building',
            image: 'assets/images/sunderlandLogo.png', // Using the logo as a placeholder, or replace with a venue photo
            host: 'University of Sunderland',
            hostLogo: 'assets/images/sunderlandLogo.png',
            hostLink: 'sunderland.html'
        },
        {
            date: '2025-11-12',
            title: 'Theme: Transitions and Belonging',
            location: 'Newcastle College University Centre',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto.format&fit=crop', // THIS IS  A PHOTO FROM UNSPASH PLS REPLACE IT WITH A PAST PHOTO FROM THE EVENT :)
            host: 'Newcastle College',
            hostLogo: 'https://placehold.co/200x100/ffffff/475569?text=Newcastle+College',
            hostLink: 'newcastle-college.html'
        }, 
        {
            date: '2024-02-20',
            title: 'Northumbria University',
            location: 'February 2024',
            image: 'assets/images/pastEvents/northumbriaPastEvent/Northumbria Uni2 - Feb 2024.jpg',
            schedule: 'assets/schedules/Northumbria.pdf' 
        }, 
        {
            date: '2024-11-15',
            title: 'Newcastle University',
            location: 'November 2024',
            image: 'assets/images/pastEvents/newcastleUniPastUni/Newcastle Uni - Nov 2024.jpg',
            schedule: 'assets/schedules/Newcastle Uni.pdf' 
        }, 
        {
            date: '2025-06-25',
            title: 'Durham University',
            location: 'June 2025',
            image: 'assets/images/pastEvents/durhamUniPastEvent/Durham Uni - June 2025.jpg',
            schedule: 'assets/schedules/Durham Uni.pdf' 
        }
    ];

    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    const testimonials = [
        {
            quote: "I have worked at the University of Sunderland since 2013, originally holding a number of roles within Disability Services - advocating for students and supporting them to self-advocate, whilst providing advice, support and guidance to the wider University community. More recently I moved into a position as part of our Student Journey Executive Team, facilitating cross-working throughout the Service and beyond, drawing together relevant colleagues to deliver identified projects and developing a collaborative culture to help enable student success. A significant element of my new role entails working closely with our SU, engaging with students to bring their insights and lived experiences to bear on University initiatives and plans. Joining the regional network provides me with a great platform from which I can share ideas and providing me the opportunity to learn from colleagues and students across the region.",
            name: "Ben Hodgson",
            title: "Head of Student Life",
            logo: "assets/images/sunderlandLogo.png",
            personImage: "assets/images/people/BenHodgson.jpg" 
        },
        {
            quote: "The Regional Student Voice Network provides an excellent opportunity to network with colleagues from different institutions across the North-East, whilst learning and sharing one another’s best practice.",
            name: "Lauryn Davis",
            title: "Research and Student Engagement Assistant (Student Voice)",
            logo: "assets/images/NcusLogo.png"
        },
         {
            quote: "I find the Regional Student Voice network to be great not only for exchanging ideas and initiatives, but to find representation and have my voice heard as a first-generation university student.",
            name: "Saffron Hunter",
            title: "3rd year student BA Combined Honours in Social Sciences ",
            logo: "assets/images/durhamLogo.png"
        },
        {
            quote: "Over the last couple of years, I have had the fantastic opportunity to attend three Regional Student Voice Network events. At each event, I have had the opportunity to network with staff and other students while learning about the incredible work that institutions across the region are doing. Attending these events has also allowed me to present work that I have conducted throughout my role, developing key presentation skills and confidence. I have thoroughly enjoyed my time at these events, and it has been so encouraging to see the positive impact that student voice can have across the region.",
            name: "John ",
            title: "Senior Student Inclusion Consultant ",
            personImage: "assets/images/people/john.jpg" 
        }
    ];

    const setupMobileMenu = () => {
        const btn = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => menu.classList.toggle('hidden'));
        }
    };

    const setupHeroSlideshow = () => {
        const slideshow = document.getElementById('hero-slideshow');
        if (!slideshow) return;
        const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = document.getElementById('slideshow-dots');
        let currentSlide = 0;
        let slideInterval;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-colors', 'duration-300', i === 0 ? 'bg-white' : 'bg-white/50', 'hover:bg-white');
            dot.addEventListener('click', () => { setSlide(i); resetInterval(); });
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll('button');

        const setSlide = (index) => {
            slides.forEach((slide, i) => slide.style.opacity = i === index ? '1' : '0');
            dots.forEach((dot, i) => dot.classList.toggle('bg-white', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('bg-white/50', i !== index));
            currentSlide = index;
        };
        const nextSlide = () => setSlide((currentSlide + 1) % slides.length);
        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
        resetInterval();
    };

    const animateCounters = () => {
        const statsBar = document.getElementById('stats-bar');
        if (!statsBar) return;

        const counters = statsBar.querySelectorAll('[data-goal]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const goal = +counter.dataset.goal;
                        let current = 0;
                        const increment = Math.ceil(goal / 100);

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= goal) {
                                counter.innerText = goal.toLocaleString();
                                clearInterval(timer);
                            } else {
                                counter.innerText = current.toLocaleString();
                            }
                        }, 20);
                    });
                    observer.unobserve(statsBar);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsBar);
    };

    const startCountdown = (eventDateStr, elementId) => {
        const countdownElement = document.getElementById(elementId);
        if (!countdownElement) return;

        const eventDate = new Date(eventDateStr).getTime();
        const interval = setInterval(() => {
            const distance = eventDate - new Date().getTime();
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "<div class='text-xl font-bold text-slate-700'>The event has started!</div>";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `
                <div class='grid grid-cols-4 gap-4 text-center'>
                    <div><div class='text-4xl lg:text-5xl font-bold text-indigo-600'>${days}</div><div class='text-xs uppercase text-slate-500'>Days</div></div>
                    <div><div class='text-4xl lg:text-5xl font-bold text-indigo-600'>${hours}</div><div class='text-xs uppercase text-slate-500'>Hours</div></div>
                    <div><div class='text-4xl lg:text-5xl font-bold text-indigo-600'>${minutes}</div><div class='text-xs uppercase text-slate-500'>Minutes</div></div>
                    <div><div class='text-4xl lg:text-5xl font-bold text-indigo-600'>${seconds}</div><div class='text-xs uppercase text-slate-500'>Seconds</div></div>
                </div>`;
        }, 1000);
    };

    const setupHostSpotlight = () => {
        const hostContainer = document.getElementById('next-host-container');
        if (!hostContainer) return;

        const upcoming = allEvents.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
        if (upcoming.length > 0) {
            const nextEvent = upcoming[0];
            const eventDate = new Date(nextEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

            const googleCalEventTitle = encodeURIComponent(nextEvent.title);
            const googleCalEventLocation = encodeURIComponent(nextEvent.location);
            const googleCalStartDate = nextEvent.date.replace(/-/g, '');
            const officeCalEventTitle = encodeURIComponent(nextEvent.title);
            const officeCalEventLocation = encodeURIComponent(nextEvent.location);
            const officeCalStartDate = nextEvent.date + 'T00:00:00Z';
            const officeCalEndDate = nextEvent.date + 'T23:59:59Z';
            const officeCalDescription = encodeURIComponent('Regional Student Voice Network Event');
    
            hostContainer.innerHTML = `
                <div class="grid lg:grid-cols-5 gap-8 items-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                    <div class="lg:col-span-3 text-center lg:text-left">
                        <p class="text-sm font-semibold text-indigo-600">MARK YOUR CALENDAR</p>
                        <h3 class="font-heading text-4xl font-bold text-slate-800 mt-2">${nextEvent.title}</h3>
                        <p class="mt-2 text-slate-600 text-lg"><strong>Hosted by:</strong> ${nextEvent.host}</p>
                        <p class="text-slate-500"><strong>Date:</strong> ${eventDate}</p>
                        
                        <div class="mt-6">
                            <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=${googleCalEventTitle}&dates=${googleCalStartDate}/${googleCalStartDate}&details=Regional+Student+Voice+Network+Event&location=${googleCalEventLocation}&sf=true&output=xml" target="_blank" class="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 mb-2 mr-2 text-sm">
                                Add to Google Calendar
                            </a>
                            <a href="https://outlook.office.com/calendar/0/deeplink/compose?subject=${officeCalEventTitle}&body=${officeCalDescription}&location=${officeCalEventLocation}&startdt=${officeCalStartDate}&enddt=${officeCalEndDate}" target="_blank" class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 mb-2 text-sm">
                                Add to Office 365
                            </a>
                        </div>
                        </div>
                    <div class="lg:col-span-2">
                        <div id="event-countdown" class="bg-slate-100 p-6 rounded-lg"></div>
                    </div>
                </div>`;
            startCountdown(nextEvent.date, 'event-countdown');
        } else {
            hostContainer.innerHTML = `<p class="text-center text-slate-600 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">The next event and host will be announced soon!</p>`;
        }
    };

    const setupTestimonialSlideshow = () => {
        const slideshowContainer = document.getElementById('testimonial-slideshow');
        if (!slideshowContainer) return;

        let slideHTML = '';
        testimonials.forEach((testimonial, index) => {
            let personImageHTML = '';
            if (testimonial.personImage) {
                personImageHTML = `<img src="${testimonial.personImage}" alt="${testimonial.name}" class="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white/50">`;
            }

            slideHTML += `
                <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                    ${personImageHTML} <blockquote class="text-xl italic">
                        <p>"${testimonial.quote}"</p>
                    </blockquote>
                    <cite class="block mt-6 not-italic text-center">
                        <span class="font-semibold text-white">${testimonial.name}</span>
                        <span class="block text-indigo-200 text-sm">${testimonial.title}</span>
${testimonial.logo ? `<img src="${testimonial.logo}" alt="${testimonial.name} logo" class="h-12 w-auto max-w-[120px] mx-auto mt-4 object-contain">` : ''}
                    </cite>
                </div>
            `;
        });

        slideHTML += `
            <button id="prev-testimonial" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center transition-colors">❮</button>
            <button id="next-testimonial" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center transition-colors">❯</button>
        `;
        slideshowContainer.innerHTML = slideHTML;

        const slides = slideshowContainer.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        document.getElementById('next-testimonial').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        document.getElementById('prev-testimonial').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    };


    // Functions for the Events page
    const setupEventsPage = () => {
        const upcomingSection = document.getElementById('upcoming-events-section');
        const pastSection = document.getElementById('past-events-section');

        if (!upcomingSection || !pastSection) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = allEvents.filter(event => new Date(event.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
        const pastEvents = allEvents.filter(event => new Date(event.date) < today).sort((a, b) => new Date(b.date) - new Date(a.date));

        if (upcomingEvents.length > 0) {
            const event = upcomingEvents[0];
            const eventDate = new Date(event.date);
            const dateString = eventDate.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });

            const googleCalEventTitle = encodeURIComponent(event.title);
            const googleCalEventLocation = encodeURIComponent(event.location);
            const googleCalStartDate = event.date.replace(/-/g, '');
            const officeCalEventTitle = encodeURIComponent(event.title);
            const officeCalEventLocation = encodeURIComponent(event.location);
            const officeCalStartDate = event.date + 'T00:00:00Z';
            const officeCalEndDate = event.date + 'T23:59:59Z';
            const officeCalDescription = encodeURIComponent('Regional Student Voice Network Event');


            upcomingSection.innerHTML = `
                <h2 class="font-heading text-3xl font-bold text-center mb-8" data-aos="fade-up">Upcoming Event</h2>
                <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                    <div class="p-8">
                         <div class="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <p class="text-sm font-semibold text-indigo-600">NEXT EVENT</p>
                                <h3 class="font-heading text-3xl font-bold text-slate-800 mt-2">${event.title}</h3>
                            </div>
                            <div class="mt-6 md:mt-0 md:ml-8 text-center md:text-right flex-shrink-0">
                                <div class="bg-slate-100 rounded-lg p-4">
                                    <p class="text-lg font-bold text-slate-800">${dateString}</p>
                                    <p class="text-sm text-slate-600">${event.location}</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-8 border-t border-slate-200 pt-8">
                            <h4 class="font-bold text-center text-slate-600 mb-4">Counting down to the event:</h4>
                            <div id="countdown-timer-page" class="mb-8"></div>
                            <div class="text-center mb-8">
                                 <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=${googleCalEventTitle}&dates=${googleCalStartDate}/${googleCalStartDate}&details=Regional+Student+Voice+Network+Event&location=${googleCalEventLocation}&sf=true&output=xml" target="_blank" class="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 mb-2">
                                    Add to Google Calendar
                                </a>
                                <a href="https://outlook.office.com/calendar/0/deeplink/compose?subject=${officeCalEventTitle}&body=${officeCalDescription}&location=${officeCalEventLocation}&startdt=${officeCalStartDate}&enddt=${officeCalEndDate}" target="_blank" class="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                                    Add to Office 365 Calendar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            startCountdown(event.date, 'countdown-timer-page');
        }

        if (pastEvents.length > 0) {
            let pastHTML = `<h2 class="font-heading text-3xl font-bold text-center mb-8 border-t border-slate-300 pt-16 mt-20" data-aos="fade-up">Previous Events</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">`;
            pastEvents.forEach((event, index) => {
                const scheduleButton = event.schedule
                    ? `<div class="p-4 bg-slate-50 border-t border-slate-200">
                           <a href="${event.schedule}" target="_blank" class="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                               View Schedule &rarr;
                           </a>
                       </div>`
                    : '';

                pastHTML += `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                        <div>
                            <img src="${event.image}" alt="${event.title} event" class="w-full h-48 object-cover">
                            <div class="p-6">
                                <h3 class="font-heading font-bold text-xl mb-2">${event.title}</h3>
                                <p class="text-slate-600 text-sm">${event.location}</p>
                            </div>
                        </div>
                        ${scheduleButton}
                    </div>`;
            });
            pastHTML += '</div>';
            pastSection.innerHTML = pastHTML;
        }
    };
    
    //  all components
    setupMobileMenu();
    setupHeroSlideshow();
    animateCounters();
    setupHostSpotlight();
    setupTestimonialSlideshow();
    setupEventsPage();
});