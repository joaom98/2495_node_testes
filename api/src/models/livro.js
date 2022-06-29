/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Livro {
  constructor({
    id,
    titulo,
    paginas,
    editora_id,
    autor_id,
    created_at,
    updated_at
  }) {
    this.id = null || id;
    this.titulo = titulo;
    this.paginas = paginas;
    this.editora_id = editora_id;
    this.autor_id = autor_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarLivros() {
    return db.select('*').from('livros');
  }

  static async pegarPeloId(id) {
    return db.select('*').from('livros').where({ id });
  }

  async criar(novoItem) {
    return db('livros').insert(novoItem)
      .then((registroCriado) => db('livros')
        .where('id', registroCriado[0]))
      .then((registroSelecionado) => new Livro(registroSelecionado[0]));
  }

  async atualizar(id, dadoAtual) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('livros')
      .where({ id })
      .update({ ...dadoAtual, updated_at: new Date().toISOString() });

    return db.select('*').from('livros').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await db('livros')
      .where({ id })
      .del();
  }

  async salvar(livro) {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (livro.id) {
      const resultado = await this.atualizar(livro.id, livro);
      return resultado;
    }
    const resultado = await this.criar(livro);
    return resultado;
  }
}

export default Livro;
