# Relatório de Desenvolvimento - Projeto de Aplicativo Mobile

**Disciplina:** Programação para Dispositivos Móveis  
**Tecnologia Utilizada:** React Native, Expo

---

## Objetivo do Projeto

O projeto tem como objetivo o desenvolvimento de um aplicativo mobile de delivery de alimentos, denominado **"IpuFood"**, voltado tanto para usuários finais (clientes) quanto para administradores (gestores dos produtos). 

---

## Atividades Desenvolvidas - Primeira Iteração

### 1. Planejamento e Prototipação (Figma)

- Criamos um protótipo de alta fidelidade no Figma, com telas dedicadas ao fluxo de uso do cliente e do administrador.
- O protótipo foi dividido em dois conjuntos principais:
  - **Telas Cliente**
  - **Telas ADM/Produtos**
- Esse protótipo serviu de referência visual e estrutural para o início da implementação.

### 2. Implementação Inicial das Telas

Utilizando React Native com suporte do Expo, implementamos as primeiras telas do aplicativo, com foco na estruturação do layout e da navegação.

#### Telas Cliente (parcialmente implementadas)

- Splash Screen (Login e Cadastro)
- Tela Home com listagem de produtos
- Tela de detalhes do produto

#### Telas ADM/Produtos (parcialmente implementadas)

- Splash Screen (Login e Cadastro)
- Tela Home com listagem de produtos
- Tela de detalhes do produto

### 3. Navegação entre Telas

- Utilizamos a biblioteca **React Navigation** para estruturar a navegação do app.
- As rotas foram organizadas em dois fluxos principais: um para o cliente e outro para o administrador.
- A navegação já permite simular o fluxo de login, visualização da home e detalhes dos produtos.

### 4. Estilização Inicial

- Aplicamos a identidade visual proposta no protótipo do Figma, com paleta de cores predominante em vermelho e branco.
- Garantimos responsividade básica para diferentes tamanhos de tela, testando em emuladores e dispositivos reais.

---

## Resultados Alcançados

- Estrutura de navegação entre telas implementada com sucesso.
- Telas principais dos fluxos de cliente e administrador já estão funcionais.
- Interface visual compatível com o protótipo inicial.
- Projeto organizado para facilitar iterações futuras com integração de dados.

---

## Limitações e Próximos Passos

- Esta é apenas a **primeira iteração** do projeto, com foco exclusivo na interface e navegação.
- Ainda **não há integração com back-end**, mas está prevista para as próximas fases do desenvolvimento.

### Próximas etapas:

- Finalizar as telas restantes (pagamento, edição de produtos, perfil do usuário, etc.).
- Adicionar feedbacks visuais como pop-ups de sucesso e mensagens de erro.
- Iniciar a implementação do back-end e conectar com o front-end.
- Realizar testes de usabilidade e ajustes visuais com base no feedback dos usuários.

---

## Conclusão

A primeira iteração do projeto **IpuFood** foi dedicada à criação da interface gráfica e à estruturação da navegação entre as telas, com base no protótipo desenvolvido em Figma. O progresso alcançado fornece uma base sólida para as próximas fases do desenvolvimento, que incluirão a finalização das telas e a integração com um back-end funcional. O projeto está evoluindo de forma organizada e alinhada aos objetivos da disciplina.
