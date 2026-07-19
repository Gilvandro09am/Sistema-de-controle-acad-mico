const { db, promiseDb } = require('./db');

const ensureColumn = async (tableName, columnDefinition) => {
  try {
    await promiseDb.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition}`);
  } catch (error) {
    if (!/duplicate column name/i.test(error.message)) {
      throw error;
    }
  }
};

const initializeTables = async () => {
  try {
    // Tabela de Turmas
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS turmas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeTurma TEXT NOT NULL UNIQUE,
        anoLetivo INTEGER NOT NULL,
        professores TEXT DEFAULT '[]',
        alunos TEXT DEFAULT '[]',
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await ensureColumn('turmas', "professores TEXT DEFAULT '[]'");
    await ensureColumn('turmas', "alunos TEXT DEFAULT '[]'");

    // Tabela de Professores
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS professores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE,
        disciplina TEXT,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de Alunos
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        matricula TEXT UNIQUE,
        idade INTEGER,
        turmaId INTEGER,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (turmaId) REFERENCES turmas(id) ON DELETE SET NULL
      )
    `);

    // Tabela de Avaliações
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        professorId INTEGER,
        turmaId INTEGER,
        turmaNome TEXT,
        alunoNome TEXT,
        professorNome TEXT,
        prova REAL DEFAULT 0,
        participacao REAL DEFAULT 0,
        trabalho REAL DEFAULT 0,
        media REAL DEFAULT 0,
        disciplina TEXT,
        nota REAL,
        data TEXT,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (alunoId) REFERENCES alunos(id) ON DELETE CASCADE,
        FOREIGN KEY (professorId) REFERENCES professores(id) ON DELETE SET NULL
      )
    `);

    await ensureColumn('avaliacoes', 'turmaId INTEGER');
    await ensureColumn('avaliacoes', 'turmaNome TEXT');
    await ensureColumn('avaliacoes', 'alunoNome TEXT');
    await ensureColumn('avaliacoes', 'professorNome TEXT');
    await ensureColumn('avaliacoes', 'prova REAL DEFAULT 0');
    await ensureColumn('avaliacoes', 'participacao REAL DEFAULT 0');
    await ensureColumn('avaliacoes', 'trabalho REAL DEFAULT 0');
    await ensureColumn('avaliacoes', 'media REAL DEFAULT 0');
    await ensureColumn('avaliacoes', 'data TEXT');

    // Tabela de Frequências
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS frequencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        turmaId INTEGER,
        turmaNome TEXT,
        professorNome TEXT,
        alunoNome TEXT,
        totalAulas INTEGER DEFAULT 0,
        presentes INTEGER DEFAULT 0,
        faltas INTEGER DEFAULT 0,
        percentual REAL DEFAULT 0,
        mes INTEGER,
        ano INTEGER,
        data TEXT,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (alunoId) REFERENCES alunos(id) ON DELETE CASCADE,
        FOREIGN KEY (turmaId) REFERENCES turmas(id) ON DELETE CASCADE
      )
    `);

    await ensureColumn('frequencias', 'turmaNome TEXT');
    await ensureColumn('frequencias', 'professorNome TEXT');
    await ensureColumn('frequencias', 'alunoNome TEXT');
    await ensureColumn('frequencias', 'faltas INTEGER DEFAULT 0');
    await ensureColumn('frequencias', 'percentual REAL DEFAULT 0');
    await ensureColumn('frequencias', 'data TEXT');

    console.log('✓ Tabelas criadas/verificadas com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    return false;
  }
};

module.exports = { initializeTables };
