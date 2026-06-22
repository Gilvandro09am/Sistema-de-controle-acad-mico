#!/usr/bin/env node

/**
 * Script de testes para validar a integração do SQLite
 * Execute: npm run test
 */

const { promiseDb } = require('./src/database/db');
const { initializeTables } = require('./src/database/init');
const AlunoRepository = require('./src/repositories/AlunoRepository');
const TurmaRepository = require('./src/repositories/TurmaRepository');
const ProfessorRepository = require('./src/repositories/ProfessorRepository');
const AvaliacaoRepository = require('./src/repositories/AvaliacaoRepository');
const FrequenciaRepository = require('./src/repositories/FrequenciaRepository');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

let testCount = 0;
let passCount = 0;
let failCount = 0;

function logTest(name, passed, message = '') {
  testCount++;
  if (passed) {
    passCount++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } else {
    failCount++;
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    if (message) console.log(`  ${colors.yellow}${message}${colors.reset}`);
  }
}

function logSection(title) {
  console.log(`\n${colors.blue}=== ${title} ===${colors.reset}`);
}

async function runTests() {
  try {
    logSection('Inicializando Banco de Dados');
    const initialized = await initializeTables();
    logTest('Inicialização do banco', initialized);

    // TESTES DE TURMAS
    logSection('Testes: TURMAS');
    
    const turma1 = await TurmaRepository.criar({
      nomeTurma: '1º Ano A',
      anoLetivo: 2024
    });
    logTest('Criar turma', turma1 && turma1.id > 0, `Turma ID: ${turma1?.id}`);

    const turmas = await TurmaRepository.obterTodos();
    logTest('Obter todas as turmas', Array.isArray(turmas) && turmas.length > 0, `Total: ${turmas.length}`);

    const turmaBuscada = await TurmaRepository.obterPorId(turma1.id);
    logTest('Obter turma por ID', turmaBuscada && turmaBuscada.nomeTurma === '1º Ano A');

    const turmaAtualizada = await TurmaRepository.atualizar(turma1.id, {
      nomeTurma: '1º Ano B',
      anoLetivo: 2024
    });
    logTest('Atualizar turma', turmaAtualizada && turmaAtualizada.nomeTurma === '1º Ano B');

    // TESTES DE PROFESSORES
    logSection('Testes: PROFESSORES');
    
    const professor1 = await ProfessorRepository.criar({
      nome: 'João Silva',
      email: 'joao@escola.com',
      disciplina: 'Matemática'
    });
    logTest('Criar professor', professor1 && professor1.id > 0, `Professor ID: ${professor1?.id}`);

    const professores = await ProfessorRepository.obterTodos();
    logTest('Obter todos os professores', Array.isArray(professores) && professores.length > 0);

    const professorBuscado = await ProfessorRepository.obterPorId(professor1.id);
    logTest('Obter professor por ID', professorBuscado && professorBuscado.nome === 'João Silva');

    // TESTES DE ALUNOS
    logSection('Testes: ALUNOS');
    
    const aluno1 = await AlunoRepository.criar({
      nome: 'Maria Santos',
      matricula: 'MAT001',
      idade: 15,
      turmaId: turma1.id
    });
    logTest('Criar aluno', aluno1 && aluno1.id > 0, `Aluno ID: ${aluno1?.id}`);

    const aluno2 = await AlunoRepository.criar({
      nome: 'Carlos oliveira',
      matricula: 'MAT002',
      idade: 15,
      turmaId: turma1.id
    });
    logTest('Criar segundo aluno', aluno2 && aluno2.id > 0);

    const alunos = await AlunoRepository.obterTodos();
    logTest('Obter todos os alunos', Array.isArray(alunos) && alunos.length >= 2);

    const alunoBuscado = await AlunoRepository.obterPorId(aluno1.id);
    logTest('Obter aluno por ID', alunoBuscado && alunoBuscado.nome === 'Maria Santos');

    const alunosPorTurma = await AlunoRepository.obterPorTurma(turma1.id);
    logTest('Obter alunos por turma', Array.isArray(alunosPorTurma) && alunosPorTurma.length >= 2);

    const alunoAtualizado = await AlunoRepository.atualizar(aluno1.id, {
      nome: 'Maria Santos Silva',
      matricula: 'MAT001',
      idade: 16,
      turmaId: turma1.id
    });
    logTest('Atualizar aluno', alunoAtualizado && alunoAtualizado.nome === 'Maria Santos Silva');

    // TESTES DE AVALIAÇÕES
    logSection('Testes: AVALIAÇÕES');
    
    const avaliacao1 = await AvaliacaoRepository.criar({
      alunoId: aluno1.id,
      professorId: professor1.id,
      disciplina: 'Matemática',
      nota: 8.5,
      data: '2024-06-20'
    });
    logTest('Criar avaliação', avaliacao1 && avaliacao1.id > 0, `Avaliação ID: ${avaliacao1?.id}`);

    const avaliacao2 = await AvaliacaoRepository.criar({
      alunoId: aluno2.id,
      professorId: professor1.id,
      disciplina: 'Matemática',
      nota: 7.0,
      data: '2024-06-20'
    });
    logTest('Criar segunda avaliação', avaliacao2 && avaliacao2.id > 0);

    const avaliacoes = await AvaliacaoRepository.obterTodos();
    logTest('Obter todas as avaliações', Array.isArray(avaliacoes) && avaliacoes.length >= 2);

    const avaliacaoBuscada = await AvaliacaoRepository.obterPorId(avaliacao1.id);
    logTest('Obter avaliação por ID', avaliacaoBuscada && avaliacaoBuscada.nota === 8.5);

    const avaliacoesPorAluno = await AvaliacaoRepository.obterPorAluno(aluno1.id);
    logTest('Obter avaliações por aluno', Array.isArray(avaliacoesPorAluno) && avaliacoesPorAluno.length >= 1);

    const media = await AvaliacaoRepository.obterMediaAluno(aluno1.id);
    logTest('Calcular média do aluno', media === 8.5, `Média: ${media}`);

    // TESTES DE FREQUÊNCIAS
    logSection('Testes: FREQUÊNCIAS');
    
    const frequencia1 = await FrequenciaRepository.criar({
      alunoId: aluno1.id,
      turmaId: turma1.id,
      totalAulas: 20,
      presentes: 18,
      mes: 6,
      ano: 2024
    });
    logTest('Criar frequência', frequencia1 && frequencia1.id > 0, `Frequência ID: ${frequencia1?.id}`);

    const frequencia2 = await FrequenciaRepository.criar({
      alunoId: aluno2.id,
      turmaId: turma1.id,
      totalAulas: 20,
      presentes: 15,
      mes: 6,
      ano: 2024
    });
    logTest('Criar segunda frequência', frequencia2 && frequencia2.id > 0);

    const frequencias = await FrequenciaRepository.obterTodos();
    logTest('Obter todas as frequências', Array.isArray(frequencias) && frequencias.length >= 2);

    const frequenciaBuscada = await FrequenciaRepository.obterPorId(frequencia1.id);
    logTest('Obter frequência por ID', frequenciaBuscada && frequenciaBuscada.presentes === 18);

    const frequenciasPorAluno = await FrequenciaRepository.obterPorAluno(aluno1.id);
    logTest('Obter frequências por aluno', Array.isArray(frequenciasPorAluno) && frequenciasPorAluno.length >= 1);

    const frequenciasPorTurma = await FrequenciaRepository.obterPorTurma(turma1.id);
    logTest('Obter frequências por turma', Array.isArray(frequenciasPorTurma) && frequenciasPorTurma.length >= 2);

    const percentual = await FrequenciaRepository.obterPercentualAluno(aluno1.id);
    logTest('Calcular percentual de frequência', percentual === 90, `Percentual: ${percentual}%`);

    // TESTES DE DELEÇÃO
    logSection('Testes: DELEÇÃO');
    
    await AvaliacaoRepository.deletar(avaliacao1.id);
    const avaliacaoDeleta = await AvaliacaoRepository.obterPorId(avaliacao1.id);
    logTest('Deletar avaliação', avaliacaoDeleta === undefined);

    await FrequenciaRepository.deletar(frequencia1.id);
    const frequenciaDeleta = await FrequenciaRepository.obterPorId(frequencia1.id);
    logTest('Deletar frequência', frequenciaDeleta === undefined);

    await AlunoRepository.deletar(aluno1.id);
    const alunoDeleta = await AlunoRepository.obterPorId(aluno1.id);
    logTest('Deletar aluno', alunoDeleta === undefined);

    await ProfessorRepository.deletar(professor1.id);
    const professorDeleta = await ProfessorRepository.obterPorId(professor1.id);
    logTest('Deletar professor', professorDeleta === undefined);

    await TurmaRepository.deletar(turma1.id);
    const turmaDeleta = await TurmaRepository.obterPorId(turma1.id);
    logTest('Deletar turma', turmaDeleta === undefined);

    // RESUMO
    logSection('RESUMO DOS TESTES');
    console.log(`Total de testes: ${testCount}`);
    console.log(`${colors.green}Passou: ${passCount}${colors.reset}`);
    if (failCount > 0) {
      console.log(`${colors.red}Falhou: ${failCount}${colors.reset}`);
    }

    const percentualPass = Math.round((passCount / testCount) * 100);
    console.log(`Taxa de sucesso: ${percentualPass}%\n`);

    if (failCount === 0) {
      console.log(`${colors.green}✓ Todos os testes passaram!${colors.reset}`);
      process.exit(0);
    } else {
      console.log(`${colors.red}✗ Alguns testes falharam${colors.reset}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}Erro geral durante os testes:${colors.reset}`, error);
    process.exit(1);
  }
}

runTests();
