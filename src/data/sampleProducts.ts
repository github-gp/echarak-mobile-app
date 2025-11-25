// Sample medicinal plant products
export const sampleProducts = [
  {
    id: '1',
    name: 'Ashwagandha Root Powder',
    botanicalName: 'Withania somnifera',
    image: '/images/ashwagandha.jpg',
    price: 450,
    unit: 'kg',
    seller: 'Green Valley Organic Farm',
    sellerId: 'seller-001',
    location: 'Rajasthan',
    grade: 'Premium',
    certifications: ['Organic', 'AYUSH Certified'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    description: 'Premium quality Ashwagandha root powder sourced from organic farms in Rajasthan. Known for its adaptogenic properties and stress-relief benefits. Perfect for AYUSH manufacturers and wellness product companies.',
    activeCompounds: 'Withanolides 5-7%',
    minOrder: 10,
    availability: 500,
    shelfLife: '24 months',
    storageConditions: 'Cool, dry place away from direct sunlight',
  },
  {
    id: '2',
    name: 'Tulsi Leaves (Dried)',
    botanicalName: 'Ocimum sanctum',
    image: '/images/tulsi.jpg',
    price: 320,
    unit: 'kg',
    seller: 'Himalayan Herbs Co.',
    sellerId: 'seller-002',
    location: 'Uttarakhand',
    grade: 'Grade A',
    certifications: ['Organic'],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    description: 'Fresh dried Tulsi leaves from Himalayan region. Rich in antioxidants and essential oils. Ideal for tea manufacturers and herbal medicine production.',
    activeCompounds: 'Essential oils 0.7-1.2%',
    minOrder: 5,
    availability: 300,
    shelfLife: '18 months',
    storageConditions: 'Airtight container in cool place',
  },
  {
    id: '3',
    name: 'Turmeric Powder',
    botanicalName: 'Curcuma longa',
    image: '/images/turmeric.jpg',
    price: 280,
    unit: 'kg',
    seller: 'Kerala Spice Traders',
    sellerId: 'seller-003',
    location: 'Kerala',
    grade: 'Grade A',
    certifications: ['AYUSH Certified', 'ISO 9001'],
    inStock: true,
    rating: 4.9,
    reviews: 256,
    description: 'High curcumin content turmeric powder from Kerala farms. Excellent for pharmaceutical and nutraceutical applications.',
    activeCompounds: 'Curcumin 3-5%',
    minOrder: 20,
    availability: 1000,
    shelfLife: '24 months',
    storageConditions: 'Cool, dry, dark place',
  },
];

// Sample seller profiles
export const sellerProfiles = {
  'seller-001': {
    id: 'seller-001',
    name: 'Green Valley Organic Farm',
    location: 'Udaipur, Rajasthan',
    established: '2015',
    rating: 4.8,
    totalOrders: 1240,
    certifications: ['Organic India', 'AYUSH Certified', 'FSSAI'],
    responseTime: '2 hours',
    description: 'Certified organic farm specializing in Ayurvedic herbs with 200+ acres of cultivation.',
  },
  'seller-002': {
    id: 'seller-002',
    name: 'Himalayan Herbs Co.',
    location: 'Dehradun, Uttarakhand',
    established: '2012',
    rating: 4.7,
    totalOrders: 890,
    certifications: ['Organic India', 'GMP Certified'],
    responseTime: '4 hours',
    description: 'Himalayan medicinal plant specialists with sustainable harvesting practices.',
  },
};

// Sample cart items
export const sampleCart = [
  {
    id: '1',
    productId: '1',
    name: 'Ashwagandha Root Powder',
    price: 450,
    quantity: 25,
    unit: 'kg',
    seller: 'Green Valley Organic Farm',
  },
  {
    id: '2',
    productId: '2',
    name: 'Tulsi Leaves (Dried)',
    price: 320,
    quantity: 15,
    unit: 'kg',
    seller: 'Himalayan Herbs Co.',
  },
];

// Sample user data
export const sampleUser = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@ayushco.in',
  phone: '+91 98765 43210',
  company: 'AYUSH Products Pvt Ltd',
  role: 'Buyer',
  gstNumber: '29ABCDE1234F1Z5',
  address: {
    line1: 'Plot 45, Industrial Area',
    line2: 'Sector 18',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  },
  joinedDate: '2024-03-15',
};

// Sample order history
export const sampleOrders = [
  {
    id: 'ECH2024001234',
    date: '2024-11-23',
    status: 'in_transit',
    items: 2,
    total: 16050,
    trackingEnabled: true,
  },
  {
    id: 'ECH2024001189',
    date: '2024-11-10',
    status: 'delivered',
    items: 3,
    total: 24500,
    trackingEnabled: true,
  },
  {
    id: 'ECH2024001045',
    date: '2024-10-28',
    status: 'delivered',
    items: 1,
    total: 8900,
    trackingEnabled: true,
  },
];

// Sample tracking data (FarEye integration)
export const sampleTracking = {
  orderId: 'ECH2024001234',
  status: 'in_transit',
  estimatedDelivery: '2024-11-28',
  currentLocation: 'Mumbai Distribution Hub',
  carrier: 'Blue Dart Express',
  trackingSteps: [
    { status: 'Order Placed', date: '2024-11-23', time: '10:30 AM', completed: true },
    { status: 'Picked Up from Seller', date: '2024-11-24', time: '02:15 PM', completed: true },
    { status: 'In Transit', date: '2024-11-25', time: '09:45 AM', completed: true, current: true },
    { status: 'Out for Delivery', date: '2024-11-28', time: 'Expected', completed: false },
    { status: 'Delivered', date: '2024-11-28', time: 'Expected', completed: false },
  ],
  gpsLocation: {
    lat: 19.0760,
    lng: 72.8777,
  },
};
