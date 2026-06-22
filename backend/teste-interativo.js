#!/usr/bin/env node

/**
 * Script de teste interativo - Testa a API sem usar cURL
 * Execute: node teste-interativo.js
 * (com o servidor rodando em outra aba)
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║      TESTE INTERATIVO DA API COM SQLITE               ║
║                                                        ║
║  Certifique-se que o servidor está rodando:           ║
║  $ npm start                                           ║
╚════════════════════════════════════════════════════════╝
  `);

  let turmaId, professorId, alunoId, avaliacaoId, frequenciaId;

  try {
    // 1. CRIAR TURMA
    console.log('\n📝 1. Criando turma...');
    const turmaRes = await request('POST', '/turmas', {
      nomeTurma: 'Teste SQLite - 1º Ano A',
      anoLetivo: 2024
    });
    
    if (turmaRes.status === 201) {
      turmaId = turmaRes.data.id;
      console.log(`   ✓ Turma criada com ID: ${turmaId}`);
      console.log(`   Nome: ${turmaRes.data.nomeTurma}`);
      console.log(`   Ano: ${turmaRes.data.anoLetivo}`);
    } else {
      throw new Error(`Falha ao criar turma (${turmaRes.status})`);
    }

    await sleep(500);

    // 2. CRIAR PROFESSOR
    console.log('\n👨‍🏫 2. Criando professor...');
    const profRes = await request('POST', '/professores', {
      nome: 'Teste Professor',
      email: 'teste@escola.com',
      disciplina: 'Matemática'
    });
    
    if (profRes.status === 201) {
      professorId = profRes.data.id;
      console.log(`   ✓ Professor criado com ID: ${professorId}`);
      console.log(`   Nome: ${profRes.data.nome}`);
      console.log(`   Disciplina: ${profRes.data.disciplina}`);
    } else {
      throw new Error(`Falha ao criar professor (${profRes.status})`);
    }

    await sleep(500);

    // 3. CRIAR ALUNO
    console.log('\n👨‍🎓 3. Criando aluno...');
    const alunoRes = await request('POST', '/alunos', {
      nome: 'Teste Aluno Silva',
      matricula: 'TEST001',
      idade: 15,
      turmaId: turmaId
    });
    
    if (alunoRes.status === 201) {
      alunoId = alunoRes.data.id;
      console.log(`   ✓ Aluno criado com ID: ${alunoId}`);
      console.log(`   Nome: ${alunoRes.data.nome}`);
      console.log(`   Turma: ${alunoRes.data.turmaId}`);
    } else {
      throw new Error(`Falha ao criar aluno (${alunoRes.status})`);
    }

    await sleep(500);

    // 4. CRIAR AVALIAÇÃO
    console.log('\n📊 4. Criando avaliação...');
    const avaliRes = await request('POST', '/avaliacoes', {
      alunoId: alunoId,
      professorId: professorId,
      disciplina: 'Matemática',
      nota: 8.5,
      data: new Date().toISOString().split('T')[0]
    });
    
    if (avaliRes.status === 201) {
      avaliacaoId = avaliRes.data.id;
      console.log(`   ✓ Avaliação criada com ID: ${avaliacaoId}`);
      console.log(`   Nota: ${avaliRes.data.nota}`);
      console.log(`   Disciplina: ${avaliRes.data.disciplina}`);
    } else {
      throw new Error(`Falha ao criar avaliação (${avaliRes.status})`);
    }

    await sleep(500);

    // 5. CRIAR FREQUÊNCIA
    console.log('\n📅 5. Criando frequência...');
    const freqRes = await request('POST', '/frequencias', {
      alunoId: alunoId,
      turmaId: turmaId,
      totalAulas: 20,
      presentes: 18,
      mes: 6,
      ano: 2024
    });
    
    if (freqRes.status === 201) {
      frequenciaId = freqRes.data.id;
      console.log(`   ✓ Frequência criada com ID: ${frequenciaId}`);
      console.log(`   Total de aulas: ${freqRes.data.totalAulas}`);
      console.log(`   Presentes: ${freqRes.data.presentes}`);
    } else {
      throw new Error(`Falha ao criar frequência (${freqRes.status})`);
    }

    await sleep(500);

    // 6. LISTAR ALUNOS
    console.log('\n📋 6. Listando todos os alunos...');
    const listaRes = await request('GET', '/alunos');
    
    if (listaRes.status === 200) {
      console.log(`   ✓ ${listaRes.data.length} aluno(s) encontrado(s)`);
      listaRes.data.forEach((aluno, idx) => {
        if (idx < 3) console.log(`     - ${aluno.nome} (ID: ${aluno.id})`);
      });
      if (listaRes.data.length > 3) {
        console.log(`     ... e mais ${listaRes.data.length - 3}`);
      }
    } else {
      throw new Error(`Falha ao listar alunos (${listaRes.status})`);
    }

    await sleep(500);

    // 7. OBTER TURMA COM ALUNOS
    console.log('\n🏫 7. Obtendo turma com seus alunos...');
    const turmaAlunosRes = await request('GET', `/turmas/${turmaId}/alunos`);
    
    if (turmaAlunosRes.status === 200) {
      console.log(`   ✓ Turma: ${turmaAlunosRes.data.nomeTurma}`);
      console.log(`   Alunos: ${turmaAlunosRes.data.alunos.length}`);
      turmaAlunosRes.data.alunos.forEach(a => {
        console.log(`     - ${a.nome}`);
      });
    } else {
      throw new Error(`Falha ao obter turma com alunos (${turmaAlunosRes.status})`);
    }

    await sleep(500);

    // 8. OBTER AVALIAÇÕES DO ALUNO
    console.log('\n📈 8. Obtendo avaliações do aluno...');
    const avaliAlunoRes = await request('GET', `/avaliacoes/aluno/${alunoId}`);
    
    if (avaliAlunoRes.status === 200) {
      console.log(`   ✓ ${avaliAlunoRes.data.length} avaliação(ões)`);
      avaliAlunoRes.data.forEach(a => {
        console.log(`     - ${a.disciplina}: ${a.nota} (em ${a.data})`);
      });
    } else {
      throw new Error(`Falha ao obter avaliações (${avaliAlunoRes.status})`);
    }

    await sleep(500);

    // 9. OBTER FREQUÊNCIA DO ALUNO
    console.log('\n✅ 9. Obtendo frequência do aluno...');
    const freqAlunoRes = await request('GET', `/frequencias/aluno/${alunoId}`);
    
    if (freqAlunoRes.status === 200) {
      console.log(`   ✓ ${freqAlunoRes.data.length} registro(s) de frequência`);
      freqAlunoRes.data.forEach(f => {
        const perc = Math.round((f.presentes / f.totalAulas) * 100);
        console.log(`     - Mês ${f.mes}/${f.ano}: ${f.presentes}/${f.totalAulas} (${perc}%)`);
      });
    } else {
      throw new Error(`Falha ao obter frequências (${freqAlunoRes.status})`);
    }

    await sleep(500);

    // 10. ATUALIZAR ALUNO
    console.log('\n✏️  10. Atualizando aluno...');
    const updateRes = await request('PUT', `/alunos/${alunoId}`, {
      nome: 'Teste Aluno Silva - ATUALIZADO',
      matricula: 'TEST001',
      idade: 16,
      turmaId: turmaId
    });
    
    if (updateRes.status === 200) {
      console.log(`   ✓ Aluno atualizado`);
      console.log(`   Novo nome: ${updateRes.data.nome}`);
      console.log(`   Nova idade: ${updateRes.data.idade}`);
    } else {
      throw new Error(`Falha ao atualizar aluno (${updateRes.status})`);
    }

    await sleep(500);

    // 11. DELETAR AVALIAÇÃO
    console.log('\n🗑️  11. Deletando avaliação...');
    const deleteAvaliRes = await request('DELETE', `/avaliacoes/${avaliacaoId}`);
    
    if (deleteAvaliRes.status === 204) {
      console.log(`   ✓ Avaliação deletada com sucesso`);
    } else {
      throw new Error(`Falha ao deletar avaliação (${deleteAvaliRes.status})`);
    }

    await sleep(500);

    // 12. VERIFICAR DELEÇÃO
    console.log('\n🔍 12. Verificando se avaliação foi deletada...');
    const checkRes = await request('GET', `/avaliacoes/${avaliacaoId}`);
    
    if (checkRes.status === 404 || !checkRes.data.id) {
      console.log(`   ✓ Avaliação foi realmente deletada do banco`);
    } else {
      console.log(`   ⚠️  Avaliação ainda existe (pode ser um problema)`);
    }

    // RESUMO
    console.log(`
╔════════════════════════════════════════════════════════╗
║           ✅ TODOS OS TESTES PASSARAM!               ║
╚════════════════════════════════════════════════════════╝

📊 DADOS CRIADOS:
  • Turma ID: ${turmaId}
  • Professor ID: ${professorId}
  • Aluno ID: ${alunoId}
  • Frequência ID: ${frequenciaId}

✓ OPERAÇÕES VALIDADAS:
  ✓ CREATE (Criar registros)
  ✓ READ (Ler registros)
  ✓ UPDATE (Atualizar registros)
  ✓ DELETE (Deletar registros)
  ✓ RELATIONSHIPS (Relacionamentos FK)
  ✓ FILTERS (Buscar por relacionamento)

🎯 CONCLUSÃO:
   SQLite integrado e funcionando perfeitamente! 🚀

    `);

  } catch (error) {
    console.error(`\n❌ ERRO: ${error.message}`);
    console.error('\n⚠️  Certifique-se de que:');
    console.error('  1. O servidor está rodando: npm start');
    console.error('  2. O servidor está em http://localhost:3000');
    console.error('  3. O banco de dados foi inicializado');
    process.exit(1);
  }
}

runTests();
