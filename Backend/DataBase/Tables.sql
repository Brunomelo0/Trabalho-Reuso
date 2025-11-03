CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE feirante (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    endereco TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feira (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    localizacao TEXT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL
);

CREATE TABLE estande (
    id SERIAL PRIMARY KEY,
    feira_id INT REFERENCES feira(id) ON DELETE CASCADE,
    feirante_id INT REFERENCES feirante(id) ON DELETE SET NULL,
    numero VARCHAR(10) NOT NULL,
    tamanho_m2 DECIMAL(5,2) NOT NULL,
    UNIQUE(feira_id, numero)
);

CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    feirante_id INT REFERENCES feirante(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50)
);

CREATE TABLE venda (
    id SERIAL PRIMARY KEY,
    feirante_id INT REFERENCES feirante(id) ON DELETE CASCADE,
    feira_id INT REFERENCES feira(id) ON DELETE CASCADE,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL
);

CREATE TABLE item_venda (
    id SERIAL PRIMARY KEY,
    venda_id INT REFERENCES venda(id) ON DELETE CASCADE,
    produto_id INT REFERENCES produto(id) ON DELETE CASCADE,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED
);