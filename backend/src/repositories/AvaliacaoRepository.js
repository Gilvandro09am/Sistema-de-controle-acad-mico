const { promiseDb } = require('../database/db');

class AvaliacaoRepository {
  static async criar(dados) {
    const {
      alunoId,
      professorId,
      turmaId,
      turmaNome,
      alunoNome,
      professorNome,
      prova,
      participacao,
      trabalho,
      media,
      disciplina,
      nota,
      data,
    } = dados;

    const result = await promiseDb.run(
      'INSERT INTO avaliacoes (alunoId, professorId, turmaId, turmaNome, alunoNome, professorNome, prova, participacao, trabalho, media, disciplina, nota, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [alunoId, professorId || null, turmaId || null, turmaNome || null, alunoNome || null, professorNome || null, prova || 0, participacao || 0, trabalho || 0, media || 0, disciplina || null, nota || null, data || new Date().toISOString()]
    );

    return { id: result.id, ...dados, prova: Number(prova || 0), participacao: Number(participacao || 0), trabalho: Number(trabalho || 0), media: Number(media || 0) };
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
    const {
      alunoId,
      professorId,
      turmaId,
      turmaNome,
      alunoNome,
      professorNome,
      prova,
      participacao,
      trabalho,
      media,
      disciplina,
      nota,
      data,
    } = dados;

    await promiseDb.run(
      'UPDATE avaliacoes SET alunoId = ?, professorId = ?, turmaId = ?, turmaNome = ?, alunoNome = ?, professorNome = ?, prova = ?, participacao = ?, trabalho = ?, media = ?, disciplina = ?, nota = ?, data = ? WHERE id = ?',
      [alunoId, professorId || null, turmaId || null, turmaNome || null, alunoNome || null, professorNome || null, prova || 0, participacao || 0, trabalho || 0, media || 0, disciplina || null, nota || null, data || new Date().toISOString(), id]
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
