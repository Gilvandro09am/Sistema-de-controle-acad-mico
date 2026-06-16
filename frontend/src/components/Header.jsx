function Header() {
  return (
    <header className="bg-white shadow-sm rounded p-3 mb-4 d-flex justify-content-between align-items-center">
      
      <div>
        <h3 className="fw-bold mb-0">
          🎓 Sistema de Controle Acadêmico
        </h3>

        <small className="text-muted">
          Gerencie alunos, professores, turmas e avaliações
        </small>
      </div>

      <div className="d-flex align-items-center gap-3">

        <div className="text-end">
          <div className="fw-bold">
            Gilvandro Martins
          </div>

          <small className="text-muted">
            Administrador
          </small>
        </div>

        <img
          src="https://ui-avatars.com/api/?name=Gilvandro+Martins&background=0D6EFD&color=fff"
          alt="Usuário"
          className="rounded-circle"
          width="50"
          height="50"
        />

      </div>

    </header>
  );
}

export default Header;