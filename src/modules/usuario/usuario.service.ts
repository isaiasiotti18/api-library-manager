import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EnderecoService } from '../endereco/endereco.service';
import { EnderecoBodyJson } from '../endereco/interfaces/endereco-body-json.interface';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { UsuarioRepository } from './usuario.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly enderecoService: EnderecoService,
  ) {}

  async criarUsuario(
    criarUsuarioDTO: CriarUsuarioDTO,
    enderecoBodyJson: EnderecoBodyJson,
  ): Promise<Usuario> {
    try {
      const { cpf, email, nome, telefone, senha_hash } = criarUsuarioDTO;
      const { cep, numero } = enderecoBodyJson;

      const cpfFormatado = cpf.replace(/[^\d]+/g, '');
      const telefoneFormatado = telefone.replace(/[^\d]+/g, '');

      //Tenho que refatorar depois, criar função procurarPorEmail
      const usuarioJaCadastrado = await this.usuarioRepository.findOne({
        where: { email },
      });

      if (usuarioJaCadastrado) {
        throw new BadRequestException('Usuário já cadastrado.');
      }

      const novoEndereco = await this.enderecoService.criarEndereco({
        cep,
        numero,
      });

      const novoUsuario = await this.usuarioRepository.criarUsuario({
        nome,
        email,
        senha_hash: await bcrypt.hash(senha_hash, 10),
        cpf: cpfFormatado,
        telefone: telefoneFormatado,
        endereco_id: novoEndereco.endereco_id,
      });

      return {
        ...novoUsuario,
        senha_hash: undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async alterarUsuario(
    id_usuario: string,
    alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void> {
    try {
      const usuarioJaCadastrado = await this.consultarUsuarioPorId(id_usuario);

      if (usuarioJaCadastrado) {
        await this.usuarioRepository.alterarUsuario(
          id_usuario,
          alterarUsuarioDTO,
        );
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async atribuirAluguel(usuario_id: string, aluguel_id: string): Promise<void> {
    await this.usuarioRepository.atribuirAluguel(usuario_id, aluguel_id);
  }

  async consultarUsuarioPorId(id_usuario: string): Promise<Usuario> {
    const usuarioEncontrado =
      await this.usuarioRepository.consultarUsuarioPorId(id_usuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuarioEncontrado;
  }

  async retornarUsuariocomEndereco(id_usuario: string): Promise<Usuario> {
    const usuarioEncontrado =
      await this.usuarioRepository.retornarUsuariocomEndereco(id_usuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuarioEncontrado;
  }
}
