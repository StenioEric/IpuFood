# 🍕 IpuFood - App de Delivery

Um aplicativo React Native completo para delivery de comida, com sistema de relatórios integrado ao Firebase.

## 🚀 Funcionalidades

- ✅ Autenticação de usuários (Firebase Auth)
- ✅ Sistema de roles (Admin/Cliente)
- ✅ Relatórios de vendas (Admin)
- ✅ Relatórios de compras (Cliente)
- ✅ Interface moderna e responsiva
- ✅ Navegação intuitiva
- ✅ Dados em tempo real (Firestore)

## 🔥 Integração Firebase

O projeto está configurado para usar Firebase como backend. Siga os passos abaixo para configurar:

### 1. Configuração do Firebase

1. **Crie um projeto no Firebase:**
   - Acesse [console.firebase.google.com](https://console.firebase.google.com)
   - Clique em "Adicionar projeto"
   - Siga o assistente de configuração

2. **Configure a autenticação:**
   - Vá para Authentication > Sign-in method
   - Habilite "Email/Password"
   - Opcional: Configure outros métodos (Google, Facebook, etc.)

3. **Configure o Firestore:**
   - Vá para Firestore Database
   - Crie um banco de dados em modo de teste
   - Configure as regras de segurança (veja exemplo no arquivo `firebase-config-example.js`)

4. **Obtenha as credenciais:**
   - Vá para Configurações do projeto > Geral
   - Role até "Seus apps" e clique em "Adicionar app" > Web
   - Copie as credenciais

5. **Configure no projeto:**
   - Abra `services/firebase.ts`
   - Substitua as credenciais de exemplo pelas suas reais

### 2. Populando o Banco

Execute o script de seed para criar dados iniciais:

```bash
node scripts/seedDatabase.js
```

Isso criará:
- Usuário admin: `admin@ipufood.com` / `admin123`
- Usuário cliente: `cliente@ipufood.com` / `cliente123`
- Pedidos de exemplo

### 3. Estrutura do Banco

#### Coleção: `users`
```javascript
{
  name: string,
  email: string,
  role: 'admin' | 'user',
  phone: string,
  address: string
}
```

#### Coleção: `orders`
```javascript
{
  userId: string,
  userName: string,
  items: OrderItem[],
  total: number,
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled',
  paymentMethod: 'credit' | 'pix' | 'cash',
  createdAt: timestamp,
  deliveredAt: timestamp (opcional)
}
```

## 📊 Relatórios

O sistema inclui dois tipos de relatórios integrados com Firebase:

### Relatório de Vendas (Admin)
- Acesso: Apenas administradores
- Localização: Perfil > Relatório de Vendas
- Funcionalidades:
  - Resumo geral de vendas (dados reais do Firebase)
  - Gráfico de receita por dia
  - Top produtos mais vendidos
  - Lista de pedidos recentes
  - Filtros por período (semana/mês/ano)

### Relatório de Compras (Cliente)
- Acesso: Todos os usuários
- Localização: Perfil > Meus Pedidos
- Funcionalidades:
  - Resumo de gastos pessoais (dados reais do Firebase)
  - Gráfico de gastos por dia
  - Categorias favoritas
  - Histórico completo de pedidos
  - Filtros por período (semana/mês/ano)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd IpuFood
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o Firebase:**
   - Siga as instruções acima para configurar o Firebase
   - Atualize as credenciais em `services/firebase.ts`

4. **Execute o seed do banco:**
```bash
node scripts/seedDatabase.js
```

5. **Inicie o projeto:**
```bash
npm start
```

## 📱 Como Usar

### Login
- **Admin:** `admin@ipufood.com` / `admin123`
- **Cliente:** `cliente@ipufood.com` / `cliente123`

### Navegação
1. Faça login com as credenciais acima
2. Acesse o perfil (ícone de usuário)
3. Clique em "Relatório de Vendas" (admin) ou "Meus Pedidos" (cliente)
4. Explore os relatórios e filtros disponíveis

## 🏗️ Arquitetura

```
src/
├── components/          # Componentes reutilizáveis
├── context/            # Context API (UserContext)
├── navigation/         # Configuração de navegação
├── screens/           # Telas do aplicativo
│   ├── Auth/         # Telas de autenticação
│   └── Reports/      # Telas de relatórios
├── services/          # Serviços do Firebase
│   ├── firebase.ts   # Configuração do Firebase
│   ├── userService.ts # Serviços de usuário
│   └── orderService.ts # Serviços de pedidos
├── types/             # Definições de tipos TypeScript
└── scripts/           # Scripts utilitários
```

## 🔧 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Firebase** - Backend como serviço
  - Authentication - Autenticação
  - Firestore - Banco de dados
- **React Navigation** - Navegação
- **TypeScript** - Tipagem estática
- **React Hook Form** - Formulários
- **Yup** - Validação de schemas

## 📋 Próximos Passos

- [ ] Implementar sistema de produtos
- [ ] Adicionar carrinho de compras
- [ ] Sistema de pagamentos
- [ ] Notificações push
- [ ] Geolocalização
- [ ] Avaliações e comentários

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório. 