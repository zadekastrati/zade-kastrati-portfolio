<?php

/*
|--------------------------------------------------------------------------
| Portfolio content
|--------------------------------------------------------------------------
|
| Single source of truth for everything rendered on the site. It is passed
| to the React app as JSON from the `home` route, so editing content never
| requires touching a component.
|
*/

return [

    'profile' => [
        'name' => 'Zade Kastrati',
        'first_name' => 'Zade',
        'roles' => ['Full Stack Developer', 'QA Engineer', 'Laravel & React Developer'],
        'tagline' => 'Full Stack Developer and QA Engineer focused on delivering reliable, well-tested web applications from concept to production.',
        'summary' => 'I am a Full Stack Developer based in Prishtina, Kosovo, with a Bachelor of Science in Computer Engineering from UBT College. I currently work as a QA Engineer Intern at Hellocare.ai, where I have completed more than 1,000 QA tasks, including bug reports and test cases, and I was the lead developer of boné, a live e-commerce platform built with Laravel. My background also includes teaching full stack development at Probit Academy. Across development, quality assurance and training, my focus has stayed the same: building software that is dependable, maintainable and user-focused.',
        'location' => 'Prishtina, Kosovo',
        'email' => 'kastratizade9@gmail.com',
        'phone' => '+383 49 182 367',
        'photo' => '/images/zade.jpg',
        'core_stack' => ['Laravel', 'React', 'Node.js', 'PHP', 'MySQL', 'Tailwind CSS'],
        'available' => true,
        'socials' => [
            'github' => 'https://github.com/zadekastrati',
            'linkedin' => 'https://www.linkedin.com/in/zadekastrati',
        ],
        'stats' => [
            ['value' => 1000, 'suffix' => '+', 'label' => 'QA tasks completed'],
            ['value' => 7, 'suffix' => '+', 'label' => 'Full stack projects'],
            ['value' => 1, 'suffix' => '', 'label' => 'Live e-commerce platform'],
            ['value' => 3, 'suffix' => '', 'label' => 'Markets served by boné'],
        ],
    ],

    'featured' => [
        'name' => 'boné',
        'kicker' => 'Live in Production',
        'headline' => 'A production e-commerce platform for a women\'s activewear brand.',
        'description' => 'boné is a women\'s activewear brand that serves customers in Kosovo, Albania and North Macedonia. As lead developer, I built the platform and was responsible for most of its implementation, including the storefront, checkout, payment integration, administrative back office and deployment. The platform processes live customer orders, so security, reliability and a consistent experience on mobile and desktop were core requirements throughout development.',
        'url' => 'https://bone-active.com',
        'repo' => 'https://github.com/zadekastrati/bone',
        'logo' => '/images/bone/logo.png',
        'images' => [
            ['src' => '/images/bone/leggings.jpeg', 'label' => 'Leggings'],
            ['src' => '/images/bone/sports-bras.jpeg', 'label' => 'Sports Bras'],
            ['src' => '/images/bone/tops-tanks.jpeg', 'label' => 'Tops & Tanks'],
            ['src' => '/images/bone/bodysuits.jpeg', 'label' => 'Bodysuits'],
            ['src' => '/images/bone/shorts-and-skirts.jpeg', 'label' => 'Shorts & Skirts'],
        ],
        'highlights' => [
            ['icon' => 'credit-card', 'title' => 'Secure Payment Processing', 'text' => 'Integration with the Quipu payment gateway. Each transaction is verified directly with the gateway on the server, and gateway callbacks are never accepted as proof of payment. Cash on delivery is also supported.'],
            ['icon' => 'globe', 'title' => 'Multi-Currency and Localization', 'text' => 'Pricing in EUR, ALL and MKD based on exchange rates that are refreshed on a schedule. The interface is fully localized in English and Albanian.'],
            ['icon' => 'shopping-bag', 'title' => 'Streamlined Checkout', 'text' => 'Guest checkout with signed order confirmation links, size and color variants, discount codes, and product filtering by activity type.'],
            ['icon' => 'layout-dashboard', 'title' => 'Administrative Back Office', 'text' => 'A custom dashboard for managing orders, invoices and archived records, a media library with image ordering, discount code management and new order notifications.'],
            ['icon' => 'shield-check', 'title' => 'Security and Account Verification', 'text' => 'Email and phone number verification, rate-limited authentication, role-based access control for administrators and soft deletion to preserve order history.'],
            ['icon' => 'rocket', 'title' => 'Production Infrastructure', 'text' => 'Containerized with Docker (Laravel Sail), media stored on Amazon S3, an XML sitemap for search engines, indexed database queries and more than 30 versioned schema migrations.'],
        ],
        'stack' => ['Laravel', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Blade', 'Docker', 'AWS S3', 'Quipu Payments'],
        'metrics' => [
            ['value' => '3', 'label' => 'Currencies'],
            ['value' => '2', 'label' => 'Languages'],
            ['value' => '30+', 'label' => 'Migrations'],
            ['value' => 'Lead', 'label' => 'Developer'],
        ],
    ],

    'experience' => [
        [
            'role' => 'QA Engineer Intern',
            'company' => 'Hellocare.ai',
            'url' => 'https://hellocare.ai',
            'period' => '05/2026 – Present',
            'location' => 'Prishtina, Kosovo',
            'current' => true,
            'summary' => 'Responsible for quality assurance across the product, including test planning, defect reporting and direct customer support.',
            'points' => [
                'Completed more than 1,000 QA tasks, including bug reports, test cases, regression testing and verification of resolved issues.',
                'Prepared detailed, reproducible defect reports with clear steps, expected and actual results and supporting evidence to help the engineering team resolve issues efficiently.',
                'Designed and maintained test cases covering new features, edge cases and critical user workflows.',
                'Provided customer support and conducted live testing sessions with customers to reproduce reported issues and validate fixes in production.',
            ],
            'tags' => ['Manual Testing', 'Test Case Design', 'Defect Tracking', 'Regression Testing', 'Customer Support'],
        ],
        [
            'role' => 'IT Trainer',
            'company' => 'Probit Academy',
            'url' => null,
            'period' => '01/2025 – 11/2025',
            'location' => 'Prishtina, Kosovo',
            'current' => false,
            'summary' => 'Delivered training in full stack web development to aspiring developers.',
            'points' => [
                'Developed the curriculum and training materials for the full stack development program.',
                'Taught core concepts using a structured, beginner-friendly approach supported by hands-on coding exercises.',
                'Guided students through the design and development of real-world applications.',
            ],
            'tags' => ['Curriculum Development', 'Technical Training', 'JavaScript', 'React', 'Node.js'],
        ],
    ],

    'projects' => [
        [
            'title' => 'Event Ticketing Platform',
            'period' => '2025',
            'category' => 'Full Stack · Real-Time',
            'description' => 'A full stack event management platform that lets users browse events, purchase tickets and receive QR-code tickets by email. It includes real-time chat for event rooms using Socket.io, an Express API backed by PostgreSQL and MongoDB, and a TypeScript Next.js frontend with JWT authentication.',
            'stack' => ['Next.js', 'TypeScript', 'Express', 'Socket.io', 'PostgreSQL', 'MongoDB'],
            'repo' => 'https://github.com/zadekastrati/lab2',
            'live' => null,
            'icon' => 'ticket',
        ],
        [
            'title' => 'Event Ticketing Web Application',
            'period' => '2025',
            'category' => 'Web Application · Next.js',
            'description' => 'The deployed web client of the event ticketing system, built with Next.js and Tailwind CSS. Features include authentication with NextAuth, category-based event discovery, form validation and integration with an Express and Sequelize API.',
            'stack' => ['Next.js', 'Tailwind CSS', 'NextAuth', 'Express', 'PostgreSQL'],
            'repo' => 'https://github.com/zadekastrati/client-side',
            'live' => 'https://event-ticketing-ten.vercel.app',
            'icon' => 'calendar',
        ],
        [
            'title' => 'CV Craft',
            'period' => '2025',
            'category' => 'Web Application · Laravel',
            'description' => 'A resume builder that lets users create and edit CVs with a live preview, choose from multiple professionally designed templates and export them as PDF documents. Access controls ensure that each user can view and manage only their own documents.',
            'stack' => ['Laravel 12', 'Tailwind CSS', 'DomPDF', 'MySQL', 'Docker', 'Nginx'],
            'repo' => 'https://github.com/zadekastrati/cv-craft',
            'live' => null,
            'icon' => 'file-text',
        ],
        [
            'title' => 'Social Sentiment Platform',
            'period' => '2024 – 2025',
            'category' => 'Full Stack · Social',
            'description' => 'A community platform where users publish posts, react with likes and dislikes and take part in comment discussions, giving a clear view of community sentiment. It includes role-based administrative dashboards, real-time notifications over WebSockets, a contact message inbox and PDF export.',
            'stack' => ['React', 'Material UI', 'Express', 'PostgreSQL', 'JWT', 'WebSockets'],
            'repo' => 'https://github.com/zadekastrati/sentiment-analysis',
            'live' => null,
            'icon' => 'message-circle',
        ],
        [
            'title' => 'Coder\'s Academy',
            'period' => '2024',
            'category' => 'Education · Management System',
            'description' => 'A management system for a coding academy that covers courses, students, trainers, classrooms and schedules, along with examinations, results, certificates and scholarships. It provides role-based access control and an administrative dashboard with data visualizations.',
            'stack' => ['React', 'Material UI', 'Chart.js', 'Express', 'Sequelize', 'MySQL'],
            'repo' => 'https://github.com/zadekastrati/labkurs1',
            'live' => null,
            'icon' => 'graduation-cap',
        ],
        [
            'title' => 'Real Estate Platform',
            'period' => '2023 – 2024',
            'category' => 'Web Application · PHP',
            'description' => 'A property listing platform where users browse properties by category, view detailed listings and submit inquiries. It includes an administrative panel for managing listings and images, and secure user authentication, built with PHP and MySQL.',
            'stack' => ['PHP', 'MySQL', 'Bootstrap', 'HTML', 'CSS'],
            'repo' => 'https://github.com/zadekastrati/real-estate',
            'live' => null,
            'icon' => 'building',
        ],
    ],

    'skills' => [
        ['group' => 'Frontend', 'icon' => 'layout', 'items' => ['React', 'Next.js', 'React Native', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'HTML', 'CSS', 'jQuery']],
        ['group' => 'Backend', 'icon' => 'server', 'items' => ['PHP', 'Laravel', 'Node.js', 'Express', 'REST APIs', 'Socket.io', 'WordPress']],
        ['group' => 'Databases', 'icon' => 'database', 'items' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Sequelize', 'Eloquent ORM']],
        ['group' => 'Quality Assurance & Tools', 'icon' => 'bug', 'items' => ['Manual Testing', 'Test Case Design', 'Defect Reporting', 'Regression Testing', 'Git', 'Docker', 'AWS S3']],
    ],

    'education' => [
        [
            'title' => 'BSc in Computer Engineering',
            'place' => 'UBT College, Computer Science and Engineering',
            'period' => '10/2022 – 09/2025',
            'type' => 'degree',
        ],
        [
            'title' => 'Full Stack Development Certificate',
            'place' => 'Probit Academy',
            'period' => '10/2024 – 02/2025',
            'type' => 'certificate',
        ],
    ],

    'languages' => [
        ['name' => 'Albanian', 'level' => 'Native'],
        ['name' => 'English', 'level' => 'Full Professional Proficiency'],
    ],

];
