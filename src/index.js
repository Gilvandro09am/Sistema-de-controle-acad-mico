const Aluno = require('./classes/Aluno');
const Turma = require('./classes/Turma');

const aluno1 = new Aluno(
  'Carlos Henrique',
  '2025001',
  17
);

const turma1 = new Turma(
  '3º Ano A',
  2025
);

turma1.adicionarAluno(aluno1);

console.log(turma1);