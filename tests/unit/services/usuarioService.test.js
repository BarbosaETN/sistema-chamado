import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';

import UsuarioService from '../../../src/services/UsuarioService.js';
import Service from '../../../src/services/Service.js';
import dataSource from '../../../src/database/models/index.js';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('UsuarioService', () => {
  describe('criarRegistro', () => {
    it('deve rejeitar um e-mail que já está cadastrado', async () => {
      const service = new UsuarioService();

      jest
        .spyOn(dataSource.Usuario, 'findOne')
        .mockResolvedValue({
          id: 1,
          email: 'usuario@email.com',
        });

      await expect(
        service.criarRegistro({
          nome: 'Usuário Teste',
          email: 'usuario@email.com',
          senha: '123456',
        })
      ).rejects.toThrow(
        'Já existe um usuário com este e-mail.'
      );
    });

    it('deve criptografar a senha antes de criar o usuário', async () => {
      const service = new UsuarioService();

      jest
        .spyOn(dataSource.Usuario, 'findOne')
        .mockResolvedValue(null);

      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('senha-criptografada');

      const criarRegistroSpy = jest
        .spyOn(Service.prototype, 'criarRegistro')
        .mockResolvedValue({
          id: 1,
          nome: 'Usuário Teste',
          email: 'usuario@email.com',
          senha: 'senha-criptografada',
        });

      const dados = {
        nome: 'Usuário Teste',
        email: 'usuario@email.com',
        senha: '123456',
      };

      await service.criarRegistro(dados);

      expect(hashSpy).toHaveBeenCalledWith('123456', 10);

      expect(criarRegistroSpy).toHaveBeenCalledWith({
        nome: 'Usuário Teste',
        email: 'usuario@email.com',
        senha: 'senha-criptografada',
      });
    });
  });

  describe('atualizarRegistro', () => {
      it('deve rejeitar um e-mail que já pertence a outro usuário', async () => {
        const service = new UsuarioService();

        jest
          .spyOn(dataSource.Usuario, 'findOne')
          .mockResolvedValue({
            id: 2,
            email: 'outro@email.com',
          });

        await expect(
          service.atualizarRegistro(1, {
            email: 'outro@email.com',
          })
        ).rejects.toThrow(
          'Já existe um usuário com este e-mail.'
        );
      });

      it('deve criptografar a nova senha antes de atualizar o usuário', async () => {
      const service = new UsuarioService();

      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('nova-senha-criptografada');

      const atualizarRegistroSpy = jest
        .spyOn(Service.prototype, 'atualizarRegistro')
        .mockResolvedValue({
          id: 1,
          senha: 'nova-senha-criptografada',
        });

      const dados = {
        senha: '123456',
      };

      await service.atualizarRegistro(1, dados);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);

      expect(atualizarRegistroSpy).toHaveBeenCalledWith(1, {
        senha: 'nova-senha-criptografada',
      });
    });
  });
});