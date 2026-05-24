class Turma {
  constructor(nomeTurma, anoLetivo) {
    this.nomeTurma = nomeTurma;
    this.anoLetivo = anoLetivo;
    this.alunos = [];
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }
}

module.exports = Turma;