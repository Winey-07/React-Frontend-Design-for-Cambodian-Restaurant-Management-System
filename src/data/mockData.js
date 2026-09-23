export const menuItems = [
  { id: 1, name: 'Beef Lok Lak', category: 'Cambodian Food', price: 4.5, status: 'Available' },
  { id: 2, name: 'Fish Amok', category: 'Cambodian Food', price: 3.5, status: 'Available' },
  { id: 3, name: 'Fried Rice', category: 'Rice', price: 2.5, status: 'Available' },
  { id: 4, name: 'Kuy Teav', category: 'Noodles', price: 2.5, status: 'Available' },
  { id: 5, name: 'Iced Coffee', category: 'Drinks', price: 1.5, status: 'Available' },
  { id: 6, name: 'Chicken Rice', category: 'Rice', price: 3.0, status: 'Available' },
  { id: 7, name: 'Fried Noodles', category: 'Noodles', price: 2.5, status: 'Available' },
  { id: 8, name: 'Spring Rolls', category: 'Snacks', price: 2.0, status: 'Available' },
  { id: 9, name: 'Mango Smoothie', category: 'Drinks', price: 2.5, status: 'Available' },
  { id: 10, name: 'Fresh Coconut', category: 'Drinks', price: 1.5, status: 'Available' },
  { id: 11, name: 'Num Pang', category: 'Snacks', price: 1.5, status: 'Available' },
  { id: 12, name: 'Babar (Rice Porridge)', category: 'Rice', price: 2.0, status: 'Available' },
];

export const categories = [
  { id: 1, name: 'Cambodian Food', itemCount: 2 },
  { id: 2, name: 'Rice', itemCount: 3 },
  { id: 3, name: 'Noodles', itemCount: 2 },
  { id: 4, name: 'Drinks', itemCount: 3 },
  { id: 5, name: 'Desserts', itemCount: 0 },
  { id: 6, name: 'Snacks', itemCount: 2 },
];

export const tables = [
  { id: 1, number: '01', seats: 2, status: 'Available' },
  { id: 2, number: '02', seats: 4, status: 'Occupied' },
  { id: 3, number: '03', seats: 2, status: 'Available' },
  { id: 4, number: '04', seats: 6, status: 'Reserved' },
  { id: 5, number: '05', seats: 4, status: 'Available' },
  { id: 6, number: '06', seats: 2, status: 'Occupied' },
  { id: 7, number: '07', seats: 8, status: 'Available' },
  { id: 8, number: '08', seats: 4, status: 'Available' },
];

export const orders = [
  { id: '001', table: 'Table 1', total: 12.5, status: 'Pending', items: 3, date: '21 September 2026' },
  { id: '002', table: 'Table 3', total: 18.0, status: 'Preparing', items: 4, date: '21 September 2026' },
  { id: '003', table: 'Table 5', total: 25.0, status: 'Completed', items: 5, date: '21 September 2026' },
  { id: '004', table: 'Table 2', total: 8.5, status: 'Ready', items: 2, date: '21 September 2026' },
  { id: '005', table: 'Table 4', total: 32.0, status: 'Pending', items: 7, date: '21 September 2026' },
];