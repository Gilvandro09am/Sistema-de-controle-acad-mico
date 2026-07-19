const { promiseDb } = require('../database/db');

class FrequenciaRepository {
  static async criar(dados) {
    const {
      alunoId,
      turmaId,
      turmaNome,
      professorNome,
      alunoNome,
      totalAulas,
      presentes,
      faltas,
      percentual,
      mes,
      ano,
      data,
    } = dados;

    const result = await promiseDb.run(
      'INSERT INTO frequencias (alunoId, turmaId, turmaNome, professorNome, alunoNome, totalAulas, presentes, faltas, percentual, mes, ano, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [alunoId, turmaId, turmaNome || null, professorNome || null, alunoNome || null, totalAulas || 0, presentes || 0, faltas || 0, percentual || 0, mes || null, ano || null, data || new Date().toISOString()]
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
    const {
      alunoId,
      turmaId,
      turmaNome,
      professorNome,
      alunoNome,
      totalAulas,
      presentes,
      faltas,
      percentual,
      mes,
      ano,
      data,
    } = dados;

    await promiseDb.run(
      'UPDATE frequencias SET alunoId = ?, turmaId = ?, turmaNome = ?, professorNome = ?, alunoNome = ?, totalAulas = ?, presentes = ?, faltas = ?, percentual = ?, mes = ?, ano = ?, data = ? WHERE id = ?',
      [alunoId, turmaId, turmaNome || null, professorNome || null, alunoNome || null, totalAulas || 0, presentes || 0, faltas || 0, percentual || 0, mes || null, ano || null, data || new Date().toISOString(), id]
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
