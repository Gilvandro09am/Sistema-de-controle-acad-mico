const { promiseDb } = require('../database/db');

class FrequenciaRepository {
  static async criar(dados) {
    const { alunoId, turmaId, totalAulas, presentes, mes, ano } = dados;
    const result = await promiseDb.run(
      'INSERT INTO frequencias (alunoId, turmaId, totalAulas, presentes, mes, ano) VALUES (?, ?, ?, ?, ?, ?)',
      [alunoId, turmaId, totalAulas, presentes, mes, ano]
    );
    return { id: result.id, ...dados };
  }

  static async obterTodos() {
    return await promiseDb.all('SELECT * FROM frequencias ORDER BY ano DESC, mes DESC');
  }

  static async obterPorId(id) {
    return await promiseDb.get('SELECT * FROM frequencias WHERE id = ?', [id]);
  }

  static async obterPorAluno(alunoId) {
    return await promiseDb.all(
      'SELECT * FROM frequencias WHERE alunoId = ? ORDER BY ano DESC, mes DESC',
      [alunoId]
    );
  }

  static async obterPorTurma(turmaId) {
    return await promiseDb.all(
      'SELECT * FROM frequencias WHERE turmaId = ? ORDER BY ano DESC, mes DESC',
      [turmaId]
    );
  }

  static async atualizar(id, dados) {
    const { alunoId, turmaId, totalAulas, presentes, mes, ano } = dados;
    await promiseDb.run(
      'UPDATE frequencias SET alunoId = ?, turmaId = ?, totalAulas = ?, presentes = ?, mes = ?, ano = ? WHERE id = ?',
      [alunoId, turmaId, totalAulas, presentes, mes, ano, id]
    );
    return { id, ...dados };
  }

  static async deletar(id) {
    await promiseDb.run('DELETE FROM frequencias WHERE id = ?', [id]);
    return true;
  }

  static async obterPercentualAluno(alunoId) {
    const result = await promiseDb.get(
      'SELECT SUM(presentes) as totalPresentes, SUM(totalAulas) as totalAulas FROM frequencias WHERE alunoId = ?',
      [alunoId]
    );
    
    if (!result || result.totalAulas === 0) return 0;
    return Math.round((result.totalPresentes / result.totalAulas) * 100);
  }
}

module.exports = FrequenciaRepository;
