import { afterAll, expect, jest } from '@jest/globals';
import Editora from '../models/editora.js';
import db from '../db/dbconfig.js';

afterAll((done) => {
  db.destroy();
  done();
});

describe('Testes do modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  };
  const editora = new Editora(objetoEditora);

  it('Deve chamar o construtor e retornar uma nova editora', () => {
    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it('Deve salvar no banco de dados a nova editora', async () => {
    const novaEditora = await editora.salvar();
    const x = await Editora.pegarPeloId(novaEditora.id);
    expect(x).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
      }),
    );
  });

  it.skip('Deve salvar utilizando o async', async () => {
    const dados = await editora.salvar();
    expect(dados.nome).toBe('CDC');
  });

  it.skip('Deve fazer chamada simulada ao banco', () => {
    editora.salvar = jest.fn(() => ({
      nome: 'Casa do Codigo',
      id: 18,
    }));
    const dados = editora.salvar();
    expect(dados.nome).toBe('Casa do Codigo');
  });
});
