CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  precio NUMERIC(10,2),
  stock INTEGER
);

INSERT INTO productos (nombre, categoria, precio, stock) VALUES
('Gorra Verde', 'Accesorios', 14.99, 100),
('Camiseta Roja', 'Ropa', 19.99, 50),
('Pantalón Azul', 'Ropa', 29.99, 30),
('Zapatos Negros', 'Calzado', 49.99, 20);
