# Integração SQLite - Guia de Teste

## 📋 O que foi implementado

✅ **Banco de Dados SQLite** com tabelas para:
- Turmas
- Professores
- Alunos
- Avaliações
- Frequências

✅ **Repositórios** (Padrão Repository) para cada entidade com operações CRUD

✅ **Rotas REST** atualizadas para usar SQLite

✅ **Inicialização automática** do banco de dados na inicialização do servidor

---

## 🚀 Passos para Testar

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Executar Testes Automáticos

```bash
npm run test
```

Este comando executará um script de teste completo que:
- Verifica a inicialização do banco de dados
- Testa CRUD de todas as entidades
- Valida relacionamentos entre tabelas
- Testa cálculos (média de avaliações, percentual de frequência)
- Exibe relatório de sucesso/falha

**Resultado esperado:** ✓ Todos os testes passaram!

### 3. Iniciar o Servidor

```bash
npm start
```

Ou com nodemon (reload automático):

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3000`

---

## 🧪 Testar Endpoints com cURL ou Postman

### Criar uma Turma

```bash
curl -X POST http://localhost:3000/turmas \
  -H "Content-Type: application/json" \
  -d '{
    "nomeTurma": "1º Ano A",
    "anoLetivo": 2024
  }'
```

### Criar um Professor

```bash
curl -X POST http://localhost:3000/professores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@escola.com",
    "disciplina": "Matemática"
  }'
```

### Criar um Aluno

```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "matricula": "MAT001",
    "idade": 15,
    "turmaId": 1
  }'
```

### Criar uma Avaliação

```bash
curl -X POST http://localhost:3000/avaliacoes \
  -H "Content-Type: application/json" \
  -d '{
    "alunoId": 1,
    "professorId": 1,
    "disciplina": "Matemática",
    "nota": 8.5,
    "data": "2024-06-20"
  }'
```

### Criar Frequência

```bash
curl -X POST http://localhost:3000/frequencias \
  -H "Content-Type: application/json" \
  -d '{
    "alunoId": 1,
    "turmaId": 1,
    "totalAulas": 20,
    "presentes": 18,
    "mes": 6,
    "ano": 2024
  }'
```

### Obter Todos os Alunos

```bash
curl http://localhost:3000/alunos
```

### Obter Turma com Seus Alunos

```bash
curl http://localhost:3000/turmas/1/alunos
```

### Obter Avaliações de um Aluno

```bash
curl http://localhost:3000/avaliacoes/aluno/1
```

### Obter Frequências de um Aluno

```bash
curl http://localhost:3000/frequencias/aluno/1
```

---

## 📁 Estrutura de Arquivos Criados

```
backend/
├── src/
│   ├── database/
│   │   ├── db.js              # Conexão com SQLite
│   │   └── init.js            # Inicialização das tabelas
│   ├── repositories/
│   │   ├── AlunoRepository.js
│   │   ├── TurmaRepository.js
│   │   ├── ProfessorRepository.js
│   │   ├── AvaliacaoRepository.js
│   │   └── FrequenciaRepository.js
│   ├── routes/
│   │   ├── alunosRoutes.js        (ATUALIZADO)
│   │   ├── professoresRoutes.js   (ATUALIZADO)
│   │   ├── turmasRoutes.js        (ATUALIZADO)
│   │   ├── avaliacoesRoutes.js    (ATUALIZADO)
│   │   └── frequenciasRoutes.js   (ATUALIZADO)
│   └── app.js                     (ATUALIZADO)
├── test.js                    # Script de testes
├── escola.db                  # Banco de dados SQLite (criado automaticamente)
├── package.json               (ATUALIZADO com script test)
└── server.js
```

---

## 🔍 Verificar o Banco de Dados

### Visualizar com SQLite Browser

1. Baixe o SQLite Browser: https://sqlitebrowser.org/
2. Abra o arquivo: `backend/escola.db`
3. Explore as tabelas criadas

### Via Terminal (SQLite CLI)

```bash
sqlite3 backend/escola.db
.tables                    # Listar tabelas
SELECT * FROM alunos;      # Ver alunos
SELECT * FROM turmas;      # Ver turmas
SELECT * FROM avaliacoes;  # Ver avaliações
.quit                      # Sair
```

---

## ✅ Checklist de Validação

- [ ] `npm install` executado com sucesso
- [ ] `npm run test` mostra todos os testes passando
- [ ] Arquivo `escola.db` criado em `backend/`
- [ ] Servidor inicia sem erros: `npm start`
- [ ] Endpoints respondendo corretamente
- [ ] Dados persistem no SQLite (mesmo após reiniciar o servidor)

---

## 🐛 Troubleshooting

### Erro: "sqlite3" not found
```bash
npm install sqlite3 --save
```

### Banco de dados vazio ou corrompido
```bash
# Remova o banco antigo
rm backend/escola.db

# Reinicie o servidor
npm start
# As tabelas serão recriadas automaticamente
```

### Erro de permissão ao criar arquivo
Certifique-se que a pasta `backend/` tem permissões de escrita.

---

## 📝 Notas Importantes

1. **Persistência**: Todos os dados agora são salvos no SQLite (não em memória)
2. **Relacionamentos**: As tabelas tem chaves estrangeiras configuradas
3. **Async/Await**: Todas as operações do banco são assíncronas
4. **Padrão Repository**: Facilita manutenção e testes futuros
5. **Endpoints novos**: 
   - `GET /turmas/:id/alunos` - Turma com seus alunos
   - `GET /avaliacoes/aluno/:alunoId` - Avaliações de um aluno
   - `GET /frequencias/aluno/:alunoId` - Frequências de um aluno
   - `GET /frequencias/turma/:turmaId` - Frequências de uma turma

---

## 🎯 Próximas Melhorias (Opcional)

- [ ] Adicionar autenticação/JWT
- [ ] Implementar paginação nos endpoints
- [ ] Adicionar validação de dados com Joi ou Yup
- [ ] Criar seeders para dados de teste
- [ ] Implementar soft deletes
- [ ] Adicionar índices nas colunas de busca frequente
