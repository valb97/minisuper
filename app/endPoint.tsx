let url; // Variable temporal

if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
  url = 'http://localhost:3000/products';
} else {
  url = 'http://10.0.2.2:3000/products';
}

export const apiUrl = url; // Asignar el valor a la