-- TRIGGER PARA ATUALIZAR A COLUNA "codigo_validado" 
-- na TABELA "aluguel" APOS a validação do CODIGO na TABELA "codigo"
CREATE TRIGGER tr_atualiza_cl_CodigoValidado_tl_Aluguel
AFTER UPDATE ON codigo FOR EACH ROW
BEGIN
	UPDATE aluguel JOIN codigo
	ON aluguel.codigo = codigo.codigo
	SET aluguel.aluguel_validado = 1
	WHERE codigo.validado = 1;
END

-- TRIGGER PARA VOLTAR O ESTOQUE CASO O USUARIO DESISTA DO ALUGUEL OU NÃO VALIDE ELE
CREATE TRIGGER tr_estorna_estoque_livro
BEFORE DELETE ON livro FOR EACH ROW
BEGIN
	UPDATE
	livro as l
	INNER JOIN livros_alugados as la ON l.livro_id = la.livro_id
	INNER JOIN aluguel as al ON al.aluguel_id = la.aluguel_id
	SET estoque = estoque + 1
	WHERE al.validado
END