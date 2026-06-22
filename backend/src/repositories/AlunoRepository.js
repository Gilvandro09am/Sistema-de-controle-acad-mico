const { promiseDb } = require('../database/db');

class AlunoRepository {
  static async criar(dados) {
    const { nome, matricula, idade, turmaId } = dados;
    const result = await promiseDb.run(
      'INSERT INTO alunos (nome, matricula, idade, turmaId) VALUES (?, ?, ?, ?)',
      [nome, matricula, idade, turmaId || null]
    );
    return { id: result.id, ...dados };
  }

  static async obterTodos() {
    return await promiseDb.all('SELECT * FROM alunos ORDER BY nome');
  }

  static async obterPorId(id) {
    return await promiseDb.get('SELECT * FROM alunos WHERE id = ?', [id]);
  }

  static async obterPorTurma(turmaId) {
    return await promiseDb.all(
      'SELECT * FROM alunos WHERE turmaId = ? ORDER BY nome',
      [turmaId]
    );
  }

  static async atualizar(id, dados) {
    const { nome, matricula, idade, turmaId } = dados;
    await promiseDb.run(
      'UPDATE alunos SET nome = ?, matricula = ?, idade = ?, turmaId = ? WHERE id = ?',
      [nome, matricula, idade, turmaId || null, id]
    );
    return { id, ...dados };
  }

  static async deletar(id) {
    await promiseDb.run('DELETE FROM alunos WHERE id = ?', [id]);
    return true;
  }
}

module.exports = AlunoRepository;
