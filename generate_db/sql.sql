-- dblibrarymanager.autor definition

CREATE TABLE `autor` (
  `autor_id` varchar(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`autor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.codigo definition

CREATE TABLE `codigo` (
  `codigo` int(8) NOT NULL,
  `data_expiracao` date NOT NULL,
  `validado` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.codigo_recuperar_senha definition

CREATE TABLE `codigo_recuperar_senha` (
  `codigo` varchar(100) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `valido` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.editora definition

CREATE TABLE `editora` (
  `editora_id` varchar(36) NOT NULL,
  `editora` varchar(255) NOT NULL,
  PRIMARY KEY (`editora_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.endereco definition

CREATE TABLE `endereco` (
  `endereco_id` varchar(36) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `logradouro` varchar(150) NOT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `uf` char(2) DEFAULT NULL,
  `numero` int(11) NOT NULL,
  PRIMARY KEY (`endereco_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.estoque definition

CREATE TABLE `estoque` (
  `estoque_id` int(11) NOT NULL AUTO_INCREMENT,
  `livro_id` varchar(36) NOT NULL,
  `quantidade_livro` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`estoque_id`),
  KEY `fk_ESTOQUE_LIVRO` (`livro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


-- dblibrarymanager.genero definition

CREATE TABLE `genero` (
  `genero_id` varchar(36) NOT NULL,
  `genero` varchar(255) NOT NULL,
  PRIMARY KEY (`genero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.pagamento definition

CREATE TABLE `pagamento` (
  `id` varchar(100) NOT NULL,
  `usuario_id` varchar(100) NOT NULL,
  `aluguel_id` varchar(100) NOT NULL,
  `valor` decimal(7,2) NOT NULL,
  `url_pagamento` varchar(100) NOT NULL DEFAULT 'NÃO POSSUI LINK DE PAGAMENTO.',
  `pagamento_realizado` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `link_multa` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `codigo_transacao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.livro definition

CREATE TABLE `livro` (
  `livro_id` varchar(36) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor_id` varchar(255) NOT NULL,
  `editora_id` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `qtd_paginas` int(11) NOT NULL,
  `publicacao` date NOT NULL,
  `preco` decimal(7,2) DEFAULT '0.00',
  `capa` varchar(1000) DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`livro_id`),
  KEY `FK_f1203dddd43f0e8abaf15a177c1` (`autor_id`),
  KEY `FK_3c6e949dd5582197e46cafcbecf` (`editora_id`),
  CONSTRAINT `FK_3c6e949dd5582197e46cafcbecf` FOREIGN KEY (`editora_id`) REFERENCES `editora` (`editora_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f1203dddd43f0e8abaf15a177c1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.livro_genero definition

CREATE TABLE `livro_genero` (
  `livro_id` varchar(36) NOT NULL,
  `genero_id` varchar(36) NOT NULL,
  PRIMARY KEY (`livro_id`,`genero_id`),
  KEY `livro_genero_ibfk_2` (`genero_id`),
  CONSTRAINT `livro_genero_ibfk_1` FOREIGN KEY (`livro_id`) REFERENCES `livro` (`livro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `livro_genero_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`genero_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.alugueis_finalizados definition

CREATE TABLE `alugueis_finalizados` (
  `aluguel_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `dia_finalizado` date NOT NULL,
  PRIMARY KEY (`aluguel_id`,`usuario_id`),
  KEY `alugueis_finalizados_FK_1` (`usuario_id`),
  CONSTRAINT `alugueis_finalizados_FK` FOREIGN KEY (`aluguel_id`) REFERENCES `aluguel` (`aluguel_id`),
  CONSTRAINT `alugueis_finalizados_FK_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.aluguel definition

CREATE TABLE `aluguel` (
  `aluguel_id` varchar(36) NOT NULL,
  `data_alugacao` date NOT NULL,
  `data_devolucao` date NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `codigo` int(8) DEFAULT NULL,
  `aluguel_validado` tinyint(1) DEFAULT '0',
  `status_aluguel` enum('NAO_VALIDADO','EM_ANDAMENTO','FINALIZADO') NOT NULL DEFAULT 'NAO_VALIDADO',
  `valor_total` decimal(7,2) NOT NULL,
  PRIMARY KEY (`aluguel_id`),
  KEY `aluguel_codigo_FK` (`codigo`),
  KEY `aluguel_FK` (`usuario_id`),
  CONSTRAINT `aluguel_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `aluguel_codigo_FK` FOREIGN KEY (`codigo`) REFERENCES `codigo` (`codigo`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.livros_alugados definition

CREATE TABLE `livros_alugados` (
  `livro_id` varchar(36) NOT NULL,
  `aluguel_id` varchar(36) NOT NULL,
  PRIMARY KEY (`livro_id`,`aluguel_id`),
  KEY `livros_alugados_FK` (`aluguel_id`),
  CONSTRAINT `livros_alugados_FK` FOREIGN KEY (`aluguel_id`) REFERENCES `aluguel` (`aluguel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `livros_alugados_FK_1` FOREIGN KEY (`livro_id`) REFERENCES `livro` (`livro_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.livros_alugados_finalizados definition

CREATE TABLE `livros_alugados_finalizados` (
  `aluguel_id` varchar(36) NOT NULL,
  `livro_id` varchar(36) NOT NULL,
  PRIMARY KEY (`aluguel_id`,`livro_id`),
  KEY `livros_alugados_finalizados_FK_1` (`livro_id`),
  CONSTRAINT `livros_alugados_finalizados_FK` FOREIGN KEY (`aluguel_id`) REFERENCES `aluguel` (`aluguel_id`),
  CONSTRAINT `livros_alugados_finalizados_FK_1` FOREIGN KEY (`livro_id`) REFERENCES `livro` (`livro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- dblibrarymanager.usuario definition

CREATE TABLE `usuario` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `endereco_id` varchar(36) NOT NULL,
  `aluguel_id` varchar(36) DEFAULT NULL,
  `nivel_leitor` enum('BRONZE','PRATA','OURO','DIAMANTE') NOT NULL DEFAULT 'BRONZE',
  `role` enum('USUARIO','ADMINISTRADOR','MASTER') NOT NULL DEFAULT 'USUARIO',
  `status_acesso` enum('DESBLOQUEADO','BLOQUEADO') NOT NULL DEFAULT 'DESBLOQUEADO',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `telefone` (`telefone`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `endereco_id` (`endereco_id`),
  UNIQUE KEY `email` (`email`),
  KEY `usuario_FK_1` (`aluguel_id`),
  CONSTRAINT `usuario_FK` FOREIGN KEY (`endereco_id`) REFERENCES `endereco` (`endereco_id`),
  CONSTRAINT `usuario_FK_1` FOREIGN KEY (`aluguel_id`) REFERENCES `aluguel` (`aluguel_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;