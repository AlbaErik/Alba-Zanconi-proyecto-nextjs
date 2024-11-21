const { v4: uuidv4 } = require('uuid');

const users = [
];

const categories = [
    { id: uuidv4(), name: 'Notebook' },
    { id: uuidv4(), name: 'Mouse' },
    { id: uuidv4(), name: 'Teclados' },
    { id: uuidv4(), name: 'Monitores' },
    { id: uuidv4(), name: 'Impresoras' },
    { id: uuidv4(), name: 'Discos Duros' },
    { id: uuidv4(), name: 'Memorias RAM' },
    { id: uuidv4(), name: 'Tarjetas Gráficas' },
    { id: uuidv4(), name: 'Fuentes de Poder' },
    { id: uuidv4(), name: 'Gabinetes' },
    { id: uuidv4(), name: 'Parlantes' },
    { id: uuidv4(), name: 'Kindles' },
];

const products = [
    { id: uuidv4(), name: 'Laptop HP Pavilion', description: 'Procesador Intel Core i7, 16GB de RAM, 512GB SSD, pantalla FHD de 15.6 pulgadas', price: 999.00, imageUrl: 'laptop_hp_pavilion.png', categoryId: categories[0].id },
    { id: uuidv4(), name: 'Monitor Dell Ultrasharp', description: 'Monitor IPS de 27 pulgadas, resolución QHD, tasa de actualización de 144Hz', price: 350.00, imageUrl: 'monitor_dell_ultrasharp.png', categoryId: categories[3].id },
    { id: uuidv4(), name: 'Apple Watch Series 7', description: 'Reloj inteligente con pantalla Retina siempre activa, seguimiento avanzado de la actividad', price: 400.00, imageUrl: 'apple_watch_series_7.png', categoryId: categories[4].id },
    { id: uuidv4(), name: 'Canon EOS R6', description: 'Cámara mirrorless de fotograma completo con sensor CMOS de 20.1MP, video 4K a 60 fps', price: 2500.00, imageUrl: 'canon_eos_r6.png', categoryId: categories[5].id },
    { id: uuidv4(), name: 'Nintendo Switch', description: 'Consola híbrida para juegos, puede usarse en modo portátil o conectarse al televisor', price: 300.00, imageUrl: 'nintendo_switch.png', categoryId: categories[6].id },
    { id: uuidv4(), name: 'Samsung Galaxy Tab S7+', description: 'Tablet Android con pantalla AMOLED de 12.4 pulgadas, S Pen incluido', price: 850.00, imageUrl: 'samsung_galaxy_tab_s7_plus.png', categoryId: categories[7].id },
    { id: uuidv4(), name: 'Logitech MX Master 3', description: 'Ratón inalámbrico con tecnología de seguimiento Darkfield, botones programables', price: 100.00, imageUrl: 'logitech_mx_master_3.png', categoryId: categories[8].id },
    { id: uuidv4(), name: 'Bose QuietComfort 45', description: 'Auriculares inalámbricos con cancelación de ruido activa, hasta 24 horas de duración de la batería', price: 330.00, imageUrl: 'bose_quietcomfort_45.png', categoryId: categories[9].id },
    { id: uuidv4(), name: 'Google Nest Hub Max', description: 'Altavoz inteligente con pantalla de 10 pulgadas, cámara Nest integrada', price: 230.00, imageUrl: 'google_nest_hub_max.png', categoryId: categories[10].id },
    { id: uuidv4(), name: 'Amazon Kindle Paperwhite', description: 'Lector de libros electrónicos resistente al agua, pantalla de alta resolución de 6 pulgadas', price: 130.00, imageUrl: 'amazon_kindle_paperwhite.png', categoryId: categories[11].id },
    { id: uuidv4(), name: 'Microsoft Surface Laptop 4', description: 'Laptop con procesador Intel Core i5, 8GB de RAM, 256GB SSD, pantalla táctil de 13.5 pulgadas', price: 1300.00, imageUrl: 'microsoft_surface_laptop_4.png', categoryId: categories[0].id },
    { id: uuidv4(), name: 'Sony WH-1000XM4', description: 'Auriculares inalámbricos con cancelación de ruido, audio de alta resolución, hasta 30 horas de duración de la batería', price: 350.00, imageUrl: 'sony_wh_1000xm4.png', categoryId: categories[9].id },
    { id: uuidv4(), name: 'GoPro HERO10 Black', description: 'Cámara de acción 5.3K, pantalla táctil de 2.27 pulgadas, estabilización HyperSmooth 4.0', price: 500.00, imageUrl: 'gopro_hero10_black.png', categoryId: categories[5].id },
    { id: uuidv4(), name: 'Samsung Odyssey G7', description: 'Monitor gaming curvo de 27 pulgadas, resolución QHD, tasa de actualización de 240Hz', price: 700.00, imageUrl: 'samsung_odyssey_g7.png', categoryId: categories[3].id },

    { id: uuidv4(), name: 'Logitech G Pro X', description: 'Teclado mecánico para gaming con iluminación RGB y switches GX Blue', price: 130.00, imageUrl: 'logitech_g_pro_x.png', categoryId: categories[2].id },
    { id: uuidv4(), name: 'Corsair K95 RGB Platinum', description: 'Teclado mecánico con switches Cherry MX Speed y retroiluminación RGB', price: 200.00, imageUrl: 'corsair_k95_rgb_platinum.png', categoryId: categories[2].id },
    { id: uuidv4(), name: 'WD Black SN850', description: 'SSD NVMe de 1TB con velocidades de lectura de hasta 7000 MB/s', price: 180.00, imageUrl: 'wd_black_sn850.png', categoryId: categories[5].id },
    { id: uuidv4(), name: 'Seagate BarraCuda', description: 'Disco duro interno de 4TB, 7200 RPM, con 256MB de caché', price: 100.00, imageUrl: 'seagate_barracuda.png', categoryId: categories[5].id },
    { id: uuidv4(), name: 'HyperX Fury 16GB', description: 'Memoria RAM DDR4 de 16GB, 3200MHz, CL16', price: 80.00, imageUrl: 'hyperx_fury_16gb.png', categoryId: categories[6].id },
    { id: uuidv4(), name: 'Corsair Vengeance LPX 32GB', description: 'Kit de memoria RAM DDR4 de 32GB, 3600MHz, CL18', price: 160.00, imageUrl: 'corsair_vengeance_lpx_32gb.png', categoryId: categories[6].id },
    { id: uuidv4(), name: 'ASUS ROG Strix RTX 3080', description: 'Tarjeta gráfica NVIDIA GeForce RTX 3080 con 10GB GDDR6X', price: 800.00, imageUrl: 'asus_rog_strix_rtx_3080.png', categoryId: categories[7].id },
    { id: uuidv4(), name: 'MSI GeForce GTX 1660 Super', description: 'Tarjeta gráfica con 6GB GDDR6, diseño compacto y eficiente', price: 250.00, imageUrl: 'msi_geforce_gtx_1660_super.png', categoryId: categories[7].id },
    { id: uuidv4(), name: 'Corsair RM850x', description: 'Fuente de poder modular de 850W, certificación 80 PLUS Gold', price: 150.00, imageUrl: 'corsair_rm850x.png', categoryId: categories[8].id },
    { id: uuidv4(), name: 'EVGA 600 W1', description: 'Fuente de poder de 600W, certificación 80 PLUS White', price: 50.00, imageUrl: 'evga_600_w1.png', categoryId: categories[8].id },
    { id: uuidv4(), name: 'NZXT H510', description: 'Gabinete ATX Mid Tower, diseño minimalista y buena gestión de cables', price: 70.00, imageUrl: 'nzxt_h510.png', categoryId: categories[9].id },
    { id: uuidv4(), name: 'Cooler Master MasterBox Q300L', description: 'Gabinete Micro ATX con panel lateral de acrílico y filtro magnético de polvo', price: 50.00, imageUrl: 'cooler_master_masterbox_q300l.png', categoryId: categories[9].id },
    { id: uuidv4(), name: 'Bose SoundLink Revolve', description: 'Altavoz Bluetooth portátil con sonido envolvente de 360 grados', price: 200.00, imageUrl: 'bose_soundlink_revolve.png', categoryId: categories[10].id },
    { id: uuidv4(), name: 'JBL Charge 4', description: 'Altavoz Bluetooth resistente al agua con batería de larga duración', price: 150.00, imageUrl: 'jbl_charge_4.png', categoryId: categories[10].id },
    { id: uuidv4(), name: 'Amazon Kindle Oasis', description: 'Lector de libros electrónicos con pantalla de 7 pulgadas y ajuste automático de luz', price: 250.00, imageUrl: 'amazon_kindle_oasis.png', categoryId: categories[11].id },

];

const orders = [
    { id: uuidv4(), userId: users[1].id, totalAmount: 1699.00, items: JSON.stringify([{ productId: products[0].id, quantity: 1 }, { productId: products[1].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 5700.00, items: JSON.stringify([{ productId: products[1].id, quantity: 2 }, { productId: products[4].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 1000.00, items: JSON.stringify([{ productId: products[2].id, quantity: 1 }, { productId: products[5].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 2700.00, items: JSON.stringify([{ productId: products[3].id, quantity: 5 }, { productId: products[2].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 19200.00, items: JSON.stringify([{ productId: products[4].id, quantity: 7 }, { productId: products[6].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 1300.00, items: JSON.stringify([{ productId: products[5].id, quantity: 2 }, { productId: products[2].id, quantity: 2 }]), status: 'completed' },
    { id: uuidv4(), userId: users[1].id, totalAmount: 2848.00, items: JSON.stringify([{ productId: products[6].id, quantity: 1 }, { productId: products[1].id, quantity: 2 }]), status: 'completed' },

];

module.exports = {
    users,
    categories,
    products,
    orders,
};
