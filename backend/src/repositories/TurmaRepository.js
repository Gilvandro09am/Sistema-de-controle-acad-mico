const { promiseDb } = require('../database/db');

class TurmaRepository {
  static async criar(dados) {
    const { nomeTurma, anoLetivo } = dados;
    const result = await promiseDb.run(
      'INSERT INTO turmas (nomeTurma, anoLetivo) VALUES (?, ?)',
      [nomeTurma, anoLetivo]
    );
    return { id: result.id, ...dados };
  }

  static async obterTodos() {
    return await promiseDb.all('SELECT * FROM turmas ORDER BY nomeTurma');
  }

  static async obterPorId(id) {
    return await promiseDb.get('SELECT * FROM turmas WHERE id = ?', [id]);
  }

  static async atualizar(id, dados) {
    const { nomeTurma, anoLetivo } = dados;
    await promiseDb.run(
      'UPDATE turmas SET nomeTurma = ?, anoLetivo = ? WHERE id = ?',
      [nomeTurma, anoLetivo, id]
    );
    return { id, ...dados };
  }

  static async deletar(id) {
    await promiseDb.run('DELETE FROM turmas WHERE id = ?', [id]);
    return true;
  }

  static async obterComAlunos(id) {
    const turma = await this.obterPorId(id);
    if (!turma) return null;
    
    const alunos = await promiseDb.all(
      'SELECT * FROM alunos WHERE turmaId = ?',
      [id]
    );
    
    return { ...turma, alunos };
  }
}

module.exports = TurmaRepository;
