# Relatório de Avaliação Heurística — Projeto 1

Autor: Gilvandro Alves Martins

Data: 26/07/2026

Score Lighthouse (Acessibilidade): ____ / 100

---

## Problema 1

- Onde: Tela de Cadastro de Alunos, Professores e Turmas.
- O que observei: Ao clicar no botão "Salvar", não existe nenhum indicador visual de que a operação está sendo processada. Enquanto a requisição é enviada para a API, o usuário pode acreditar que o sistema travou ou clicar várias vezes no botão.
- Heurística violada: #1 – Visibilidade do status do sistema.
- Gravidade: 3
- Correção proposta: Exibir um indicador de carregamento (spinner ou texto "Salvando...") e desabilitar o botão até a conclusão da operação.
- Evidência: prints/loading-salvar.png

---

## Problema 2

- Onde: Formulários de Login, Cadastro de Alunos, Professores e Turmas.
- O que observei: Alguns campos utilizam apenas placeholder para identificar seu conteúdo, sem um elemento `<label>` associado.
- Heurística violada: #5 – Prevenção de erros.
- Gravidade: 2
- Correção proposta: Adicionar elementos `<label>` vinculados aos respectivos campos para melhorar a acessibilidade e facilitar o preenchimento dos formulários.
- Evidência: prints/formulario-label.png

---

## Problema 3

- Onde: Exclusão de registros (Alunos, Professores e Turmas).
- O que observei: Ao clicar no botão de excluir, o registro é removido imediatamente, sem solicitar confirmação do usuário.
- Heurística violada: #3 – Controle e liberdade do usuário.
- Gravidade: 3
- Correção proposta: Exibir uma janela de confirmação antes da exclusão, permitindo cancelar a ação.
- Evidência: prints/exclusao.png

---

## Problema 4

- Onde: Formulários de cadastro.
- O que observei: Quando ocorre um erro na requisição (campos inválidos ou erro da API), o usuário não recebe uma mensagem clara explicando o motivo do erro ou como corrigi-lo.
- Heurística violada: #9 – Ajudar o usuário a reconhecer, diagnosticar e recuperar-se de erros.
- Gravidade: 3
- Correção proposta: Exibir mensagens de erro em linguagem simples, indicando exatamente qual campo deve ser corrigido.
- Evidência: prints/mensagem-erro.png

---

## Problema 5

- Onde: Navegação por teclado em toda a aplicação.
- O que observei: A navegação utilizando apenas a tecla Tab apresenta dificuldades em alguns componentes, e nem sempre é possível identificar claramente qual elemento está com foco.
- Heurística violada: #7 – Flexibilidade e eficiência de uso.
- Gravidade: 2
- Correção proposta: Garantir foco visível em todos os componentes interativos e manter uma ordem lógica de navegação pelo teclado.
- Evidência: prints/foco-tab.png

---

## Problema 6

- Onde: Atualização das listas de Alunos, Professores e Turmas.
- O que observei: Após cadastrar ou excluir um registro, a atualização da lista ocorre sem informar essa alteração para tecnologias assistivas, pois não existe uma região com `aria-live`.
- Heurística violada: #1 – Visibilidade do status do sistema (SPA).
- Gravidade: 3
- Correção proposta: Adicionar `aria-live="polite"` nas listas atualizadas dinamicamente para informar leitores de tela sobre as mudanças.
- Evidência: prints/aria-live.png

---

## Problema 7

- Onde: Exclusão de registros.
- O que observei: Após remover um item da lista, o foco do teclado não é reposicionado para outro elemento da interface, dificultando a navegação para usuários que utilizam apenas teclado.
- Heurística violada: #1 – Visibilidade do status do sistema (SPA).
- Gravidade: 3
- Correção proposta: Reposicionar o foco utilizando `.focus()` em um elemento adequado após a exclusão do registro.
- Evidência: prints/focus-remocao.png

---

## Resumo

- Total de problemas: 7
- Problemas de gravidade 3–4 (prioritários): 5
- Score de acessibilidade: ____ / 100
- Os 3 que serão corrigidos primeiro no E7:
  - Adicionar feedback visual de carregamento durante requisições.
  - Exibir mensagens de erro claras para o usuário.
  - Implementar confirmação de exclusão e gerenciamento correto do foco após remoções.