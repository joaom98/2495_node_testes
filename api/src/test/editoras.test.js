import { afterAll, jest } from '@jest/globals';
import Editora from '../models/editora.js';
import db from '../db/dbconfig.js';

afterAll((done) => {
  db.destroy();
  done();
});

describe('Testes do modelo Editora', () => {
  const editora = new Editora({
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  });
  it('Deve chamar o construtor e retornar uma nova editora', () => {
    expect(editora.nome).toBe('CDC');
  });
  it('Deve salvar no banco de dados a nova editora', () => {
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });
  it('Deve salvar utilizando o async', async () => {
    const dados = await editora.salvar();
    expect(dados.nome).toBe('CDC');
  });
  it('Deve fazer chamada simulada ao banco', () => {
    editora.salvar = jest.fn(() => ({
      nome: 'Casa do Codigo',
      id: 18,
    }));

    const dados = editora.salvar();
    expect(dados.nome).toBe('Casa do Codigo');
  });
});
