const { promiseDb } = require('../database/db');

class AvaliacaoRepository {
  static async criar(dados) {
    const { alunoId, professorId, disciplina, nota, data } = dados;
    const result = await promiseDb.run(
      'INSERT INTO avaliacoes (alunoId, professorId, disciplina, nota, data) VALUES (?, ?, ?, ?, ?)',
      [alunoId, professorId || null, disciplina, nota, data]
    );
    return { id: result.id, ...dados };
  }

  static async obterTodos() {
    return await promiseDb.all('SELECT * FROM avaliacoes ORDER BY data DESC');
  }

  static async obterPorId(id) {
    return await promiseDb.get('SELECT * FROM avaliacoes WHERE id = ?', [id]);
  }

  static async obterPorAluno(alunoId) {
    return await promiseDb.all(
      'SELECT * FROM avaliacoes WHERE alunoId = ? ORDER BY data DESC',
      [alunoId]
    );
  }

  static async atualizar(id, dados) {
    const { alunoId, professorId, disciplina, nota, data } = dados;
    await promiseDb.run(
      'UPDATE avaliacoes SET alunoId = ?, professorId = ?, disciplina = ?, nota = ?, data = ? WHERE id = ?',
      [alunoId, professorId || null, disciplina, nota, data, id]
    );
    return { id, ...dados };
  }

  static async deletar(id) {
    await promiseDb.run('DELETE FROM avaliacoes WHERE id = ?', [id]);
    return true;
  }

  static async obterMediaAluno(alunoId) {
    const result = await promiseDb.get(
      'SELECT AVG(nota) as media FROM avaliacoes WHERE alunoId = ?',
      [alunoId]
    );
    return result?.media || 0;
  }
}

module.exports = AvaliacaoRepository;
