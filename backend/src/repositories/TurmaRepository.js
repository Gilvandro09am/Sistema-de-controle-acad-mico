const { promiseDb } = require('../database/db');

const formatarTurma = (turma) => {
  if (!turma) return null;

  let professores = [];
  let alunos = [];

  try {
    professores = turma.professores ? JSON.parse(turma.professores) : [];
  } catch (error) {
    professores = [];
  }

  try {
    alunos = turma.alunos ? JSON.parse(turma.alunos) : [];
  } catch (error) {
    alunos = [];
  }

  return {
    ...turma,
    nome: turma.nomeTurma,
    professores,
    alunos,
  };
};

class TurmaRepository {
  static async criar(dados) {
    const nomeTurma = dados.nomeTurma || dados.nome;
    const anoLetivo = dados.anoLetivo;
    const professores = JSON.stringify(dados.professores || []);
    const alunos = JSON.stringify(dados.alunos || []);

    const result = await promiseDb.run(
      'INSERT INTO turmas (nomeTurma, anoLetivo, professores, alunos) VALUES (?, ?, ?, ?)',
      [nomeTurma, anoLetivo, professores, alunos]
    );

    return formatarTurma({ id: result.id, nomeTurma, anoLetivo, professores, alunos });
  }

  static async obterTodos() {
    const turmas = await promiseDb.all('SELECT * FROM turmas ORDER BY nomeTurma');
    return turmas.map(formatarTurma);
  }

  static async obterPorId(id) {
    const turma = await promiseDb.get('SELECT * FROM turmas WHERE id = ?', [id]);
    return formatarTurma(turma);
  }

  static async atualizar(id, dados) {
    const nomeTurma = dados.nomeTurma || dados.nome;
    const anoLetivo = dados.anoLetivo;
    const professores = JSON.stringify(dados.professores || []);
    const alunos = JSON.stringify(dados.alunos || []);

    await promiseDb.run(
      'UPDATE turmas SET nomeTurma = ?, anoLetivo = ?, professores = ?, alunos = ? WHERE id = ?',
      [nomeTurma, anoLetivo, professores, alunos, id]
    );

    return formatarTurma({ id, nomeTurma, anoLetivo, professores, alunos });
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
