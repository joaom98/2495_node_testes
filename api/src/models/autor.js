/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Autor {
  constructor({
    id,
    nome,
    nacionalidade,
    created_at,
    updated_at
  }) {
    this.id = null || id;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarAutores() {
    return db.select('*').from('autores');
  }

  static async pegarPeloId(id) {
    return db.select('*').from('autores').where({ id });
  }

  async criar(novoItem) {
    return db('autores').insert(novoItem)
      .then((registroCriado) => db('autores')
        .where('id', registroCriado[0]))
      .then((registroSelecionado) => new Autor(registroSelecionado[0]));
  }

  async atualizar(id, dadoAtual) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('autores')
      .where({ id })
      .update({ ...dadoAtual, updated_at: new Date().toISOString() });

    return db.select('*').from('autores').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await db('autores')
      .where({ id })
      .del();
  }

  async salvar(autor) {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (autor.id) {
      const resultado = await this.atualizar(autor.id, autor);
      return resultado;
    }
    const resultado = await this.criar(autor);
    return resultado;
  }

  static async pegarLivrosPorAutor(autorId) {
    return db('livros')
      .where({ autor_id: autorId });
  }
}

export default Autor;
