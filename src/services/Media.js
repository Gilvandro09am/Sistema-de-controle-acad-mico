class Media {
  calcularMedia(notas) {
    const soma = notas.reduce((total, nota) => total + nota, 0);

    return soma / notas.length;
  }
}

module.exports = Media;
