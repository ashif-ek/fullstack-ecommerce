
└── ashif-ek-fullstack-ecommerce/
    
    ├── backend/
    │   ├── check_images.py
    │   ├── manage.py
    │   ├── output.txt
    │   ├── package.json
    │   ├── repro_profile_error.py
    │   ├── requirements.txt
    │   ├── verify_profile_view.py
    │   ├── accounts/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   ├── cart/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── signals.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   ├── config/
    │   │   ├── __init__.py
    │   │   ├── asgi.py
    │   │   ├── settings.py
    │   │   ├── urls.py
    │   │   └── wsgi.py
    │   ├── media/
    │   │   └── products/
    │   │       ├── shopping.webp
    │   │       ├── shopping_1.webp
    │   │       ├── shopping_2.webp
    │   │       ├── shopping_3.webp
    │   │       ├── shopping_4.webp
    │   │       ├── shopping_4_ioFwxix.webp
    │   │       ├── shopping_4_RL4VTog.webp
    │   │       ├── shopping_6.webp
    │   │       ├── shopping_jvCJI6b.webp
    │   │       └── shopping_vghBe1D.webp
    │   ├── orders/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── services.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       ├── 0002_order_shipping_address.py
    │   │       ├── 0003_alter_order_status.py
    │   │       └── __init__.py
    │   ├── payments/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── services.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   └── products/
    │       ├── __init__.py
    │       ├── admin.py
    │       ├── apps.py
    │       ├── models.py
    │       ├── serializers.py
    │       ├── tests.py
    │       ├── urls.py
    │       ├── views.py
    │       └── migrations/
    │           ├── 0001_initial.py
    │           ├── 0002_alter_product_category.py
    │           ├── 0003_product_image.py
    │           └── __init__.py
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── lint.txt
        ├── lint_log.txt
        ├── package.json
        ├── postcss.config.js
        ├── RELEASE_NOTES.md
        ├── tailwind.config.js
        ├── vercel.json
        ├── vite.config.js
        ├── public/
        │   ├── robots.txt
        │   ├── site.webmanifest
        │   └── sitemap.xml
        └── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── auth/
            │   ├── login.jsx
            │   └── register.jsx
            ├── components/
            │   ├── AdminRoute.jsx
            │   ├── ErrorBoundary.jsx
            │   ├── footer.jsx
            │   ├── hero.jsx
            │   ├── navbar.jsx
            │   ├── ProtectedRoute.jsx
            │   ├── PublicRoute.jsx
            │   ├── SearchDropdown.jsx
            │   └── ShimmerLoader.jsx
            ├── context/
            │   ├── AuthContext.jsx
            │   ├── CartContext.jsx
            │   ├── OrderContext.jsx
            │   ├── SearchContext.jsx
            │   └── WishlistContext.jsx
            ├── modules/
            │   ├── admin/
            │   │   ├── admin-products.jsx
            │   │   ├── admin-user.jsx
            │   │   ├── adminLayout.jsx
            │   │   ├── dashboard.jsx
            │   │   ├── user-details.jsx
            │   │   └── userOverview.jsx
            │   └── user/
            │       ├── userhome.jsx
            │       └── pages/
            │           ├── carts.jsx
            │           ├── checkout.jsx
            │           ├── home.jsx
            │           ├── notfound.jsx
            │           ├── orders.jsx
            │           ├── ourStory.jsx
            │           ├── ProductDetail.jsx
            │           ├── products.jsx
            │           ├── profile.jsx
            │           ├── search.jsx
            │           ├── TopSellingProducts.jsx
            │           └── whishlist.jsx
            └── services/
                └── api.js
