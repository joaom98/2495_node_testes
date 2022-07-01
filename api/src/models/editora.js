/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Editora {
  constructor({
    id,
    nome,
    cidade,
    email,
    created_at,
    updated_at,
  }) {
    this.id = null || id;
    this.nome = nome;
    this.cidade = cidade;
    this.email = email;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarEditoras() {
    return db.select('*').from('editoras');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('editoras').where({ id });
    return resultado[0];
  }

  async criar(novoItem) {
    return db('editoras').insert(novoItem)
      .then((registroCriado) => db('editoras')
        .where('id', registroCriado[0]))
      .then((registroSelecionado) => new Editora(registroSelecionado[0]));
  }

  async atualizar(id, dadoAtual) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('editoras')
      .where({ id })
      .update({ ...dadoAtual, updated_at: new Date().toISOString() });

    return db.select('*').from('editoras').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await db('editoras')
      .where({ id })
      .del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      return this.atualizar(this.id, this);
      // const resultado = await this.atualizar(this.id, this);
      // return resultado;
    }
    return this.criar(this);
    // const resultado = await this.criar(this);
    // return resultado;
  }

  static async pegarLivrosPorEditora(editoraId) {
    return db('livros')
      .where({ editora_id: editoraId });
  }
}

export default Editora;
