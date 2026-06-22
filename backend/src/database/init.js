const { db, promiseDb } = require('./db');

const initializeTables = async () => {
  try {
    // Tabela de Turmas
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS turmas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeTurma TEXT NOT NULL UNIQUE,
        anoLetivo INTEGER NOT NULL,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

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
        disciplina TEXT,
        nota REAL NOT NULL,
        data DATE,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (alunoId) REFERENCES alunos(id) ON DELETE CASCADE,
        FOREIGN KEY (professorId) REFERENCES professores(id) ON DELETE SET NULL
      )
    `);

    // Tabela de Frequências
    await promiseDb.run(`
      CREATE TABLE IF NOT EXISTS frequencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        turmaId INTEGER,
        totalAulas INTEGER DEFAULT 0,
        presentes INTEGER DEFAULT 0,
        mes INTEGER,
        ano INTEGER,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (alunoId) REFERENCES alunos(id) ON DELETE CASCADE,
        FOREIGN KEY (turmaId) REFERENCES turmas(id) ON DELETE CASCADE
      )
    `);

    console.log('✓ Tabelas criadas/verificadas com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    return false;
  }
};

module.exports = { initializeTables };
