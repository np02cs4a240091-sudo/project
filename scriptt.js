 let products = [
            {
                id: 1,
                name: "Air Max 270 React",
                price: 150.00,
                originalPrice: 180.00,
                category: "running",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop",
                rating: 4.8,
                badge: "Best Seller",
                features: ["Air Max", "React Foam", "Breathable"],
                description: "Revolutionary comfort meets iconic style"
            },
            {
                id: 2,
                name: "Jordan 1 Retro High",
                price: 170.00,
                category: "basketball",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=400&fit=crop",
                rating: 4.9,
                badge: "Iconic",
                features: ["Leather Upper", "Air Sole", "Classic"],
                description: "The shoe that started it all"
            },
            {
                id: 3,
                name: "Dunk Low Premium",
                price: 110.00,
                category: "lifestyle",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=400&fit=crop",
                rating: 4.6,
                badge: "New",
                features: ["Premium Leather", "Padded Collar", "Rubber Sole"],
                description: "Classic basketball style for everyday wear"
            },
            {
                id: 4,
                name: "Metcon 8 Training",
                price: 130.00,
                category: "training",
                image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=400&fit=crop",
                rating: 4.7,
                features: ["Stable Platform", "Durable", "Versatile"],
                description: "Built for your toughest training sessions"
            },
            {
                id: 5,
                name: "Air Force 1 '07",
                price: 90.00,
                category: "lifestyle",
                image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=400&fit=crop",
                rating: 4.8,
                badge: "Classic",
                features: ["Full Grain Leather", "Air Sole", "Timeless"],
                description: "The radiance lives on in the classic"
            },
            {
                id: 6,
                name: "ZoomX Vaporfly Next%",
                price: 250.00,
                category: "running",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=400&fit=crop",
                rating: 4.9,
                badge: "Performance",
                features: ["ZoomX Foam", "Carbon Plate", "Lightweight"],
                description: "Elite racing performance"
            },
            {
                id: 7,
                name: "Mercurial Superfly 9",
                price: 275.00,
                category: "football",
                image: "https://images.unsplash.com/photo-1574294876341-30ea91661c8b?w=500&h=400&fit=crop",
                rating: 4.7,
                badge: "Pro",
                features: ["Flyknit Upper", "Dynamic Fit", "Speed"],
                description: "Designed for explosive acceleration"
            },
            {
                id: 8,
                name: "LeBron 20 Basketball",
                price: 200.00,
                category: "basketball",
                image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&h=400&fit=crop",
                rating: 4.6,
                features: ["Zoom Air", "Max Air", "Durable"],
                description: "King James' signature performance"
            },
            {
                id: 9,
                name: "Pegasus 39 Shield",
                price: 130.00,
                originalPrice: 150.00,
                category: "running",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
                rating: 4.5,
                features: ["Weather Shield", "Zoom Air", "Durable"],
                description: "All-weather running companion"
            },
            {
                id: 10,
                name: "Blazer Mid '77 Vintage",
                price: 100.00,
                category: "lifestyle",
                image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=400&fit=crop",
                rating: 4.4,
                badge: "Vintage",
                features: ["Suede Upper", "Vintage Styling", "Comfortable"],
                description: "Classic court style with vintage appeal"
            }
        ];

       // Application State
let currentUser = null;
let cart = [];
let favorites = [];
let registeredUsers = [];

function init() {
    // Load users and session from localStorage
    const savedUsers = localStorage.getItem('registeredUsers');
    const savedUser = localStorage.getItem('currentUser');

    if (savedUsers) {
        registeredUsers = JSON.parse(savedUsers);
    }

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }

    loadProducts();
    loadFeaturedProducts();
    updateCartUI();
    setupScrollEffects();
    console.log('🚀 SoleStyle App opened successfully!');
}

        // Scroll Effects
        function setupScrollEffects() {
            window.addEventListener('scroll', () => {
                const header = document.getElementById('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Section Navigation
        function showSection(sectionName) {
            const sections = ['homeSection', 'productsSection', 'aboutSection', 'contactSection'];
            sections.forEach(section => {
                document.getElementById(section).classList.add('hidden');
            });
            document.getElementById(sectionName + 'Section').classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Product Management
        function loadProducts() {
            const container = document.getElementById('allProducts');
            container.innerHTML = '';
            products.forEach(product => {
                container.appendChild(createProductCard(product));
            });
        }

        function loadFeaturedProducts() {
            const container = document.getElementById('featuredProducts');
            container.innerHTML = '';
            // Show first 6 products as featured
            products.slice(0, 6).forEach(product => {
                container.appendChild(createProductCard(product));
            });
        }

        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const originalPrice = product.originalPrice ? 
                `<span class="original-price">${product.originalPrice}</span>` : '';
            
            card.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')">
                    ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
                    <button class="favorite-btn" onclick="toggleFavorite(${product.id})" title="Add to favorites">
                        ♡
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">
                        ${product.price.toFixed(2)}
                        ${originalPrice}
                    </div>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <div class="product-features">
                        ${product.features.map(feature => 
                            `<span class="feature-tag">${feature}</span>`
                        ).join('')}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Bag
                    </button>
                </div>
            `;
            return card;
        }

        function generateStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<span class="star">★</span>';
            }
            if (hasHalfStar) {
                stars += '<span class="star">☆</span>';
            }
            for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
                stars += '<span class="star" style="color: #ddd;">★</span>';
            }
            return stars;
        }

        function filterProducts(category) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            const container = document.getElementById('allProducts');
            container.innerHTML = '';
            
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            // Add loading animation
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><div class="loading"></div></div>';
            
            setTimeout(() => {
                container.innerHTML = '';
                filteredProducts.forEach(product => {
                    container.appendChild(createProductCard(product));
                });
            }, 500);
        }

        function handleSearch(event) {
            const query = event.target.value.toLowerCase();
            if (query.length > 0) {
                showSection('products');
                searchProducts(query);
            } else if (document.getElementById('productsSection').classList.contains('hidden') === false) {
                loadProducts();
            }
        }

        function searchProducts(query) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.features.some(feature => feature.toLowerCase().includes(query))
            );
            
            const container = document.getElementById('allProducts');
            container.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                container.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                        <h3 style="margin-bottom: 1rem;">No shoes found</h3>
                        <p style="color: #666;">Try searching for different keywords</p>
                    </div>
                `;
            } else {
                filteredProducts.forEach(product => {
                    container.appendChild(createProductCard(product));
                });
            }
        }

        // Cart Management
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartUI();
            showNotification(`${product.name} added to bag!`);
            
            // Add visual feedback to button
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = '#2ed573';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#000';
            }, 1000);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            showNotification('Item removed from bag');
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (!item) return;

            item.quantity += change;
            
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCartUI();
            }
        }

        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div style="text-align: center; padding: 3rem 1rem; color: #666;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                        <p>Your bag is empty</p>
                        <button class="btn btn-primary" onclick="showSection('products'); toggleCart();" style="margin-top: 1rem;">
                            Start Shopping
                        </button>
                    </div>
                `;
            } else {
                cartItems.innerHTML = '';
                let total = 0;
                
                cart.forEach(item => {
                    total += item.price * item.quantity;
                    
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                });
                
                cartTotal.textContent = total.toFixed(2);
            }
        }

        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Your bag is empty!');
                return;
            }
            
            if (!currentUser) {
                showNotification('Please sign in to checkout');
                toggleCart();
                showLogin();
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Order placed successfully! Total: ${total.toFixed(2)}. Thank you for choosing SoleStyle!`);
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Favorites
        function toggleFavorite(productId) {
            const button = event.target;
            const isFavorited = favorites.includes(productId);
            
            if (isFavorited) {
                favorites = favorites.filter(id => id !== productId);
                button.textContent = '♡';
                button.style.color = '#666';
                showNotification('Removed from favorites');
            } else {
                favorites.push(productId);
                button.textContent = '♥';
                button.style.color = '#ff4757';
                showNotification('Added to favorites');
            }
        }

        // Authentication
        function showLogin() {
            document.getElementById('loginModal').style.display = 'flex';
        }

        function showSignup() {
            document.getElementById('signupModal').style.display = 'flex';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

       function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email.includes('@')) {
        showNotification("❌ Please enter a valid email address!");
        return;
    }

    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
        currentUser = { name: user.name, email: user.email };

        // Save current session to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        updateAuthUI();
        closeModal('loginModal');
        showNotification(`✅ Welcome back, ${user.name}! Successfully signed in.`);
    } else {
        showNotification("❌ Incorrect email or password!");
    }
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const user = savedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeModal('loginModal');
        showNotification("Successfully signed in!");
    } else {
        showNotification("Incorrect email or password!");
    }
}


function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;

    if (!name || !email.includes('@') || password.length < 6) {
        showNotification("❌ Please enter valid name, email, and password (min 6 characters).");
        return;
    }

    let savedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = savedUsers.some(user => user.email === email);
    if (userExists) {
        showNotification("⚠️ An account with this email already exists.");
        return;
    }

    const newUser = { name, email, password };
    savedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));

    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    updateAuthUI();
    closeModal('signupModal');
    showNotification(`✅ Welcome to SoleStyle, ${name}!`);
}




       // Logout clears session from localStorage
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Successfully signed out. See you soon!');
    document.getElementById('profileDropdown').classList.remove('show');
}

        function updateAuthUI() {
            const authButtons = document.getElementById('authButtons');
            const userProfile = document.getElementById('userProfile');
            const userName = document.getElementById('userName');
            const userEmail = document.getElementById('userEmail');
            
            if (currentUser) {
                authButtons.classList.add('hidden');
                userProfile.classList.remove('hidden');
                userName.textContent = currentUser.name;
                userEmail.textContent = currentUser.email;
            } else {
                authButtons.classList.remove('hidden');
                userProfile.classList.add('hidden');
            }
        }

        function toggleProfileDropdown() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('show');
        }

        // Utility Functions
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.ClassName = 'notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #000;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 3000;
                animation: slideInRight 0.4s ease;
                font-weight: 600;
                max-width: 300px;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.4s ease reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }, 3500);
        }

        // // Event Listeners
        // document.addEventListener('DOMContentLoaded', init);

        // Close modals and dropdowns when clicking outside
        document.addEventListener('click', (event) => {
            // Close modals
            const modals = ['loginModal', 'signupModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (event.target === modal) {
                    closeModal(modalId);
                }
            });
            
            // Close profile dropdown
            const userProfile = document.getElementById('userProfile');
            const profileDropdown = document.getElementById('profileDropdown');
            if (userProfile && !userProfile.contains(event.target)) {
                profileDropdown.classList.remove('show');
            }
        });

        // Close cart when clicking outside
        document.addEventListener('click', (event) => {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartIcon = document.querySelector('.cart-icon');
            
            if (cartSidebar && cartIcon && 
                !cartSidebar.contains(event.target) && 
                !cartIcon.contains(event.target) && 
                cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        });
        

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                // Close any open modals
                const openModal = document.querySelector('.modal[style*="flex"]');
                if (openModal) {
                    openModal.style.display = 'none';
                }
                
                // Close cart sidebar
                const cartSidebar = document.getElementById('cartSidebar');
                if (cartSidebar && cartSidebar.classList.contains('open')) {
                    toggleCart();
                }
                
                // Close profile dropdown
                const profileDropdown = document.getElementById('profileDropdown');
                if (profileDropdown) {
                    profileDropdown.classList.remove('show');
                }
            }
            
            // Quick search focus
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                document.querySelector('.search-input').focus();
            }
        });

        // Event Listeners
        document.addEventListener('DOMContentLoaded', init);

        
        console.log('🎉 SoleStyle Nike-Style App Loaded Successfully!');
        
    