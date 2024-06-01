# README - Aplicação Web de Crowdfunding

## Visão Geral
Bem-vindo ao README do MagicFounders. Esta aplicação web permite aos usuários criar e apoiar projetos financeiramente, oferecendo uma plataforma interativa para conectar criadores e apoiadores.

## Recursos Principais
- **Cadastro de Usuários:** Os usuários podem se cadastrar na plataforma para criar e apoiar campanhas.
- **Criação de Projetos:** Criadores podem lançar seus próprios projetos de crowdfunding, detalhando objetivos, prazos e recompensas para os apoiadores.
- **Exploração de Projetos:** Os usuários podem explorar uma variedade de projetos disponíveis para apoiar, com filtros por categoria, popularidade, etc.
- **Gestão de Projetos:** Criadores têm acesso a ferramentas para gerenciar suas campanhas, atualizando informações e interagindo com os apoiadores.
- **Apoio Financeiro:** Os apoiadores podem contribuir financeiramente com os projetos escolhidos, selecionando recompensas disponíveis ou oferecendo um valor personalizado.
- **Pagamentos Seguros:** Integração com um sistema de pagamento seguro para processar transações financeiras com confiança.

## Tecnologias Utilizadas
1. **Frontend**
   - Vue.js
   - Bootstrap
2. **Backend**
   - Node.js
3. **Banco de Dados**
   - MongoDB
4. **Autenticação**
   - JSON Web Tokens (JWT)

## Arquitetura
Este projeto segue uma arquitetura de três camadas:

1. **Camada de Apresentação (Frontend):**
   - Desenvolvida Vue e Bootstrap
   - Comunica-se com a camada de lógica de negócios por meio de APIs RESTful.

2. **Camada de Lógica de Negócios (Backend):**
   - Desenvolvida utilizando Node.js.
   - Responsável pela lógica de aplicação e processamento de dados.
   - Gerencia autenticação de usuários, manipulação de dados de projetos, gestão de transações financeiras, etc.
   - Comunica-se com a camada de dados para acessar e persistir informações.

3. **Camada de Dados (Banco de Dados):**
   - Utiliza MongoDB para armazenamento e gerenciamento de dados.
   - Armazena informações relacionadas a usuários, projetos, transações, etc.

### Considerações Adicionais:

- **Segurança:**
  - Implementar práticas de segurança robustas, incluindo autenticação e autorização adequadas usando JSON Web Tokens (JWT) e mecanismos de criptografia.
  - Validar e sanitizar todos os dados de entrada para evitar vulnerabilidades como injeção de SQL, XSS, CSRF, etc.

- **Escalabilidade:**
  - Projetar a aplicação de forma escalável, permitindo que ela cresça conforme a demanda, por meio de técnicas como balanceamento de carga, escalonamento horizontal e uso de serviços em nuvem.

- **Monitoramento e Logging:**
  - Implementar ferramentas de monitoramento para acompanhar o desempenho da aplicação, identificar possíveis gargalos e garantir alta disponibilidade.
  - Registrar eventos e erros de forma adequada para facilitar a depuração e solução de problemas.

- **Testes Automatizados:**
  - Desenvolver testes automatizados abrangentes para garantir a qualidade do código e a estabilidade da aplicação, incluindo testes unitários, de integração e de ponta a ponta.

- **Padrões de Projeto e Boas Práticas:**
  - Adotar padrões de projeto como MVC (Model-View-Controller) ou MVVM (Model-View-ViewModel) para promover uma arquitetura limpa e modular.
  - Seguir boas práticas de desenvolvimento de software, como princípios SOLID, DRY (Don't Repeat Yourself) e KISS (Keep It Simple, Stupid).

## Instalação
1. Backend - NPM INSTALL DEV
2. FrontEnd- NPM INSTALL SERVE 

## Uso
1. **Não se aplica ainda.** 

## Autores
 - Alexandre Tessaro Viera
 - Leonardo Pereira Borges
 - Richard Schmitz Riedo

