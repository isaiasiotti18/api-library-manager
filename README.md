# API LIBRARY MANAGER

Eu desenvolvi essa Api mais como projeto pessoal para ter no meu currículo. E também testar minha habilidades como desenvolvedor. Aceito qualquer tipo de critica construtiva e dicas. O codigo não é dos melhores, mas foi feito com amor <3 s2 kkkk

Pequei em muitas partes e sei que preciso melhorar, porém desenvolver esse projeto foi uma experiência muito boa! Em certos pontos do código vocês irão perceber algumas "lambanças" que ocorreram por causa da pressa. Esse projeto, como ja foi dito, foi construido com o intuito de ser usado como projeto pessoal para o meu currículo.

Opa! **Segue o problema que eu queria resolver.**

Uma certa biblioteca está com dificuldades para gerenciar os livros que são alugados, acontece que muita das vezes o prazo de entrega acaba passando e a biblioteca acaba não conseguindo exercer um controle sobre esse problema. Os leitores também as vezes querem estender o prazo com aquele determinado livro. Porém esse prazo estendido só será possível adquiri-lo através de níveis, ou seja, o aumento de nível só vem a partir do momento que o leitor pega um livro e devolve dentro do prazo.

## Caso queira testar a Api:

```git
git clone https://github.com/isaiasiotti18/api-library-manager.git

npm install

Você vai precisar criar um container com um banco de dados MySQL

docker run -e MYSQL_ROOT_PASSWORD=root --name myMySQL -d mysql:5.7

Como eu criei todas as entidades na mão no banco de dados, pegue o script na pasta /generate_db e rode ele para criar o banco de dados.
```
## Status do Projeto [FINALIZADO PARCIALMENTE]

Pretendo adicionar mais algumas features, e também fazer modificações no código para deixar ele mais "clean" e organizado.

### Atualizações: 
  - [ ] Lista de livros favoritos
  - [ ] Implementar a regra de níveis
  - [ ] Hospedar a Api
  - [ ] Pretendo lançar uma versão 2.0, porém seguindo os padrões arquiteturais de microserviços

### Refatorações que preciso fazer:
  - [ ] VERIFICAR REPETIÇÕES DE CÓDIGO
  - [ ] NOMES DE VARIÁVEIS, FUNÇÕES, CLASSES
  - [ ] PARAMETROS E RETORNOS DE FUNÇÕES
  - [ ] SEPARAÇÃO DE ERROS E EXCEÇÕES
  - [ ] SEPARAÇÃO DE RESPONSABILIDADES
  - [ ] CONSCISTÊNCIA DE NOMES DE VARIÁVEIS, FUNÇÕES, CLASSES, ABSTRAÇÕES
  - [ ] DIVIDIR FUNÇÕES GRANDES EM VÁRIAS OUTRAS MENORES

## Ferramentas que usei no projeto:

- [x] NodeJs e Typescript
- [x] NestJs
- [x] TypeORM
- [x] Swagger
- [x] MySQL
- [x] AWS S3
- [x] MailTrap
- [x] Stripe
- [x] Cep Correios

## Endpoints e funcionalidades

## Autor

<div>
<a href="https://www.instagram.com/isaias.devbackend/" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
<a href = "mailto:contato@isaiasiottiprofissional"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/isaiasiotti" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
</div>


## Licença

MIT LICENSE

Isaias Batista dos Santos - 2022
