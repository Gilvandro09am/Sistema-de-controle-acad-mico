# 🗄️ DIAGRAMA DA ARQUITETURA SQLite

## Estrutura Geral do Projeto

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│                 (sem mudanças necessárias)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP / REST
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  EXPRESS BACKEND                            │
├─────────────────────────────────────────────────────────────┤
│                      ROTAS (API)                            │
│  ├─ /alunos                                                 │
│  ├─ /turmas                                                 │
│  ├─ /professores                                            │
│  ├─ /avaliacoes                                             │
│  └─ /frequencias                                            │
├─────────────────────────────────────────────────────────────┤
│                   REPOSITÓRIOS                              │
│  ├─ AlunoRepository       (CRUD + obterPorTurma)            │
│  ├─ TurmaRepository       (CRUD + obterComAlunos)           │
│  ├─ ProfessorRepository   (CRUD)                            │
│  ├─ AvaliacaoRepository   (CRUD + obterMediaAluno)          │
│  └─ FrequenciaRepository  (CRUD + obterPercentualAluno)     │
├─────────────────────────────────────────────────────────────┤
│                  BANCO DE DADOS                             │
│  ├─ db.js (Conexão SQLite promisificada)                    │
│  └─ init.js (Criação de tabelas)                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                    SQLite3
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  escola.db (Arquivo)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   turmas     │  │ professores  │  │   alunos     │       │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤       │
│  │ id (PK)      │  │ id (PK)      │  │ id (PK)      │       │
│  │ nomeTurma    │  │ nome         │  │ nome         │       │
│  │ anoLetivo    │  │ email        │  │ matricula    │       │
│  └──────────────┘  │ disciplina   │  │ idade        │       │
│                    └──────────────┘  │ turmaId (FK) │       │
│                                      └──────────────┘       │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │  avaliacoes      │    │  frequencias     │               │
│  ├──────────────────┤    ├──────────────────┤               │
│  │ id (PK)          │    │ id (PK)          │               │
│  │ alunoId (FK)     │    │ alunoId (FK)     │               │
│  │ professorId (FK) │    │ turmaId (FK)     │               │
│  │ disciplina       │    │ totalAulas       │               │
│  │ nota             │    │ presentes        │               │
│  │ data             │    │ mes              │               │
│  └──────────────────┘    │ ano              │               │
│                          └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados

### Exemplo: Criar um Aluno

```
┌─────────────────┐
│   Cliente REST  │
│   (Frontend)    │
└────────┬────────┘
         │
    POST /alunos
    {nome, matricula, idade, turmaId}
         │
         ▼
┌─────────────────────────────────────┐
│   alunosRoutes.js                   │
│   router.post("/", async...)        │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   AlunoRepository.criar()           │
│   - Validação de dados              │
│   - Preparação SQL                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   promiseDb.run()                   │
│   INSERT INTO alunos (...)          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   SQLite3                           │
│   - Validar FK (turmaId)            │
│   - Inserir registro                │
│   - Retornar ID                     │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Retornar {id, nome, ...}          │
│   Status 201 (Created)              │
└─────────────────────────────────────┘
```

---

## Métodos do Repositório Padrão

```typescript
// Cada repositório implementa:

class Repository {
  // CREATE
  static async criar(dados) → {id, ...dados}
  
  // READ
  static async obterTodos() → Array
  static async obterPorId(id) → Object | undefined
  static async obterPor*(criterio) → Array
  
  // UPDATE
  static async atualizar(id, dados) → {id, ...dados}
  
  // DELETE
  static async deletar(id) → boolean
  
  // CÁLCULOS (específicos)
  static async obterMediaAluno(alunoId) → Number
  static async obterPercentualAluno(alunoId) → Number
}
```

---

## Endpoints Disponíveis

### Turmas
```
POST   /turmas              Criar turma
GET    /turmas              Listar todas
GET    /turmas/:id          Obter por ID
GET    /turmas/:id/alunos   Obter com alunos
PUT    /turmas/:id          Atualizar
DELETE /turmas/:id          Deletar
```

### Professores
```
POST   /professores         Criar professor
GET    /professores         Listar todos
GET    /professores/:id     Obter por ID
PUT    /professores/:id     Atualizar
DELETE /professores/:id     Deletar
```

### Alunos
```
POST   /alunos              Criar aluno
GET    /alunos              Listar todos
GET    /alunos/:id          Obter por ID
PUT    /alunos/:id          Atualizar
DELETE /alunos/:id          Deletar
```

### Avaliações
```
POST   /avaliacoes          Criar avaliação
GET    /avaliacoes          Listar todas
GET    /avaliacoes/:id      Obter por ID
GET    /avaliacoes/aluno/:id Obter do aluno
PUT    /avaliacoes/:id      Atualizar
DELETE /avaliacoes/:id      Deletar
```

### Frequências
```
POST   /frequencias         Criar frequência
GET    /frequencias         Listar todas
GET    /frequencias/:id     Obter por ID
GET    /frequencias/aluno/:id      Obter do aluno
GET    /frequencias/turma/:id      Obter da turma
PUT    /frequencias/:id     Atualizar
DELETE /frequencias/:id     Deletar
```

---

## Relacionamentos (FK)

```
turmas (1) ──◄──── (N) alunos
            
turmas (1) ──◄──── (N) frequencias
            
professores (1) ──◄──── (N) avaliacoes

alunos (1) ──◄──── (N) avaliacoes
            
alunos (1) ──◄──── (N) frequencias
```

---

## Inicialização do Banco

```
app.js inicia
       │
       ▼
initializeTables() executado
       │
       ├─ CREATE TABLE IF NOT EXISTS turmas
       ├─ CREATE TABLE IF NOT EXISTS professores
       ├─ CREATE TABLE IF NOT EXISTS alunos
       ├─ CREATE TABLE IF NOT EXISTS avaliacoes
       └─ CREATE TABLE IF NOT EXISTS frequencias
       │
       ▼
"Tabelas criadas/verificadas com sucesso"
```

---

## Scripts de Teste

```
npm run validate
├─ Verifica arquivos necessários
├─ Verifica sqlite3 em package.json
└─ Retorna % de validação

npm run test
├─ Cria dados de teste
├─ Valida CRUD completo
├─ Testa relacionamentos
├─ Valida cálculos
├─ Deleta dados de teste
└─ Retorna relatório

npm start | npm run dev
├─ Inicializa banco
├─ Inicia Express
└─ Aguarda requisições HTTP
```

---

## Sequência de Testes Recomendada

```
1. npm install
   └─ Instala sqlite3

2. npm run validate
   └─ Verifica se tudo foi criado corretamente
   
3. npm run test
   └─ Testa cada repositório CRUD
   └─ Valida persistência
   
4. npm start
   └─ Inicia servidor
   
5. curl / Postman
   └─ Testa endpoints individualmente
   
6. sqlite3 backend/escola.db
   └─ Verifica dados no banco
```

---

## Benefícios da Arquitetura

✅ **Persistência**: Dados salvos em arquivo SQLite  
✅ **Escalabilidade**: Padrão Repository facilita migração  
✅ **Manutenibilidade**: Separação de responsabilidades  
✅ **Testabilidade**: Cada camada pode ser testada isoladamente  
✅ **Relacionamentos**: FK garante integridade dos dados  
✅ **Performance**: Queries otimizadas no banco  
✅ **Segurança**: Parametrização contra SQL Injection  

---

```
🚀 Sistema pronto para produção!
```
