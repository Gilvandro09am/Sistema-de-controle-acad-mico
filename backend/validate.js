#!/usr/bin/env node

/**
 * Script rápido para validar a integração SQLite
 * Execute: npm run quick-test
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 VALIDAÇÃO DA INTEGRAÇÃO SQLITE\n');

const checks = [
  {
    name: 'Arquivo de conexão DB',
    path: 'src/database/db.js',
    type: 'file'
  },
  {
    name: 'Arquivo de inicialização DB',
    path: 'src/database/init.js',
    type: 'file'
  },
  {
    name: 'Repositório de Alunos',
    path: 'src/repositories/AlunoRepository.js',
    type: 'file'
  },
  {
    name: 'Repositório de Turmas',
    path: 'src/repositories/TurmaRepository.js',
    type: 'file'
  },
  {
    name: 'Repositório de Professores',
    path: 'src/repositories/ProfessorRepository.js',
    type: 'file'
  },
  {
    name: 'Repositório de Avaliações',
    path: 'src/repositories/AvaliacaoRepository.js',
    type: 'file'
  },
  {
    name: 'Repositório de Frequências',
    path: 'src/repositories/FrequenciaRepository.js',
    type: 'file'
  },
  {
    name: 'Package.json com sqlite3',
    path: 'package.json',
    type: 'package'
  },
  {
    name: 'app.js com inicialização DB',
    path: 'src/app.js',
    type: 'content',
    content: 'initializeTables'
  },
  {
    name: 'Script de teste',
    path: 'test.js',
    type: 'file'
  }
];

let passCount = 0;
let failCount = 0;

checks.forEach(check => {
  const filePath = path.join(__dirname, check.path);
  
  try {
    if (check.type === 'file') {
      if (fs.existsSync(filePath)) {
        console.log(`✓ ${check.name}`);
        passCount++;
      } else {
        console.log(`✗ ${check.name} - ARQUIVO NÃO ENCONTRADO`);
        failCount++;
      }
    } else if (check.type === 'package') {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('sqlite3')) {
        console.log(`✓ ${check.name}`);
        passCount++;
      } else {
        console.log(`✗ ${check.name} - sqlite3 não encontrado`);
        failCount++;
      }
    } else if (check.type === 'content') {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(check.content)) {
        console.log(`✓ ${check.name}`);
        passCount++;
      } else {
        console.log(`✗ ${check.name} - "${check.content}" não encontrado`);
        failCount++;
      }
    }
  } catch (error) {
    console.log(`✗ ${check.name} - ERRO: ${error.message}`);
    failCount++;
  }
});

console.log(`\n📊 RESULTADO: ${passCount}/${checks.length} verificações`);

if (failCount === 0) {
  console.log('\n✅ Integração SQLite validada com sucesso!');
  console.log('\n📝 Próximos passos:');
  console.log('  1. npm install');
  console.log('  2. npm run test');
  console.log('  3. npm start\n');
  process.exit(0);
} else {
  console.log(`\n❌ ${failCount} verificação(ões) falharam\n`);
  process.exit(1);
}
