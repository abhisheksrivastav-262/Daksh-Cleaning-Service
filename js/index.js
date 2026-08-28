// Daksh Cleaning Service - Interactive Functionality
document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
                const icon = otherItem.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(0deg)';
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 2. Packages Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (tabBtns.length > 0 && packageCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-tab');
                
                // Set active tab button style
                tabBtns.forEach(otherBtn => {
                    otherBtn.classList.remove('bg-primary', 'text-white');
                    otherBtn.classList.add('bg-muted', 'text-muted-foreground');
                });
                btn.classList.remove('bg-muted', 'text-muted-foreground');
                btn.classList.add('bg-primary', 'text-white');

                // Filter cards
                packageCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // The inner cards for silver/gold (only present in furnished wrapper)
                    const innerCards = card.querySelectorAll('.bg-white.rounded-2xl.shadow-soft');
                    
                    if (category === 'all' || category === cardCategory) {
                        card.style.display = 'block';
                        // Ensure all inner cards are visible
                        innerCards.forEach(c => c.style.display = 'flex');
                    } else if (category === 'silver') {
                        // Check if this card contains a Silver Package
                        let hasSilver = false;
                        innerCards.forEach(c => {
                            const title = c.querySelector('h4');
                            if (title && title.textContent.includes('Silver')) {
                                hasSilver = true;
                                c.style.display = 'flex';
                            } else {
                                c.style.display = 'none';
                            }
                        });
                        
                        if (hasSilver) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    } else if (category === 'gold') {
                        // Check if this card contains a Gold Package
                        let hasGold = false;
                        innerCards.forEach(c => {
                            const title = c.querySelector('h4');
                            if (title && title.textContent.includes('Gold')) {
                                hasGold = true;
                                c.style.display = 'flex';
                            } else {
                                c.style.display = 'none';
                            }
                        });
                        
                        if (hasGold) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Hero / Homepage Inline Lead Form Handler
    const heroForm = document.getElementById('hero-lead-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('hero-name').value.trim();
            const email = document.getElementById('hero-email').value.trim();
            const phone = document.getElementById('hero-phone').value.trim();
            let serviceType = document.getElementById('hero-service').value;
            const pkg = document.getElementById('hero-package') ? document.getElementById('hero-package').value : '';
            if (pkg) serviceType += ` - ${pkg}`;
            const area = document.getElementById('hero-area').value.trim();
            const dateTime = document.getElementById('datetime').value;

            // Form Validation
            if (!name || !phone || !serviceType || !area || !dateTime) {
                alert('Please fill in all required fields.');
                return;
            }
            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            // WhatsApp Message Formatting
            const formattedDate = new Date(dateTime).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });

            const text = `New Lead From Website:

Name: ${name}
Email: ${email || 'N/A'}
Phone: ${phone}
Service: ${serviceType}
Area: ${area}
Preferred Date & Time: ${formattedDate}

Please contact me for a free quote.`;

            const whatsappUrl = `https://wa.me/919137294815?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 4. Multi-step Booking Form Handler (booking.html)
    const bookingFormEl = document.getElementById('booking-multi-step');
    if (bookingFormEl) {
        let currentStep = 0;
        const steps = document.querySelectorAll('.booking-step-section');
        const progressIndicator = document.getElementById('progress-bar');
        const stepIndicators = document.querySelectorAll('.step-indicator');
        
        const nextBtns = document.querySelectorAll('.btn-next');
        const prevBtns = document.querySelectorAll('.btn-prev');
        const confirmBtn = document.getElementById('btn-confirm-whatsapp');

        // Form Fields State
        const formData = {
            name: '',
            mobile: '',
            email: '',
            service: '',
            address: '',
            pincode: '',
            date: '',
            slot: ''
        };

        // Select Service from URL query parameters (if exists)
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam) {
            const selectEl = document.getElementById('booking-service');
            if (selectEl) {
                // Find matching option value
                for (let i = 0; i < selectEl.options.length; i++) {
                    if (selectEl.options[i].value.toLowerCase().includes(serviceParam.toLowerCase()) || 
                        serviceParam.toLowerCase().includes(selectEl.options[i].value.toLowerCase())) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        // Time slot button selection
        const slotBtns = document.querySelectorAll('.slot-btn');
        slotBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                slotBtns.forEach(b => b.classList.remove('bg-primary', 'text-white', 'border-primary'));
                btn.classList.add('bg-primary', 'text-white', 'border-primary');
                formData.slot = btn.getAttribute('data-slot');
            });
        });

        // Set minimum date to today
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            dateInput.addEventListener('change', (e) => {
                formData.date = e.target.value;
            });
        }

        // Validation logic per step
        const validateStep = (step) => {
            if (step === 0) {
                formData.name = document.getElementById('booking-name').value.trim();
                formData.mobile = document.getElementById('booking-mobile').value.trim();
                formData.email = document.getElementById('booking-email').value.trim();
                let serviceVal = document.getElementById('booking-service').value;
                const pkg = document.getElementById('booking-package') ? document.getElementById('booking-package').value : '';
                if (pkg) serviceVal += ` - ${pkg}`;
                formData.service = serviceVal;
                formData.address = document.getElementById('booking-address').value.trim();
                formData.pincode = document.getElementById('booking-pincode').value.trim();

                if (!formData.name) return "Please enter your full name.";
                if (!/^[6-9]\d{9}$/.test(formData.mobile)) return "Please enter a valid 10-digit mobile number.";
                if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address.";
                if (!formData.service) return "Please select your service type.";
                if (!formData.address) return "Please enter your service address.";
                if (!/^\d{6}$/.test(formData.pincode)) return "Please enter a valid 6-digit pin code.";
            }
            if (step === 1) {
                if (!formData.date) return "Please select a date.";
                if (!formData.slot) return "Please choose a preferred time slot.";
            }
            return null;
        };

        const updateUI = () => {
            // Toggle step visibilities
            steps.forEach((s, idx) => {
                s.style.display = idx === currentStep ? 'block' : 'none';
            });

            // Update Progress bar percentage
            if (progressIndicator) {
                const pct = ((currentStep + 1) / steps.length) * 100;
                progressIndicator.style.width = `${pct}%`;
            }

            // Update Circle numbers UI
            stepIndicators.forEach((ind, idx) => {
                if (idx <= currentStep) {
                    ind.classList.add('bg-primary', 'text-white');
                    ind.classList.remove('bg-muted', 'text-muted-foreground');
                } else {
                    ind.classList.remove('bg-primary', 'text-white');
                    ind.classList.add('bg-muted', 'text-muted-foreground');
                }
            });

            // Render Booking Summary in Step 3
            if (currentStep === 2) {
                document.getElementById('summary-name').innerText = formData.name;
                document.getElementById('summary-mobile').innerText = formData.mobile;
                document.getElementById('summary-email').innerText = formData.email || 'N/A';
                document.getElementById('summary-service').innerText = formData.service;
                document.getElementById('summary-address').innerText = `${formData.address}, PIN: ${formData.pincode}`;
                
                const formatted = new Date(formData.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('summary-datetime').innerText = `${formatted} at ${formData.slot}`;
            }
        };

        // Next buttons
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const error = validateStep(currentStep);
                if (error) {
                    alert(error);
                    return;
                }
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                updateUI();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Prev buttons
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep = Math.max(currentStep - 1, 0);
                updateUI();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Confirm / Final WhatsApp Redirect
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const refCode = `DKS-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`;
                
                const text = ["Hi Daksh Cleaning Service, please confirm my booking.",
                    "",
                    `Booking Ref: ${refCode}`,
                    `Name: ${formData.name}`,
                    `Mobile: ${formData.mobile}`,
                    `Email: ${formData.email || 'N/A'}`,
                    `Service: ${formData.service}`,
                    `Address: ${formData.address}`,
                    `Pin Code: ${formData.pincode}`,
                    `Date: ${formData.date}`,
                    `Time Slot: ${formData.slot}`
                ].join('\n');

                const whatsappUrl = `https://wa.me/919137294815?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
            });
        }

        // Run initial UI render
        updateUI();
    }
});
