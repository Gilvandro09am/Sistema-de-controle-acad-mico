const { promiseDb } = require('../database/db');

class ProfessorRepository {
  static async criar(dados) {
    const { nome, email, disciplina } = dados;
    const result = await promiseDb.run(
      'INSERT INTO professores (nome, email, disciplina) VALUES (?, ?, ?)',
      [nome, email, disciplina]
    );
    return { id: result.id, ...dados };
  }

  static async obterTodos() {
    return await promiseDb.all('SELECT * FROM professores ORDER BY nome');
  }

  static async obterPorId(id) {
    return await promiseDb.get('SELECT * FROM professores WHERE id = ?', [id]);
  }

  static async atualizar(id, dados) {
    const { nome, email, disciplina } = dados;
    await promiseDb.run(
      'UPDATE professores SET nome = ?, email = ?, disciplina = ? WHERE id = ?',
      [nome, email, disciplina, id]
    );
    return { id, ...dados };
  }

  static async deletar(id) {
    await promiseDb.run('DELETE FROM professores WHERE id = ?', [id]);
    return true;
  }
}

module.exports = ProfessorRepository;
